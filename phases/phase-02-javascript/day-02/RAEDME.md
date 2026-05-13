# CSS (Cascading Style Sheets)

- It enables style of HTML elements.

- selector : To indicate which HTML elements you are trying to modify.
- declaration block : that contains a set of properties and those properties values.(like color:blue)

### CSS selectors

- `type selectors` : Used to select HTML elements by element name.
```css
  h1 {
    color: green;
  }
  ```
- `class selectors` : Used to select HTML elements by a specific class value.

```css
  .subheading {
    color: green;
  }
  ```

- `id selectors` : Used to select an HTML element associated with a specific id value.
```css
  #main {
    color: green;
  }
  ```

**`Priority`** : id >>> class >>> tag

### Selector Combinations

- To select multiple elements, separate the selectors by commas.

```css
h3,
.red,
#redElement {
  color: red;
}
```

- Nested staructure

```css
div > h1 {
  border-bottom: 1px solid black;
}
```


### CSS Box Model 

```
┌─────────────────────────────┐
│          Margin             │  ← space outside the element
│  ┌───────────────────────┐  │
│  │       Border          │  │  ← edge of the element
│  │  ┌─────────────────┐  │  │
│  │  │   Padding       │  │  │  ← space inside border
│  │  │  ┌───────────┐  │  │  │
│  │  │  │ Content   │  │  │  │  ← actual text/image
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Content

- The actual thing inside the element
- Example: text, image, button label

### Padding

- Space **inside** the border
- Pushes content away from border

```css
padding: top right bottom left;
```

### Border

- Line around padding + content

```css
border: size style(solid/dotted) color;
```

### Margin

- Space outside the element
- Separates elements from each other

```css
margin: top right bottom left;
```

## Color

- `rgb` : red, green, blue (0-255 value)
- `rgba` : red, green, blue, alpha(opacity range 0 to 1)

- `HAX code` : Starting with `#` and after hex value. value can be 0-9 and A-F.
  - EX. : `#000000`
  - 1 and 2 value of red
  - 3 and 4 value of green
  - 5 and 6 value of blue

- `hsl` : hue, saturation, lightness
  - Hue values are given in terms of an angle from 0 to 360 degrees.
  - Saturation and lightness are both given as percentages from 0% to 100%.

- `hsla` : hue, saturation, lightness, alpha(opacity)

### Font Styling

- `font-family` : Change font of your text.

```css
body {
  font-family: Arial;
}
```

### Web-safe fonts

- When a browser loads a web page, it will apply the font specified in `font-family` only if the font is loaded on the system.
- Different browser has differnt font default.
- By the web-safe fonts a set of fonts which are consistent across platforms.

### Text alignment
- By default text align to left side.
- `center` : Center the text.
- `left` : Align the text to the left of its container.
- `right` : Align the text to the right of its container.
- `justify` : The text will spread out to fill out the full width of its container.

### Text sizing
- By using change the size of text.
- 1 `em` is equivalent to the font-size of the element’s parent.
- 1 `rem` is equivalent to the font-size of the root element of the entire HTML document.
