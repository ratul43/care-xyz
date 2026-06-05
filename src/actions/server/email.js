"use server";

import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";

export const sendBookingEmail = async ({ to, orderId, bookingData, totalCost }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials missing; skipping booking email.");
    return;
  }

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