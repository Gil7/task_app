/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    get: (req, res) => {
        Task.find().sort('id DESC')
        .then((tasks) => {
            if(!tasks || tasks.length < 1){
                return res.send({
                    success: false,
                    message:'Tasks not found'
                })
            }
            else {
                return res.send({
                    success: true,
                    data: tasks,
                    total: tasks.length
                })
            }
        })
        .catch(err => {
            sails.log.debug(err)
            return res.send({
                success: false,
                message: 'Error fetching records'
            })
        });
    },

    store: async (req, res) => {
        try{
            const new_task = await Task.create(req.allParams()).fetch()
            return res.json({
                success: true,
                message: 'Task stored',
                task: new_task
            })
        }
        catch(err){
            return res.json({
                success: false,
                message: 'Error storing the taks',
                error: err.message
            })
        }
    },

    update: async (req, res) => {
        const taskId = req.param('id')
        const message = 'done' in req.body ? 'Estatus changed' : 'Task updated correclty'
        try{
            const taskUpdated = await Task.update(taskId, req.allParams()).fetch()    
            return res.send({
                success: true,
                message: message,
                task: taskUpdated
            })
        }catch(err){
            sails.log.debug(err)
            return res.send({
                success: false,
                message: 'Unable to update the task'
            })
        }
        
       
    },
    remove: (req, res) => {
        const taskId = req.param('id')
        Task.destroy(taskId)
        .then((task) => {
            return res.send({
                success: true,
                message: 'Tasks removed successfully',
                data: task
            })
        })
        .catch((err) => {
            sails.log.debug(err)
            return res.send({
                success: false,
                message: 'Unable to remove the task'
            })
        })
    }
};

