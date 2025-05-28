# Understanding EJS

## What is EJS?
EJS stands for **Embedded JavaScript**. It is a simple templating language that lets you generate HTML markup with plain JavaScript. EJS is used with Node.js to render dynamic content on web pages, especially when using the Express framework.

## How EJS is Used in Project

### 1. Setting up EJS in Express

In your `app.js` file:

```js
const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs'); // Tells Express to use EJS as the template engine
app.set('views', path.join(__dirname, 'views')); // Sets the directory for EJS files
```

- `app.set('view engine', 'ejs')` tells Express to use EJS as the template engine for rendering views.
- `app.set('views', ...)` specifies the folder where your EJS template files are located.

---

### 2. Rendering EJS Views with Data

#### Example Route

```js
app.get('/', (req, res) => {
    return res.render("home", {
        data
    });
});
```

- The `res.render()` function renders the `home.ejs` template from the `views` folder.
- The object `{ data }` is passed to the template, making `data` available inside the EJS file.

---

### 3. EJS Template Example

In `views/home.ejs`:
```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
</head>
<body style="background-color: aqua; color:red; text-align:center;">
    <h1>This is Home Page</h1>
    <%= data[0].name %>
</body>
</html>
```

#### Key Points:
- `<%= ... %>`: This EJS syntax outputs the value of the JavaScript expression inside it (HTML-escaped by default).
- Here, `data[0].name` is rendered dynamically, using the value passed from Express.

---

### 4. Why Use EJS?
- **Dynamic Content:** EJS lets you inject dynamic data (like user names, lists, etc.) into your HTML.
- **Separation of Concerns:** Keeps your HTML structure separate from your Node.js logic.
- **Familiar Syntax:** If you know JavaScript, EJS feels very natural.

---

### 5. Common EJS Syntax

| Syntax         | Purpose                                       | Example                                 |
|----------------|-----------------------------------------------|-----------------------------------------|
| `<%= value %>` | Output the value (escaped)                    | `<%= user.name %>`                      |
| `<%- value %>` | Output unescaped value (for raw HTML)         | `<%- user.bio %>`                       |
| `<% code %>`   | Run some JavaScript without output            | `<% if(user) { %> ... <% } %>`          |
| `<% for(...) %>` | Loop over data                              | `<% for(let item of items) { %> ... <% } %>` |

---

## Summary

- **EJS** is a template engine for Node.js that lets you generate HTML using plain JavaScript.
- In Express, use `app.set('view engine', 'ejs')` and `res.render()` to serve dynamic views.
- EJS templates combine static HTML with dynamic JavaScript data, allowing you to easily build dynamic web pages.

---
