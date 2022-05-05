const _ = require("lodash");

const handler = require("../utils/resHandler");

const DeletedUser = require("../models/deletedUser");
const { UserModel } = require("../models/user");

const mongoose = require("mongoose");
//const { reject } = require("lodash");

module.exports = class UserService {
  async myAccount(...userDetail) {
    const [id, detail] = userDetail;
    // console.log([id,detail] )
    console.log(detail);
    let User = await UserModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: detail }
    );

    User = await UserModel.findOne({ _id: mongoose.Types.ObjectId(id) }).select(
      "-_id -__v -password -updatedAt -createdAt -myaddress._id"
    );

    return User;
    //  console.log(User)
    //  User = _.merge(User,detail)
    //  console.log(User)
    // User = [User,...detail]
    // console.log(User)
  }

  async update(...user) {
    const [id, body] = user;
    const User = await UserModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(id),
      { $set: body },
      { new: true }
    );
    if (!User) throw new Error("User Not Found");
    return User;
  }

  async delete(userId) {
    let user = await UserModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userId) } },
      {
        $project: {
          userId: "$_id",
          username: "$username",
          email: "$email",
          role: "$role",
          createdAt: "$createdAt",
          deletedAt: "$$NOW",
        },
      },
    ]);
    await DeletedUser(user[0]).save();

    const User = await UserModel.findByIdAndDelete(userId);

    // setTimeout(() => {
    //   User.remove();
    // }, 2000);

    return User;
  }
  //pagination
  async getUser(...user) {
    const [id, word, length] = user;
    console.log(length);
    // const user = await UserModel.findOne({$or:[]});
    // function matchWord (word){
    let User = word
      ? await UserModel.find({
          username: { $regex: `^${word}`, $options: "i" },
        })
          .sort({
            _id: 1,
          })
          .select("username email role createdAt")
      : length
      ? await UserModel.find({
          $expr: { $lt: [{ $strLenCP: "$username" }, length] },
        }).select("username email role createdAt")
      : await UserModel.findOne({ _id: mongoose.Types.ObjectId(id) }).select(
          "username email role createdAt"
        );

    if (!User) throw new Error("User Not Found");

    return User;
  }

  async getAllUser() {
    let user = await UserModel.aggregate([
      { $match: {} },
      { $project: { username: "$username", createdOn: "$createdAt" } },
    ]);

    return user;
  }

  async getPagination(pagination) {
    let { pageSize, startIndex, startDate, endDate } = pagination;

    let user = await UserModel.find().count();

    if (startIndex >= user) {
      return "Document Not Found";
    }
    const getPagination = async (startIndex, pageSize) => {
      //  let skip = startIndex - 1 * pageSize
      //  let limit = startIndex * pageSize

      let result = {};
      if (startIndex > 0) {
        result.previous = {
          page: startIndex - 1,
          limit: pageSize,
        };
      }

      if (startIndex < user) {
        result.next = {
          page: startIndex + 1,
          limit: pageSize,
        };
      }

      result.response = await UserModel.find()
        .limit(pageSize)
        .skip(startIndex)
        .select(" -password -__v -isDeleted");
      return result;
    };
    return pageSize && startIndex
      ? getPagination(startIndex, pageSize)
      : pageSize || startIndex
      ? await UserModel.find()
          .limit(pageSize)
          .skip(startIndex)
          .select(" -password -__v -isDeleted")
      : startDate && endDate
      ? await UserModel.find({
          createdAt: { $gt: startDate, $lt: endDate },
        }).select(" -password -__v -isDeleted")
      : await UserModel.find({
          $or: [
            { createdAt: { $gt: startDate } },
            { createdAt: { $lt: endDate } },
          ],
        })
          .sort({ _id: -1 })
          .select(" -password -__v -isDeleted");
    // const getPagination = (page, size) => {
    //   const limit = size ? +size : 3;
    //   const offset = page ? page * limit : 0;
    //   return { limit, offset };
    //};
  }
  //show some recent user
  async getNewUser(query) {
    return await UserModel.find({})
      .sort({ _id: -1 })
      .limit(query)
      .select("-_id -__v -password -isAdmin");
  }
  //user created in year count
  async status(lastYear) {
    const data = await UserModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          count: { $count: {} },
        },
      },
      { $project: { _id: 0, month: "$_id", createdUser: "$count" } },
    ]);
    return data;
  }
  async deletedUser() {
    const user = await DeletedUser.find({}).sort({ _id: -1 });
    return user;
  }
};
