export const bookmarkCreatedEmailTemplate = (title: string, link: string) => `
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
      Bookmark Created 🔖
    </h1>

    <p>
      Your bookmark has been created successfully.
    </p>

    <p>
      <strong>Title:</strong>
      ${title}
    </p>

    <p>
      <strong>Link:</strong>
      ${link}
    </p>

    <hr />

    <p>
      Bookmark API
    </p>
  </div>
</body>
</html>
`;
