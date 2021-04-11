const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const DbError = require("../utils/dbError");

exports.getUser = async (email, password) => {
  try {
    const userCollection = await User.findOne({ email: email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userCollection.password
    );

    if (!passwordIsValid) {
      throw new DbError("Wrong password. please insert correct password", 400);
    }

    return userCollection;
  } catch (error) {
    throw new Error(error);
  }
};

exports.addUser = async (req) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const user = new User({
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });
    await user.save();
    return user;
  } catch (e) {
    throw new Error(error);
  }
};
