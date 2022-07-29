import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../util/generateToken.js";

const loginUser = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    // Check for user email
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.name),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({email});

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

export {loginUser, registerUser};
