import { Application } from "express";

import * as Task from "../controllers/tasks";

const setTasksRoute = (app: Application) => {
  const endpoint: string = process.env.API_BASE + "tasks";

  /**
   * @api {get} /api/tasks Retrieve all tasks
   * @apiVersion 1.0.0
   * @apiName GetAll
   * @apiGroup Task
   * @apiPermission authenticated user
   *
   * @apiExample {js} Example usage:
   * $http.defaults.headers.common["Authorization"] = token;
   * $http.get(url)
   *   .success((res, status) => doSomethingHere())
   *   .error((err, status) => doSomethingHere());
   *
   * @apiSuccess {String} _id The task id
   * @apiSuccess {String} title The task name
   * @apiSuccess {String} detail The task detail
   * @apiSuccess {String} scheduled_date The task scheduled_date
   *
   * @apiSuccessExample {json} Success response:
   *     HTTPS 200 OK
   *     [{
   *       "_id": "57e8e94ea06a0c473bac50cc",
   *       "title": "title"
   *       "detail": "detail"
   *       "scheduled_date": "scheduled_date"
   *      },
   *      {
   *       "_id": "57e903941ca43a5f0805ba5a",
   *       "title": "title"
   *       "detail": "detail"
   *       "scheduled_date": "scheduled_date"
   *     }]
   *
   * @apiUse UnauthorizedError
   */
  app.get(endpoint, Task.getAll);

  /**
   * @api {post} /api/tasks Create a task
   * @apiVersion 1.0.0
   * @apiName Create
   * @apiGroup Task
   * @apiPermission authenticated user
   *
   * @apiParam (Request body) {String} name The task name
   *
   * @apiExample {js} Example usage:
   * const data = {
   *   "title": "Task Title"
   *   "detail": "Task Detail"
   *   "scheduled_date": "scheduled_date"
   * }
   *
   * $http.defaults.headers.common["Authorization"] = token;
   * $http.post(url, data)
   *   .success((res, status) => doSomethingHere())
   *   .error((err, status) => doSomethingHere());
   *
   * @apiSuccess (Success 201) {String} message Task saved successfully!
   * @apiSuccess (Success 201) {String} id The task id
   *
   * @apiSuccessExample {json} Success response:
   *     HTTPS 201 OK
   *     {
   *      "message": "Task saved successfully!",
   *      "id": "57e903941ca43a5f0805ba5a"
   *    }
   *
   * @apiUse UnauthorizedError
   */
  app.post(endpoint, Task.create);

  app.all(endpoint + "/:id", Task.isEditable);

  /**
   * @api {get} /api/tasks/:id Retrieve a task
   * @apiVersion 1.0.0
   * @apiName GetOne
   * @apiGroup Task
   * @apiPermission authenticated user
   *
   * @apiParam {String} id The task id
   *
   * @apiExample {js} Example usage:
   * $http.defaults.headers.common["Authorization"] = token;
   * $http.get(url)
   *   .success((res, status) => doSomethingHere())
   *   .error((err, status) => doSomethingHere());
   *
   * @apiSuccess {String} _id The task id
   * @apiSuccess {String} name The task name
   *
   * @apiSuccessExample {json} Success response:
   *     HTTPS 200 OK
   *     {
   *       "_id": "57e8e94ea06a0c473bac50cc",
   *       "title": "title"
   *       "detail": "detail"
   *       "scheduled_date": "scheduled_date"
   *      }
   *
   * @apiUse UnauthorizedError
   */

  app.get(endpoint + "/:id", Task.getOne);
  /**
   * @api {put} /api/tasks/:id Update a task
   * @apiVersion 1.0.0
   * @apiName Update
   * @apiGroup Task
   * @apiPermission authenticated user
   *
   * @apiParam {String} id The task id
   *
   * @apiParam (Request body) {String} name The task name
   *
   * @apiExample {js} Example usage:
   * const data = {
   *   "title": "Task Title"
   *   "detail": "Task Detail"
   *   "scheduled_date": "scheduled_date"
   * }
   *
   * $http.defaults.headers.common["Authorization"] = token;
   * $http.put(url, data)
   *   .success((res, status) => doSomethingHere())
   *   .error((err, status) => doSomethingHere());
   *
   * @apiSuccess {String} message Task updated successfully!
   *
   * @apiSuccessExample {json} Success response:
   *     HTTPS 200 OK
   *     {
   *      "message": "Task updated successfully!"
   *    }
   *
   * @apiUse UnauthorizedError
   */
  app.put(endpoint + "/:id", Task.update);

  /**
   * @api {delete} /api/tasks/:id Delete a task
   * @apiVersion 1.0.0
   * @apiName Delete
   * @apiGroup Task
   * @apiPermission authenticated user
   *
   * @apiParam {String} id The task id
   *
   * @apiExample {js} Example usage:
   * $http.defaults.headers.common["Authorization"] = token;
   * $http.delete(url)
   *   .success((res, status) => doSomethingHere())
   *   .error((err, status) => doSomethingHere());
   *
   * @apiSuccess {String} message Task deleted successfully!
   *
   * @apiSuccessExample {json} Success response:
   *     HTTPS 200 OK
   *     {
   *      "message": "Task deleted successfully!"
   *    }
   *
   * @apiUse UnauthorizedError
   */
  app.delete(endpoint + "/:id", Task.deleteOne);
};

export default setTasksRoute;
