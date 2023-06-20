import { Application } from "express";

import * as Auth from "../controllers/auth";
import * as User from "../controllers/users";

const setAuthRoute = (app: Application) => {
  /**
   * @api {post} /auth/login Generate a token
   * @apiVersion 1.0.0
   * @apiName Login
   * @apiGroup Auth
   * @apiPermission public
   * @apiDescription In order to generate a token, you will need to already have a user in the database.
   *
   *
   * @apiParam (Request body) {String} email The email
   * @apiParam (Request body) {String} password The password
   *
   * @apiExample {js} Example usage:
   * const data = {
   *   "email": "test@email.com",
   *   "password": "yourpassword"
   * };
   *
   * $http.post(url, data)
   *   .success((res) => doSomethingHere())
   *   .error((err) => doSomethingHere());
   *
   * @apiSuccess {String} token The token that must be used to access the other endpoints
   *
   * @apiSuccessExample {json} Success response:
   *     HTTPS 200 OK
   *     {
   *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... and the rest of the token here",
   *    }
   */
  app.post("/auth/login", Auth.login);

  /**
   * @api {post} /auth/register Generate a token
   * @apiVersion 1.0.0
   * @apiName Register
   * @apiGroup Auth
   * @apiPermission public
   * @apiDescription In order to generate a token, you will need to already have a user in the database.
   *
   *
   * @apiParam (Request body) {String} email The email
   * @apiParam (Request body) {String} password The password
   * @apiParam (Request body) {String} fullName The full name
   *
   * @apiExample {js} Example usage:
   * const data = {
   *   "email": "test@email.com",
   *   "password": "yourpassword"
   *   "fullName": "your fullname"
   * };
   *
   * $http.post(url, data)
   *   .success((res) => doSomethingHere())
   *   .error((err) => doSomethingHere());
   *
   * @apiSuccess (Success 201) {String} message User saved successfully!
   * @apiSuccess (Success 201) {String} id The user id
   *
   * @apiSuccessExample {json} Success response:
   *     HTTPS 201 OK
   *      {
   *      "message": "User saved successfully!",
   *      "id": "57e903941ca43a5f0805ba5a"
   *    }
   *
   **/
  app.post("/auth/register", User.create);
};

export default setAuthRoute;
