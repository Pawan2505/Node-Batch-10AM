
## Basic Setup Commands

```bash
# Step 1: Create project folder
mkdir express-server
cd express-server

# Step 2: Initialize Node.js project
npm init -y

# Step 3: Install Express
npm install express
```

---

## 📁 Create Folder Structure

```bash
# Create 'Views' folder to store HTML files
mkdir Views

# Create HTML files
touch Views/Home.html Views/About.html Views/NotFound.html
```

(Or manually create and write HTML content in them.)

---

## Sample HTML Files

**Home.html**

```html
<h1>Welcome to Home Page</h1>
```

**About.html**

```html
<h1>This is About Page</h1>
```

**NotFound.html**

```html
<h1>404 - Page Not Found</h1>
```

---

## ▶️ Run the Server

```bash
node server.js
```

---

## Output in Terminal (if no errors):

```
Server started at port :- 8001
```

---
