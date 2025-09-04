# Change Password

### Step 1 : Install

```bash
npm i cookie-parser
```

---

### Step 2 : **app.js**

```js
var cookieParser = require('cookie-parser')
app.use(cookieParser())
```

---

### Step 3 : **routes/admin.routes.js**

```js
router.post('/changePassword',adminAuth,Admin.changePassword);
```

---

### Step 4 : **controller/admin.controller.js**

```js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports.changePassword = async (req, res) => {
  try {
    console.log(req.body);

    const { cpass, npass, confirmPass } = req.body;

    // Check if current password is correct
    const isMatch = await bcrypt.compare(
      req.body.cpass,
      req.user.adminToken.password
    );

    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Prevent reusing the same password
    if (cpass === npass) {
      return res
        .status(400)
        .json({
          error: "New password must be different from current password",
        });
    }

    // Confirm new password match
    if (npass !== confirmPass) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    // Hash and update
    const hashPass = await bcrypt.hash(npass, 10);
    const updatePass = await AdminModel.findByIdAndUpdate(
      req.user.adminToken._id,
      { password: hashPass },
      { new: true }
    );

    if (updatePass) {
      return res.status(200).json({ message: "Password changed successfully" });
    } else {
      return res.status(500).json({ error: "Failed to update password" });
    }
  } catch (error) {
    console.error("Error occurred during password change:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
```

---

