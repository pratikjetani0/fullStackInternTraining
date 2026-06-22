export const paymentSuccessTemplate = (customerName: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body
  style="
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
  "
>
  <div
    style="
      max-width: 600px;
      margin: auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
    "
  >
    <h2 style="color: #16a34a;">
      ✅ Payment Successful
    </h2>

    <p>Hello ${customerName},</p>

    <p>
      Your payment has been received successfully.
    </p>

    <p>
      Your order is now confirmed and will be
      prepared for shipping.
    </p>

    <hr />

    <p>
      Thank you for choosing us.
    </p>

    <p>
      Regards,<br />
      E-Commerce Team
    </p>
  </div>
</body>
</html>
`;
