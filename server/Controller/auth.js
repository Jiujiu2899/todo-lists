const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, password } = req.body;
    let user = await User.findOne({ name });

    if (!name || !password) {
      return res.status(400).json({ message: "Missing data" });
    } //ป้องกันการใส่ค่าว่าง

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "Register Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    let user = await User.findOne({ name });
    
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid");
      }

      let payload = {
        user: {
          id: user._id,
          name: user.name,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
        },
      });
    } else {
      return res.status(400).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};
