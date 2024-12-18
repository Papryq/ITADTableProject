import bcryptjs from "bcryptjs";

import { User } from "../models/user.model.js";
import { Order } from "../models/table.order.mode.js";
import { generateTokenAndSetCookie } from "../utils/gerenateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../mailtrap/emails.js";

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

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

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

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    // Look for user and compare verification token to token provided by user
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail", error);
    res.status(400).json({ success: false, message: "Server error" });
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

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully!" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    //Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 15 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link send to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expires reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset succcessfully" });
  } catch (error) {
    console.log("Error in resetPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const addOrder = async (req, res) => {
  const {
    orderNumber,
    orderLockStatus,
    orderDateExpiresAt,
    orderSystemCount,
    orderNotebookCount,
    orderStatus,
    orderSystemStatus,
    orderNotebookStatus,
    orderPrio,
    orderDeadline,
    orderOperator,
  } = req.body;

  try {
    if (!orderNumber || !orderDateExpiresAt) {
      throw new Error("Order number or date is not specified!");
    }

    const orderAlreadyExists = await Order.findOne({ orderNumber });
    console.log("orderAlreadyExist", orderAlreadyExists);

    const order = new Order({
      orderNumber,
      orderSystemCount,
      orderLockStatus,
      orderNotebookCount,
      orderDateExpiresAt,
      orderStatus,
      orderSystemStatus,
      orderNotebookStatus,
      orderPrio,
      orderDeadline,
      orderOperator,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: {
        ...order._doc,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { orderNumber } = req.params;

  try {
    const result = await Order.deleteOne({ orderNumber });
    if (result.deletedCount === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Couldn't delete order" });
    }

    // const updatedOrders = Order.findOne();
    return res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { orderNumber } = req.params;
  const updateOrder = req.body;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderNumber: orderNumber },
      updateOrder,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res
        .status(400)
        .json({ success: false, message: "No such order to update" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order updated succcessfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
