# Express.js HTTP Server – Basic Routing Notes


---

## Method 1: Express Server with Direct Text Response

A simple Express.js server that sends back plain text/HTML strings.

### 📦 Code

```js
const express = require('express');
const port = 8001;

const app = express();

app.get('/', function(req, res) {
    res.write("<h1>Hello Express</h1>");
    res.end();
});

app.get('/about', function(req, res) {
    res.write("<h1>Hello About</h1>");
    res.end();
});

app.get('/*"*"', function(req, res) {
    res.write("<h1>Page not found</h1>");
    res.end();
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server started at port :-`, port);
});
```

### 🔍 Summary

* We're using `app.get()` to define routes.
* `res.write()` + `res.end()` is used to send HTML directly.
* Wildcard route (`/*"*"` — although typo here, it should be `'/*'`) is used for fallback (404).

> 💡 Good for small apps, testing, or quickly mocking a response.

---

## Method 2: Express Server Serving Static HTML Files

Here we serve actual `.html` files using `fs.readFile()`.

### 📦 Code

```js
const express = require('express');
const fs = require('fs');

const port = 8001;
const app = express();

app.get('/', function(req, res) {
    fs.readFile('./Views/Home.html', function(err, data) {
        if (err) {
            console.log("File not read properly!");
            return false;
        }
        res.end(data);
    });
});

app.get('/about', function(req, res) {
    fs.readFile('./Views/About.html', function(err, data) {
        if (err) {
            console.log("File not read properly!");
            return false;
        }
        res.end(data);
    });
});

app.get('/*', function(req, res) {
    fs.readFile('./Views/NotFound.html', function(err, data) {
        if (err) {
            console.log("File not read properly!");
            return false;
        }
        res.end(data);
    });
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server started at port :-`, port);
});
```

---

### 📂 Folder Structure

```
📁 ExpressApp
├── server.js
└── Views
    ├── Home.html
    ├── About.html
    └── NotFound.html
```

---

### 🧠 Key Differences

| Feature                | Method 1 (Direct Text) | Method 2 (HTML Files)          |
| ---------------------- | ---------------------- | ------------------------------ |
| Response Type          | Inline HTML in JS      | External HTML files            |
| Reusability            | ❌ Hardcoded            | ✅ Separate HTML files          |
| Real Project Readiness | ❌ Not scalable         | ✅ Closer to real app structure |
| Uses `fs.readFile()`   | ❌ No                   | ✅ Yes                          |

---
