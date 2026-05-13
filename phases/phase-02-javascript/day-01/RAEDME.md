# HTML (Hyper Text Markup Languages)

- HTML stands for Hyper Text Markup Languages.
- That provides a description of the structure/layout of your web page.
- An HTML element is formed using a tag. Like `<p>`, `<a>`, `<img>` etc..

### HTML file structure

```html
<!DOCTYPE html>
<html>
  <head>
    <title>A Basic Web Page</title>
  </head>
  <body>
    <h1>My First HTML File</h1>
    <p>
      Congratulations! You're well on your way to creating your own web pages.
    </p>
  </body>
</html>
```

### HTML attributes

- HTML attributes provide additional information about an HTML element.

```html
<img src="/image.png" alt="image" />
```

### HTML Hyperlink

- We can connect a HTML page to another web pages.

```html
<a href="https://www.google.com'>Google</a>
```

- Absolute path where we add external link in href.
- Relative path where we add the over file with respect to where to access.(like href="about.html")

### Headings

```html
<h1>Heading Level 1</h1>
<h2>Heading Level 2</h2>
<h3>Heading Level 3</h3>
<h4>Heading Level 4</h4>
<h5>Heading Level 5</h5>
<h6>Heading Level 6</h6>
```

### Lists

- Include a bulleted or numbered list in web page content.
- `Unordered lists`
- `Ordered lists`

### Block-level elements

- Block-level HTML elements take up the full width of a web page.
- Headings, list, paragraphs

### Inline elements

- Inline elements, like the name suggests, do not take up the full width of a webpage and are generally in-line with text content.
- a, img

### Divs

- The <div>, a block-level element. its for only grouping or styling purpose.

### The id attribute

- This provide unique identifier to tag.

```html
<div id="conatiner>
  <h1>Hello</h1>
</div>
```

### class attribute

- This is same has id attribute but same class value can be apply to other tags.

```html
<p class="text">hello</p>
<p class="text">pratik</p>
```

### img Element

- img tag used emadded image in web page with src attribute.

```html
<img src="/image.png" alt="image" />
```

### Semantic Elements

- Tags that convey meaning about their content to both browsers and developers.
- `<nav>`, `<aside>`, `<section>`, `<strong>`, `<main>`, `<header>`, `<section>` etc.

### HTML Tables

- HTML table by defining how row, cloumn, header and data cells build.
- `<table>` : for create the table
- `<tr>` : table row
- `<th>` : table header
- `<td>` : table data

### HTML Forms

- `<input>` : field where users can enter(input) data.
- `<label>` : Use to indetifies the input tag.
- `<select>` : A drop-down list for users to select one from options.
- `<textarea>` : A multi-line input field for longer text.
- `<button>` : To perform some action on form like submit or reset.

- There is type attribute in `<input>` where Radio buttons and check box we can add.
