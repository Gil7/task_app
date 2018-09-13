/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    get: (req, res) => {
        Task.find()
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

    store: (req, res) => {
        sails.log.debug(req.body)
        Task.create(req.allParams())
        .then((task) => {
            return res.send({
                success: true,
                message: 'Task saved correctly',
                data: task
            })
        })
        .catch(err => {
            sails.log.debug(err)
            return res.send({
                success: false,
                message: 'Error storing the task',
                error: err
            })
        })
    }
};

