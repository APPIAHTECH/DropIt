let moment = require('moment')
let db = require('./../db/db')
const collectionName = "projectCollection"

module.exports = class Project {

  constructor(project) {

    this.title = project.title
    this.description = project.description
    this.genre = project.genre
    this.author = project.author
    this.publicUserID = project.publicUserID
    this.userName = project.userName
    this.profileImage = project.profileImage
    this.imageLink = project.imageLink
    this.state = project.state
    this.vstList = project.vstList
    this.comments = []
    this.whoLoves = []
    this.likes = 0
    this.views = 0
    this.download = 0
    this.link = ""
    this.fileInfo = {}
  }

  setFileInfo(file){
    this.fileInfo = file
  }

  generateProjectLink(){
    return this.fileInfo.filename
  }

  save(callback){
    this.link = this.generateProjectLink()
    this.date = moment().unix()
    try {
      db.insert(collectionName , this)
      callback(false , true)
    } catch (e) {
      console.log(e);
      callback(true , false)
    }
  }

  static deleteProject(id , callback){
    db.delete(collectionName , {_id : id}, callback)
  }

  static updateP(id , newChanges , callback){
    db.updateGeneric(collectionName , {"fileInfo.filename": id }, newChanges , callback)
  }

  static updateRates(element , newChanges , callback){
    db.updateGeneric(collectionName , element, newChanges , callback)
  }

  static getLimit(quantity , callback){db.findLimit(collectionName , quantity , callback)}

  static getByName(name , callback){
    db.find(collectionName , { title: new RegExp('^'+name+'.*', "i") } , {} , callback)
    // db.find(collectionName , { title: name } , {} , callback)
  }

  static countProjectRegisters(query , callback){
    db.count(collectionName , query, (result)=> callback(result))
  }
  static findBy(find , callback){db.findMuch(collectionName , find , {} , callback)}

  static toOBjectID(id){return db.ObjectID(id)}

}
