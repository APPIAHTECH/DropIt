import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers} from '@angular/http';
import { DataRequestService } from '../global/data-reuqest.service';
import { AppComponent } from '../Components/app.component';

@Injectable()
export class User{

  public userID:string;
  public email:string;
  public username:string;
  public password:string;
  public registrationType:string;
  public accountType:string;
  public followers:number
  public following:number;
  public accountInfo:any;
  public profileImg:string;
  public restorPasswordToken : string;
  public accesToken:string;
  public notificationConfig:any;

  private userAuthUrlSingup = AppComponent.HOST + 'api/auth/singup';
  private userAuthUrlLogin = AppComponent.HOST + 'api/auth/login';
  private userAuthUrlResetPassword:string = AppComponent.HOST + 'api/auth/resetPassword'
  private userAuthUrlResetNewPassword:string = AppComponent.HOST + 'api/auth/resetPassword/newPassword'
  private userDataUrl:string = AppComponent.HOST + 'api/user/data'
  private userUpdateUrl:string = AppComponent.HOST + 'api/user/update'
  private userGetBy:string = AppComponent.HOST + 'api/user/get/by'

  constructor(private request:DataRequestService){
    this.setProfileImg("http://www.creativehdwallpapers.com/uploads/large/abstract-wallpaper/abstract-wallpaper-purple.jpg");
  }

  public setFollowers(followers:number){this.followers = followers}
  public setFollowing(follo:number){this.following = follo}
  public setAccountType(type:string){this.accountType = type}
  public setNotificationConfig(noti:any){this.notificationConfig = noti}
  public setAccountInfo(acc:any){this.accountInfo = acc}

  public setUserID(id:string){this.userID = id}
  public setEmail(email:string){this.email = email}
  public setUsername(username:string){this.username = username}
  public setProfileImg(img:string){this.profileImg = img}
  public setPassword(pass:string){this.password = pass}
  public setAccesToken(token:string){
    this.accesToken = token;
    this.request.setToken(this.accesToken);
  }


  public setRestorPasswordToken(token:string){this.restorPasswordToken = token}

  public getFollowers(){return this.followers}
  public getFollowing(){return this.following}
  public getAccountType(){return this.accountType}
  public getNotificationConfig(){return this.notificationConfig}
  public getAccountInfo(){return this.accountInfo}


  public getUserID(){return this.userID}
  public getEmail(){return this.email}
  public getUsername(){return this.username}
  public getProfileImg(){return this.profileImg}
  public getPassword(){return this.password}
  public getAccesToken(){return this.accesToken}

  public login(user:this , callback):void{

    this.request.post(user.userAuthUrlLogin , user)
      .subscribe(
        response => callback(response),
        error => callback(error)
      );
  }

  public singup(user:this , callback):void{
    this.request.post(this.userAuthUrlSingup , user)
      .subscribe( (response) => {callback(response , null)} , (error)=> {callback(null , error)});
  }

  public resetPassword(user:this , callback):void{
    this.request.post(this.userAuthUrlResetPassword , user)
      .subscribe( (response) => {callback(response , null)} , (error)=> {callback(null , error)});
  }

  public resetPasswordNewPassword(user:this , callback):void{
    this.request.post(this.userAuthUrlResetNewPassword , user)
      .subscribe( (response) => {callback(response , null)} , (error)=> {callback(null , error)});
  }

  public getData(callback){

    this.request.get(this.userDataUrl , true)
      .subscribe(response =>{
        callback(response.userData)
      }, error =>{console.error(error)});
  }

  public getUserByID(id:string , callback){

    this.request.get(this.userGetBy+"/"+id , true)
      .subscribe(response =>{
        callback(response.userData)
      }, error =>{console.error(error)});
  }

  public updateUser(user:this , callback):void{

    this.request.postContent(user.userUpdateUrl , user , true)
      .subscribe(
        response => callback(response),
        error => callback(error)
      );
  }

  public setModel(model):void{
    this.setUserID(model.publicID)
    this.setUsername(model.username)
    this.setEmail(model.email)
    this.setProfileImg(model.profileImg)
    this.setAccountType(model.accountType)
    this.setFollowers(model.followers)
    this.setFollowing(model.following)
    this.setNotificationConfig(model.notificationConfig)
    this.setAccountInfo(model.accountInfo)
    this.setAccesToken(localStorage.getItem('tokenAcces').toString())
  }

}
