import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers} from '@angular/http';
import { DataRequestService } from '../global/data-reuqest.service';
import { AppComponent } from '../Components/app.component';

@Injectable()
export class Project {

  public title:string
  public description:string
  public genre:string
  public vstList:Array<string>
  public author:string
  public publicUserID:string
  public userName:string
  public profileImage:string
  public projectLink:string
  public projectID:string
  public imageLink:string
  public state:string
  public uploadFile:any
  public downloadRate:number
  public like:number
  public view:number
  public date : Date

  private urlGetProject:string = AppComponent.HOST + "api/getProject"
  private urlCreatProject:string = AppComponent.HOST + "api/createProject"
  private urlDownload:string = AppComponent.HOST + "api/project/download"
  private urlFindByName:string = AppComponent.HOST + 'api/find/project'
  private urlFindByTag:string = AppComponent.HOST + 'api/find/project/by'
  private urlFindByID:string = AppComponent.HOST + 'api/find/project/by/id'
  private urlUserProjectBy:string = AppComponent.HOST + 'api/find/user/project'

  private urlRateViews:string = AppComponent.HOST + 'api/rates/views'
  private urlRateLikes:string = AppComponent.HOST + 'api/rates/likes'
  private urlRateComents:string = AppComponent.HOST + 'api/rates/coment'
  private urlRateLoveit:string = AppComponent.HOST + 'api/rates/loveit'
  private urlUserProjectData:string = AppComponent.HOST + 'api/get/user/project/data/info'
  private urlUpdate:string = AppComponent.HOST + 'api/project/update'
  private urlDel:string = AppComponent.HOST + 'api/project/delete'


  constructor(public request:DataRequestService) { }

  createProject(title , description , vstList  , genre , author , userID , userName , profileImage , imageLink , state):Project{
    this.title = title
    this.description = description
    this.vstList = vstList
    this.genre = genre
    this.author = author
    this.publicUserID = userID
    this.userName = userName
    this.profileImage = profileImage
    this.imageLink = imageLink
    this.state = state
    this.downloadRate = 0
    this.view = 0
    this.like = 0
    return this
  }

  setUploadFile(uploadFile){this.uploadFile = uploadFile}

  getTitle(){return this.title}

  getProjects(callback):void{

    this.request.get(this.urlGetProject , false)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  save(project:FormData , callback){
    this.request.postContent(this.urlCreatProject , project , true)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  download(link , callback){
    let encodedUrl = this.urlDownload + '/' + link
    this.request.getDownload(encodedUrl, false)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  findProjectByName(name , callback){
    let url = this.urlFindByName + '/'+ name
    this.request.get(url , false)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  getUserProjectBy(userID , by , callback){
    let url = this.urlUserProjectBy + '/'+ userID + '/' + by
    this.request.get(url , false)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  findProjectByID(id , callback){
    let url = this.urlFindByID + '/'+ id
    this.request.get(url , false)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  findProjectByTag(tag , callback){
    let url = this.urlFindByTag + '/'+ tag
    this.request.get(url , false)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  getProjectDataInfo(userID , callback){
    let url = this.urlUserProjectData + '/'+ userID
    this.request.get(url , false)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  incrementView(id  , callback){
    let url = this.urlRateViews + '/'+ id
    this.request.get(url , false)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  incrementLike(id  , callback){
    let url = this.urlRateLikes + '/'+ id
    this.request.get(url , false)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  addComent(coment , callback){
    this.request.postContent(this.urlRateComents , coment , true)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  loveIt(loveObj , callback){
    this.request.postContent(this.urlRateLoveit , loveObj , true)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

  update(project:Project , callback){
    this.request.postContent(this.urlUpdate , project , true)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }
  delete(id:any , callback){
    this.request.postContent(this.urlDel , {id : id} , true)
    .subscribe( (response) => callback(response), (error)=> console.error(error))
  }

}
