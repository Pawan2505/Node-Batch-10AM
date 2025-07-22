# 📘 Node.js HTTP Server Notes (Two Methods)

---

## ✅ Method 1: Simple HTTP Server with Hardcoded Response

This method sends plain text response directly using Node.js core modules.

### 📦 Code:

```js
const http = require('http');

const port = 8080;

const requestHandler = (req, res) => {
  res.write("Name : Pawan Maurya ");
  res.write("Age : 25");
  res.end(); // Always end the response!
};

const server = http.createServer(requestHandler);

server.listen(port, function (err) {
  if (err) {
    console.log(err);
    return false;
  }

  console.log("Server started at port :-", port);
});
```

### 🔍 What's Happening?

* We're importing `http` module (built-in).
* Defining a port (8080).
* Handling each incoming request with a function (`requestHandler`).
* Using `res.write()` to send data and `res.end()` to finish.
* `http.createServer()` creates the server.
* `server.listen()` starts the server.

> 💡 Use this method when you just want to return plain responses — good for testing or building a basic API.

---

## Method 2: Routing with Static HTML Files

This method uses `fs.readFile()` to serve static HTML pages based on the URL.

### 📦 Code:

```js
const http = require('http');
const fs = require('fs');

const port = 8080;

const requestHandler = (req, res) => {
  let fileName = '';

  switch (req.url) {
    case '/':
      fileName = 'Home.html';
      break;
    case '/about':
      fileName = 'About.html';
      break;
    default:
      fileName = 'Error.html';
      break;
  }

  fs.readFile(fileName, (err, result) => {
    if (!err) {
      res.end(result);
    } else {
      res.end("Something went wrong!");
    }
  });
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }

  console.log("Server Started at port :-", port);
});
```

### What's Happening?

* We're using both `http` and `fs` modules.
* URL routing is handled via `switch(req.url)`.
* `fs.readFile()` is used to read HTML files from disk.
* Based on the URL, it serves:

  * `/` → `Home.html`
  * `/about` → `About.html`
  * Any other route → `Error.html`

> 💡 This is a great approach when you want to serve static pages without using Express or any other framework.

---

## Key Points

| Concept             | Explanation                              |
| ------------------- | ---------------------------------------- |
| `http.createServer` | Creates the server instance              |
| `res.write()`       | Writes content to the response stream    |
| `res.end()`         | Signals that the response is complete    |
| `fs.readFile()`     | Reads file asynchronously (non-blocking) |
| `switch(req.url)`   | Basic routing using request URL          |

---

## 📁 Recommended Folder Structure

```bash
📁 my-node-server
├── server.js
├── Home.html
├── About.html
└── Error.html
```

---

