const Projects = require('../../models/projects')
const Subtask = require('../../models/subTasks')

module.exports = {
    getInProgress: async (req,res) =>{
        const cat = req.originalUrl.split("/")[1]
        try{
            const projects = await Projects.find({userId: req.user.id, category:`${cat}`, state:"in progress"})
            const subtasks = []
            for (const project of projects) {
                let tasks = await project.tasksId;
                if(tasks){
                    for (const task of tasks){
                        const tak = await Subtask.find({_id: task, userId: req.user.id})
                        subtasks.push(tak)
                    }
                }
              }
            console.log(subtasks)
            res.render('sections/projects',{
                title: `${cat}`, project: projects , user:req.user.id, subtask: subtasks.length > 0 ? subtasks : null })
            } catch(err){
            console.log(err)
        }
    },
    postProject: async (req,res) =>{
        const cat = req.originalUrl.split("/")[1]
        try{
            await Projects.create({
                category: `${cat}`,
                state: 'planned',
                name: req.body.name,
                description: req.body.desc,
                userId: req.user.id,
                process: 0,
            })
            console.log("Project has been added!");
            res.redirect(`/${cat}/projects/planned`)
            } catch(err){
            console.log(err)
        }
    },
    getPlanned: async (req,res) =>{
        const cat = req.originalUrl.split("/")[1]
        try{
            const projects = await Projects.find({userId: req.user.id, category:`${cat}`,  state:"planned"})
            const subtasks = [];
            for (const project of projects) {
                let tasks = await project.tasksId;
                if(tasks){
                    for (const task of tasks){
                        const tak = await Subtask.find({_id: task, userId: req.user.id})
                        subtasks.push(tak)
                    }
                }
              }
            console.log(subtasks)
            res.render('sections/projects',{
                title: `${cat}`, project: projects , user:req.user.id, subtask: subtasks.length > 0 ? subtasks : null})
            } catch(err){
            console.log(err)
        }
    },
}