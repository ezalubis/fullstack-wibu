import { useState } from "react";
import { Link } from "react-router-dom";

function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi pengiriman data pembayaran ke server atau proses lainnya
    // Di sini kita hanya menggunakan setTimeout untuk mensimulasikan proses pembayaran
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Payment Form</h2>
      {paymentStatus === "success" ? (
        <>
          <div className="text-green-500 text-center">
            Payment successful! Thank you for your purchase. <br />
            <Link to={"/"}>(Back To Home)</Link>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Card Number</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Card Number"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Expiration Date</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">CVV</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
            />
          </div>
          {paymentStatus === "processing" ? (
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
              disabled
            >
              Processing...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit Payment
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default PaymentForm;
