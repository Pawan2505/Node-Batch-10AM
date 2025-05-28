### 📁 Folder Structure:

```
project-folder/
├── app.js
├── views/
│   ├── home.ejs
```

---

### Step 1: Install Express and EJS

Open terminal:

```bash
npm init -y
npm install express ejs
```

---

### Step 2: `app.js` — Server Code

```js
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sample data
const user = {
  name: "Pawan",
  bio: "<b>I love coding!</b>",
  isAdmin: true,
  items: ["HTML", "CSS", "JavaScript"]
};

app.get("/", (req, res) => {
  res.render("home", { user: user });
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
```

---

### Step 3: `views/home.ejs` — EJS Template File

```ejs
<h1>Welcome Page</h1>

<!-- 1. <%= value %> -->
<p>Hello, <%= user.name %></p>

<!-- 2. <%- value %> -->
<p>Bio: <%- user.bio %></p>

<!-- 3. <% if condition %> -->
<% if(user.isAdmin) { %>
  <p>You are an Admin.</p>
<% } else { %>
  <p>You are a Guest.</p>
<% } %>

<!-- 4. <% for loop %> -->
<h3>Your Skills:</h3>
<ul>
  <% for(let skill of user.items) { %>
    <li><%= skill %></li>
  <% } %>
</ul>
```

---

### Output in Browser

When you visit `http://localhost:3000`, you will see:

```html
Welcome Page
Hello, Pawan
Bio: I love coding!
You are an Admin.
Your Skills:
- HTML
- CSS
- JavaScript
```

