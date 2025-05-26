### **Local Module in Node.js**

Sometimes, your code gets too big and messy. So instead of writing everything in one file, we can **split logic into separate files** — this is where **local modules** come in.

It’s like making your own small toolbox — and then using it wherever needed.

---

### **Let’s Build a Local Module**

👉 Create a file named `math.js`:

```js
// math.js

function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

// Export the functions so we can use them in other files
module.exports = {
    add,
    sub
};
```

Here we’re saying:
**“Hey Node, I want to export `add` and `sub` functions so other files can use them.”**

---

### 📥 **Now Let’s Use This Module**

👉 In another file (like `app.js`):

```js
// app.js

const data = require('./math'); // Import your local module

console.log(data.add(10, 20));     // 30
console.log(data.sub(100, 50));    // 50
```

`require('./math')` means:
“Bring the code from `math.js` (which is in the same folder).”

Now `data` is like a toolbox, and `add`, `sub` are the tools inside.

---

### Summary:

* You create your own local module using `module.exports`.
* Use `require()` to bring that module into another file.
* Helps keep your code clean and modular.

