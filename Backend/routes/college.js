const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/interactive/projects");
const subTaskController = require("../controllers/personal/subTask");

const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get('/projects/addTask/:id', ensureAuth, subTaskController.getAddTask);
router.put('/projects/addTask/:id', ensureAuth, subTaskController.updateAndAddTask);

router.get('/projects/editTask/:id', ensureAuth, subTaskController.getTaskManager);
router.put('/projects/editTask/:id', ensureAuth, subTaskController.markTask);




router.get('/projects/inprogress', ensureAuth, projectsController.getInProgress);

router.post('/projects/planned', ensureAuth, projectsController.postProject);
router.get('/projects/planned', ensureAuth, projectsController.getPlanned);

module.exports = router;