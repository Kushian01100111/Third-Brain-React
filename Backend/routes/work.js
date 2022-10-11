const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/interactive/projects");
const { ensureAuth, ensureGuest } = require("../middleware/auth");




router.get('/projects/inprogress', ensureAuth, projectsController.getInProgress);

router.post('/projects/planned', ensureAuth, projectsController.postProject);
router.get('/projects/planned', ensureAuth, projectsController.getPlanned);

module.exports = router;