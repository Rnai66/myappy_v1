import { useEffect, useState } from "react";
import api from "../services/api";

export default function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/api/listings");
      setListings(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">สินค้ามือสองล่าสุด</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {listings.map((item) => (
          <div key={item._id} className="border rounded shadow p-4 bg-white">
            <h2 className="font-bold text-lg">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-blue-600 font-semibold mt-2">฿{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
