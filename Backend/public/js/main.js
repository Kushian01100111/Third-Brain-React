//const projects = require("../../controllers/personal/projects")

const form = document.getElementById('onlyForm'),
      action =  form.action.split("http://localhost:2121").slice(0,1).toString(),
      elements = form.elements
console.log(elements)
console.log(typeof form)

document.querySelector('.add-project').addEventListener('click', async () =>{
    document.querySelector('.addingProject').classList.toggle('false')
})

document.getElementById('add-subtasks').addEventListener('click', async () =>{
    addSubTasks();
});




