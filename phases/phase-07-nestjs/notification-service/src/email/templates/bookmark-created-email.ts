export const welcomeEmailTemplate = (email: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
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
      border-radius: 10px;
    "
  >
    <h1>
      Welcome to Bookmark API 🚀
    </h1>

    <p>
      Hello,
      <strong>${email}</strong>
    </p>

    <p>
      Thank you for registering with
      Bookmark API.
    </p>

    <p>
      Your account has been created
      successfully.
    </p>

    <hr />

    <p>
      Happy Coding ❤️
    </p>
  </div>
</body>
</html>
`;
