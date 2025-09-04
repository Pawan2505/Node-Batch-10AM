# Forget Password

### Step 1: **routes/admin.routes.js**

```js
router.post("/checkEmail", Admin.checkEmail);

router.post("/verifyOtp", Admin.verifyOtp);
```

---

### Step 2: **controllers/admin.controller.js**

```js
module.exports.checkEmail = async (req, res) => {
  try {
    console.log(req.body);

    let emailExist = await AdminModel.findOne({ email: req.body.email });
    if (emailExist) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "pawanaktu@gmail.com",
          pass: "rpfpbrigspurulpu",
        },
      });

      const otp = Math.floor(Math.random() * 1000000);
      res.cookie("otp", otp);
      res.cookie("email", req.body.email);

      const info = await transporter.sendMail({
        from: "pawanaktu@gmail.com",
        to: req.body.email,
        subject: "Send OTP",
        text: `Your OTP is : ${otp}`,
        html: `<b>Your OTP is : ${otp}</b>`,
      });

      if (info) {
        console.log("Message sent:", info.messageId);
        return res.status(200).json({ message: "OTP sent successfully", otp });
      } else {
        return res.status(500).json({ error: "Failed to send OTP" });
      }
    } else {
      return res.status(200).json({ message: "Email is available" });
    }
  } catch (error) {
    console.error("Error occurred during email check:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({ error: "OTP is required" });
    }

    if (otp === req.cookies.otp) {
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error occurred during OTP verification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
```

---
