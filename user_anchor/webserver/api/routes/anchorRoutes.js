
'use strict';
module.exports = function(app) {
  var anchor = require('../controllers/anchorController');

  // todoList Routes
  app.route('/notifyEvent')
    .get(anchor.notify_event)
    .post(anchor.notify_event);

  app.route('/invokeAction')
    .get(anchor.invoke_action)
    .post(anchor.invoke_action);



/*
  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
*/
};

