export const orderConfirmationTemplate = (customerName: string) => `
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
    <h2 style="color: #2563eb;">
      🎉 Order Confirmed
    </h2>

    <p>Hello ${customerName},</p>

    <p>
      Thank you for shopping with us.
    </p>

    <p>
      Your order has been placed successfully and
      is now being processed.
    </p>

    <p>
      We will notify you once your order is shipped.
    </p>

    <hr />

    <p>
      Regards,<br />
      E-Commerce Team
    </p>
  </div>
</body>
</html>
`;
