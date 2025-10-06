import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [googleResults, setGoogleResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLink, setSelectedLink] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const GOOGLE_CX = import.meta.env.VITE_GOOGLE_CX;
  const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  

  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          setMessage("❌ " + data.message);
        }
      } catch (err) {
        setMessage("Server error");
      }
    };
    fetchProfile();
  }, []);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") return;

    setLoading(true);
    try {
      const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
        searchInput
      )}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.items) {
        setGoogleResults(data.items);
      } else {
        setGoogleResults([]);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // ตรวจสอบว่า iframe โหลดได้หรือไม่
  const handleIframeLoadError = () => {
    setIframeBlocked(true);
  };
  <iframe
  title="Google Maps"
  width="100%"
  height="300"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  src={`https://www.google.com/maps/embed/v1/search?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(searchInput)}`}
/>


  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 flex gap-4">
      <div className="w-3/4">
        <div className="mb-6 border-b pb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-deepblue">โปรไฟล์ผู้ใช้</h2>
          {profile ? (
            <span className="text-green-600 font-semibold">✅ Login สำเร็จ</span>
          ) : (
            <span className="text-red-500">❌ ยังไม่ได้ Login</span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-deepblue mb-4">
          🔍 ค้นหาสินค้ามือสองจาก Google
        </h3>
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="เช่น iPhone มือสอง กรุงเทพ"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-peach"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-deepblue text-white rounded-md hover:bg-peach"
          >
            ค้นหา
          </button>
        </form>

        {loading ? (
          <p>⏳ กำลังค้นหา...</p>
        ) : googleResults.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-md shadow-sm mb-6">
              <thead className="bg-peach text-white">
                <tr>
                  <th className="p-2 text-left">ชื่อสินค้า</th>
                  <th className="p-2 text-left">ลิงก์</th>
                  <th className="p-2 text-left">คำอธิบาย</th>
                </tr>
              </thead>
              <tbody>
                {googleResults.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-2 font-semibold">{item.title}</td>
                    <td
                      className="p-2 text-blue-600 underline cursor-pointer"
                      onClick={() => {
                        setSelectedLink(item.link);
                        setIframeBlocked(false); // reset ทุกครั้งที่เลือกใหม่
                      }}
                    >
                      เปิดลิงก์
                    </td>
                    <td className="p-2 text-gray-600">{item.snippet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">ยังไม่มีผลลัพธ์</p>
        )}

        {selectedLink && (
          <div className="mt-4">
            <h3 className="font-semibold text-deepblue mb-2">📍 ตำแหน่งบนแผนที่</h3>
            <iframe
              title="Google Maps"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(searchInput)}`}
            ></iframe>
          </div>
        )}
      </div>

      <div className="w-1/4 border-l pl-4">
        {selectedLink ? (
          <>
            <h3 className="font-semibold text-deepblue mb-2">แสดงหน้าเพจสินค้า</h3>

            {!iframeBlocked ? (
              <iframe
                src={selectedLink}
                title="Preview"
                className="w-full h-64 border rounded-md mb-3"
                onError={handleIframeLoadError}
              />
            ) : (
              <a
                href={selectedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-deepblue text-white py-2 rounded-md hover:bg-peach"
              >
                🌐 เปิดในแท็บใหม่
              </a>
            )}

            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="w-full px-4 py-2 bg-peach text-white rounded-md hover:bg-deepblue"
            >
              💬 แชทกับผู้ขาย
            </button>

            {chatOpen && (
              <div className="mt-3 p-2 border rounded-md bg-gray-50 h-40 flex flex-col">
                <div className="flex-1 overflow-y-auto text-sm text-gray-700">
                  <p><strong>คุณ:</strong> สนใจสินค้าชิ้นนี้ครับ</p>
                  <p><strong>ผู้ขาย:</strong> สวัสดีครับ ของยังมีอยู่ครับ</p>
                </div>
                <div className="flex mt-2">
                  <input
                    type="text"
                    placeholder="พิมพ์ข้อความ..."
                    className="flex-1 p-1 border rounded-l-md"
                  />
                  <button className="px-3 bg-deepblue text-white rounded-r-md">ส่ง</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 italic">เลือก "เปิดลิงก์" เพื่อดูสินค้า</p>
        )}
      </div>
    </div>
  );
  <iframe
  title="Google Maps"
  width="100%"
  height="300"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  src={`https://www.google.com/maps/embed/v1/search?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(searchInput)}`}
/>

}



export default Profile;
