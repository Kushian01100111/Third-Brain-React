const Projects = require('../../models/projects')
const Subtask = require('../../models/subTasks')

module.exports = {
    getAddTask: async (req,res) =>{
        const cat = req.originalUrl.split("/")[1]
        try{ 
            const project = await Projects.findById(req.params.id)
            res.render('sections/addTask',{
            title: `${cat}`, project: project , user:req.user.id })
            } catch(err){
            console.log(err)
        }
    },
    updateAndAddTask: async (req,res) =>{
        const cat = req.originalUrl.split("/")[1]
        try{ 
            let taskId = await Subtask.create({
                completed: false,
                name: req.body.name,
                description: req.body.desc,
                userId: req.user.id,
                projectId: req.params.id
            })
            await Projects.findOneAndUpdate(
                { _id: req.params.id },
                {$push: {tasksId: taskId._id} },
                )
                console.log('Task has been added to project!')
                res.redirect(`/${cat}/projects/planned`)
            } catch(err){
            console.log(err)
        }
    },
    markTask: async (req,res) =>{
        const original = req.originalUrl.split("/");
        console.log(original)
        try{ 
            await Subtask.findOneAndUpdate(
                {_id:req.params.id},
                {$set: {completed: !Subtask.completed}});
            res.send('testing')
            } catch(err){
            console.log(err)
        }
    },
    getTaskManager: async (req,res) =>{
        const cat = req.originalUrl.split("/")[1]
        try{ 
            const projects = await Projects.findById(req.params.id);
            const subtasks = [];
            const tasks = await projects.tasksId;
                if(tasks){
                    for (const task of tasks){
                        const tak = await Subtask.find({_id: task, userId: req.user.id})
                        subtasks.push(tak)
                    }
                }
            res.render('sections/taskMana',{
                title: `${cat}`, project: projects , user:req.user , subtask: subtasks.length > 0 ? subtasks : null })
            } catch(err){
            console.log(err)
        }
    },
}
