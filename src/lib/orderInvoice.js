export const orderInvoiceTemplate = ({ orderId, data, totalPrice }) => {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>🧾 Booking Invoice</h2>
      <p>Order ID: <strong>${orderId}</strong></p>

      <table width="100%" border="1" cellspacing="0" cellpadding="8">
        <thead>
          <tr>
            <th align="left">Name</th>
            <th>Total time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${data}
        </tbody>
      </table>

      <h3 style="margin-top: 20px;">Total: ৳${totalPrice}</h3>

      <p>Thank you for being with Carexyz ❤️</p>
    </div>
  `;
};