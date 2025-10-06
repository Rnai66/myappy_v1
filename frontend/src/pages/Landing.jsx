import logoIsan from "../assets/2hand-1r.png";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-100 to-orange-200">
      <img
        src={logoIsan}
        alt="2Hand Logo"
        className="w-32 h-32 drop-shadow-lg"
      />
      <h1 className="text-3xl font-bold mt-4 text-yellow-800">
        2Hand Marketplace
      </h1>
      <p className="text-gray-700 mt-2 italic">
        “ชุมชนซื้อขายสินค้ามือสอง อีสานใต้”
      </p>
    </div>
  );
}
