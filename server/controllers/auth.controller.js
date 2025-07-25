import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { User } from "../models/user.models.js"
import transporter from "../config/nodemailer.js"

export const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.json({success:false,message:"Missing Details"})
    }

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({success:false,message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 1000
        })

        //Sending welcome email

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to AuthService',
            text: `Welcome to authService website . Your account has been created with email id: ${email}`
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true })
    } catch (error) {
      res.json({success:false,message: error.message})   
    }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || password) {
    return res.json({ success: false, message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};