import bcryptjs from "bcryptjs";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/gerenateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";


export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // checks are fields not empty
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    // checks for already existing user
    const userAlreadyExist = await User.findOne({ email });
    console.log("userAlreadyExists", userAlreadyExist);

    // if userAlreadyExist === true, return code 400 with failure
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash password using bcryptjs
    const hashedPassword = await bcryptjs.hash(password, 16);

    // creating random 6 digit verification token for future email verification
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // creating new user from the req
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 6 * 60 * 60 * 1000, // 6h
    });

    // saving user into database
    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    // await sendVerificationEmail(user.email, verificationToken)


    // respond if user created successfully
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // checks is there is such user
    const user = await User.findOne({ email });

    // if not return code 400
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // checks is password is valid
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // token gen in future
    generateTokenAndSetCookie(res, user._id);

    // sets last login up to date
    user.lastLogin = Date.now();

    // saves user
    await user.save();

    // respond if login is successfull
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._id,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
