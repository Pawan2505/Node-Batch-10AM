### **How Third-Party Modules Work in Node.js**

 **1. Installation**
You can install third-party modules using `npm` (Node Package Manager):

```bash
npm install <module-name>
```

or just:

```bash
npm i <module-name>
```

 **2. Where They Go**
After installation, modules are saved in a special folder called:

```
node_modules/
```

This folder is automatically created in your project directory.

 **3. Tracking Modules**
Your installed modules are listed in:

```
package.json
```

So others (or you later) can see what dependencies your project uses.

 **4. How to Use in Code**
You can import the installed module like this:

```js
const express = require('express');
```

This line tells Node.js:
**"Bring in the `express` module from node\_modules so I can use it here."**

---
