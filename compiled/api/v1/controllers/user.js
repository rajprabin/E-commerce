"use strict";

const Handler = require("../../../utils/resHandler");

const UserService = require("../../../sevices/user");

const userService = new UserService();

const _ = require("lodash");

const {
  parseInt
} = require("lodash");

module.exports = class UserController {
  //user personal detail
  async myAccount(req, res) {
    const id = req.user.id;
    req.body.username = `${req.body.firstname}${req.body.lastname}`;
    let response = await userService.myAccount(id, req.body);
    if (!response) return Handler.badRequest("Enter valid credential", false, res); //  response = _.pick(response, ["username","firstname", "lastname","telephone","myadress", "createdAt"]);

    return Handler.created("created", response, res);
  }

  async update(req, res) {
    let response = await userService.update(req.params, req.body);
    if (!response) Handler.notFound("Enter valid credential");
    response = _.pick(response, ["username", "email", "updatedAt"]);
    return Handler.success("updated", response, res);
  }

  async delete(req, res) {
    let response = await userService.delete(req.user.id);
    if (!response) return Handler.notFound("Not Found", false, res);
    response = _.pick(response, ["username", "email"]);
    return Handler.success("Deleted", response, res);
  } //list username by word || by id   ,


  async getUser(req, res) {
    const response = await userService.getUser(req.query.id, req.query.search, parseInt(req.query.nameLength));
    if (!response) return Handler.notFound("Not Found", false, res);
    return Handler.success("Founded Users", response, res);
  } //get all new user,between user using limit skip  & using date


  async getAllUser(req, res) {
    let {
      New,
      pageSize,
      startIndex,
      endIndex,
      startDate,
      endDate
    } = req.query;
    [New, pageSize, startIndex] = [New, pageSize, startIndex].map(Number);
    let response = New ? await userService.getNewUser(New) : pageSize || startIndex ? await userService.getPagination({
      pageSize,
      startIndex
    }) : startDate || endDate ? await userService.getPagination({
      startDate,
      endDate
    }) : await userService.getAllUser();
    if (!response) return Handler.notFound("Not Found");
    return Handler.success("Users", response, res);
  } // one year new user count


  async status(req, res) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const response = await userService.status(lastYear);
    if (!response) return Handler.noContent("some thimg Failed", false, res);
    return Handler.success("New User Created IN A Year", response, res);
  }

  async deletedUser(req, res) {
    const response = await userService.deletedUser();
    if (!response) return Handler.noContent("No Content");
    return Handler.success("Deleted User", response, res);
  }

};