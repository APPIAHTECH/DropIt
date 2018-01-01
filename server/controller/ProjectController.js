let Project = require('./../model/Project')
let path = require('path')

let quantity = 10

module.exports = class ProjectController {
  constructor() {}

  static createNewProject(req , res , next){

    try {
      if(req.body.project && req.file){
        let newProject = req.body.project
        let fileInfo = req.file
        let model = new Project(JSON.parse(newProject))
        model.setFileInfo(fileInfo)
        model.save((err , inseted)=>{
          if(inseted)
            res.json({projectCreated : true})
          else if(err)
            res.json({projectCreated : false})
        })
      }else{ res.json({projectCreated : false ,  invalidFormat : true}) }
    } catch (e) {
      console.error(e);
    }
  }

  static update(req , res , next){
    let project = req.body
    let id = Project.toOBjectID(project.id)
    let updates = {
      title : project.title,
      description : project.description,
      genre : project.genre,
      profileImage: project.profileImage
    }
    Project.updateRates({_id : id} , {$set: updates}, (err , result)=> {
      if(err)
        return res.json({updated:false})
      return res.json({updated:true})
    })

  }

  static delete(req , res , next){
    let projectID = Project.toOBjectID(req.body.id)
    Project.deleteProject(projectID , (result)=>{
      return res.json({deleted:true})
    })

  }

  static getProject(req , res , next){
    Project.getLimit(quantity , (err , result)=> {
      if(err) res.status(500).send(err)
      res.send(result)
    })
  }

  static download(req, res , next){
    let flp = req.params.path
    let dir = path.normalize(__dirname + './../uploads/' + flp)
    res.download(dir , (err)=>{
      if (err) {
        console.error(err);
        res.json({download : false})
      } else {
        Project.updateP(flp , { $inc : { download : 1} } , (err , result) => {
          if(err) console.error(err)
          console.log(`Project : ${flp} was downloaded`)
        })

      }
    })
  }

  static getUserProjectData(req, res , next){
    let projectData = {}
    let publicID = req.params.publicID
    Project.countProjectRegisters({publicUserID:publicID} , (projectsQuantity)=> {
      projectData['projectsQuantity'] = projectsQuantity
      res.json(projectData)
    });
  }


  static views(req, res , next){
    let projectID = Project.toOBjectID(req.params.projectID)
    Project.updateRates({'_id' : projectID} , { $inc : { views : 1} } , (err , result) => {
      if(err){
        console.error(err)
        res.json({incremented : false})
      }
      console.log(`Project : ${projectID} increment`)
      res.json({incremented : true})
    })
  }

  static likes(req, res , next){
    let projectID = Project.toOBjectID(req.params.id)
    Project.updateRates({'_id' : projectID} , { $inc : { likes : 1} } , (err , result) => {
      if(err){
        console.error(err)
        res.json({liked : false})
      }
      console.log(`Project : ${projectID} like`)
      res.json({liked : true})
    })
  }

  static findByName(req , res , next){
    let name = req.params.name.toString()
    if(name.length >= 4)
      Project.getByName(name , (projects)=>{
        if(projects) res.json({projects : projects , find:true})
        else res.json({find : false})
      })
    else
      res.json({find : false})
  }

  static findByID(req , res , next){
    let id = Project.toOBjectID(req.params.id)
    Project.findBy({'_id' : id} , (project)=> {
      return res.json(project)
    })
  }

  static finndUserProjectBy(req , res , next){
    let userID = req.params.userID
    let by = req.params.by.toString()

    if(by === "all"){
      Project.findBy({publicUserID:userID} , (project)=> {
        return res.json(project)
      })
    }else
      Project.findBy({$and : [{publicUserID:userID} , { genre : by}]} , (project)=> {
        return res.json(project)
      })
  }


  static findByTag(req , res , next){
    let tag = req.params.tag.toString()
    Project.findBy({genre : tag} , (result)=> res.json(result) )
  }

  static addComment(req , res , next){
    let coment = req.body.comentObject
    let projectID = Project.toOBjectID(coment.projectID)

    Project.updateRates({'_id' : projectID} , { $push : { comments :  coment} } , (err , result) => {
      if(err){
        console.error(err)
        return res.json({addComent : false})
      }
      return res.json({addComent : true})
    })

  }

  static loveIt(req , res , next){
    let whoLovesObject = req.body.whoLovesObject
    let projectID = Project.toOBjectID(whoLovesObject.projectID)

    if(whoLovesObject.loves){
        Project.updateRates({'_id' : projectID} , { $push : { whoLoves :  {whoLovesObject : whoLovesObject}} } , (err , result) => {
          if(err){
            console.error(err)
            return res.json({loved : false})
          }
          return res.json({loved : true})
        })
      }else{

        Project.updateRates({'_id' : projectID} , { $pull : { whoLoves : {"whoLovesObject.projectID":whoLovesObject.projectID} }} , (err , result) => {
          if(err){
            console.error(err)
            return res.json({loved : false})
          }
          console.log(result.result);
          return res.json({loved : true})
        })

      }
    }

}
