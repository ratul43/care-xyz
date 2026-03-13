"use server";

import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";

export const sendBookingEmail = async ({ to, orderId, bookingData, totalCost }) => {
  await sendEmail({
    to,
    subject: "Your Booking Invoice - Carexyz",
    html: orderInvoiceTemplate({
      orderId,
      data: `
        <tr>
          <td>${bookingData.serviceName}</td>
          <td>${bookingData.duration} hrs</td>
          <td>$${totalCost}</td>
        </tr>
      `,
      totalPrice: totalCost,
    }),
  });
};