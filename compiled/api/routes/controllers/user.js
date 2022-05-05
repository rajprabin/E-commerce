"use strict";

const UserService = require('../../../sevices/user');

const userService = new UserService();

const _ = require('lodash');

module.exports = class UserController {
  async update(req, res) {
    const responce = await userService.update(req.params, req.body);
    res.json({
      status: "updated",
      description: responce
    });
  }

  async delete(req, res) {
    const responce = await userService.delete(req.params);
    res.json({
      status: "Deleted",
      description: responce
    });
  }

  async getUser(req, res) {
    const responce = await userService.getUser();
    res.json(_.pick(responce, ['username', "email", "createdAt"]));
  }

  async getAllUser(req, res) {
    const query = req.query.new;
    const responce = query ? await userService.getNewUser(query) : await userService.getAllUser();
    res.json(_.pick(responce, ['username', "email", "createdAt", 'updatedAt']));
  }

  async status(req, res) {
    const responce = await userService.status(req.params);
  }

};