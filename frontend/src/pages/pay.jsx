function Pay() {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-deepblue mb-4">Pay 💳</h2>
      <p className="text-gray-700">ระบบชำระเงินของ myappy</p>
      <button className="mt-4 w-full bg-peach text-deepblue font-semibold py-2 rounded-md hover:bg-deepblue hover:text-white transition">
        Proceed to Payment
      </button>
    </div>
  );
}

export default Pay;
