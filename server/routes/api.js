let express = require('express')
let router = express.Router()
let multer  = require('multer')
let path = require('path')
let ProjectController = require('../controller/ProjectController')
let UserController = require('../controller/UserController')
let upload = multer({ dest: path.resolve(__dirname , './../uploads')  ,    maxFileSize: Infinity })

//User api

router.post('/auth/singup', UserController.singup)
router.post('/auth/login', UserController.login)
router.get('/auth/confirmation/:token', UserController.confirmation)
router.get('/user/data', UserController.isAuth , UserController.getUser)

//Project api
router.get('/rates/views/:projectID', ProjectController.views)
router.get('/rates/likes/:id', ProjectController.likes)
router.get('/get/user/project/data/info/:publicID', ProjectController.getUserProjectData)


router.post('/rates/coment', ProjectController.addComment)
router.post('/rates/loveit', ProjectController.loveIt)
router.post('/project/update', ProjectController.update)
router.post('/project/delete', ProjectController.delete)


router.post('/createProject',  upload.single('file') , ProjectController.createNewProject)
router.get('/getProject', ProjectController.getProject)
router.get('/project/download/:path', ProjectController.download)
router.get('/find/user/project/:userID/:by', ProjectController.finndUserProjectBy)
router.get('/find/project/:name', ProjectController.findByName)
router.get('/find/project/by/:tag', ProjectController.findByTag)
router.get('/find/project/by/id/:id', ProjectController.findByID)



module.exports = router
