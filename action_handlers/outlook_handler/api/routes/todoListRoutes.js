'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/createEvent')
    .get(todoList.create_a_task)
    .post(todoList.create_a_task);

    
   
    
    
  app.get("/", (req, res, next) => {
    console.log("req body")
    //console.log(req)
    //console.log("req body2")
    console.log(req.body)
    //console.log(req.body.caller1name)
     res.json(["Welcome to Bittu Handler Server.... Do you have a task for Me?"]);
});

  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};
