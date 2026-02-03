import User from "../models/user.model.js";

export const getAllRecord = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const userlimit = parseInt(req.query.limit) || 5;

    const userPageIndex = (page - 1) * userlimit;

    const users = await User.find().skip(userPageIndex).limit(userlimit);
    if (users.length === 0) {
      return res.status(200).json({
        data: users,
        message: "data is not available!",
      });
    }
    res.status(200).json({
      data: users,
      message: "users fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error!",
      error: error.message,
    });
  }
};

export const getUserCount = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();
    return res.status(200).json({
      totalUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error!",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        message: "all fields are required!",
      });
    }
    const newUser = { firstName, lastName, email, phone };
    await User.create(newUser);

    res.status(200).json({
      data: newUser,
      message: "new record is posted.",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error!",
      error: error.message,
    });
  }
};
