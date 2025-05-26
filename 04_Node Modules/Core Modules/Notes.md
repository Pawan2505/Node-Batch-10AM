### **1. `fs` – File System Module**

**Why we use it:**
Whenever you need to **read**, **write**, or **delete** files using Node.js, this is your go-to module.

#### Key things to remember:

* Node.js follows the **error-first callback** pattern. That means the first parameter in your callback is always `err`. Handle it properly!
* In modern JavaScript, we use **Promises** (`fs.promises`) instead of callbacks. It makes code cleaner with `async/await`.
* Be careful with methods like `readFileSync()` – they **block the event loop**. Avoid them unless absolutely necessary (like during server startup).

#### Example (Callback & Promise version):

```js
const fs = require('fs');

// Using callback (old-school, but still common)
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("File read error:", err);
    return;
  }
  console.log(data); // Do something with the file data
});
```

```js
// Using Promises (modern way)
const fsPromises = require('fs').promises;

async function readFile() {
  try {
    const data = await fsPromises.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();
```

---

### **2. `http` – HTTP Module**

**Why we use it:**
This module helps you **create a web server** with plain Node.js. Think of it like the raw, low-level version of what Express does for you.

#### Keep in mind:

* You’ll use `http.createServer()` which gives you access to the request (`req`) and response (`res`) objects.
* Don’t forget to **end your response** using `res.end()` — it’s mandatory.
* It’s great for learning, but in real-world apps, use **Express.js** for cleaner code.

#### Example:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set response headers
  res.write("Hello HTTP!"); // Send a message
  res.end(); // Always end the response
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
```

---

### **3. `url` – URL Module**

**Why we use it:**
It helps us **parse URLs** to get things like **query parameters**, **host**, **pathname**, etc. Useful when you’re building backend APIs and need to handle incoming URL data.

#### Notes:

* Use the modern `new URL()` constructor instead of the older `url.parse()`.
* It works great with string URLs and helps us pull out meaningful parts.

#### Example:

```js
const { URL } = require('url');

const adr = 'https://www.w3schools.com/nodejs?filename=demo_http';
const parsedUrl = new URL(adr);

console.log(parsedUrl.host);                 // www.w3schools.com
console.log(parsedUrl.pathname);            // /nodejs
console.log(parsedUrl.searchParams.get('filename')); // demo_http
```

---

### When to Use These Core Modules?

| Module         | Use It For                        |
| -------------- | --------------------------------- |
| `fs`           | File reading, writing, deleting   |
| `http`/`https` | Creating basic servers, proxies   |
| `path`         | Handling file paths across OS     |
| `url`          | Parsing URLs for APIs and routing |

---