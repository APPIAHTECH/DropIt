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
  public profileImg:string;
  public restorPasswordToken : string;
  public accesToken:string;

  private userAuthUrlSingup = AppComponent.HOST + 'api/auth/singup';
  private userAuthUrlLogin = AppComponent.HOST + 'api/auth/login';
  private userAuthUrlResetPassword:string = AppComponent.HOST + 'api/auth/resetPassword'
  private userAuthUrlRestorPassword:string = AppComponent.HOST + 'api/auth/restorPassword'
  private userDataUrl:string = AppComponent.HOST + 'api/user/data'

  constructor(private request:DataRequestService){
    this.setProfileImg("http://www.creativehdwallpapers.com/uploads/large/abstract-wallpaper/abstract-wallpaper-purple.jpg");
  }

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
    console.log("url -> ", this.userAuthUrlSingup )
    this.request.post(this.userAuthUrlSingup , user)
      .subscribe( (response) => {callback(response , null)} , (error)=> {callback(null , error)});
  }

  public resetPassword(user:this , callback):void{
    this.request.post(this.userAuthUrlResetPassword , user)
      .subscribe( (response) => {callback(response , null)} , (error)=> {callback(null , error)});
  }

  public restorPassword(user:this , callback):void{
    this.request.post(this.userAuthUrlRestorPassword , user)
      .subscribe( (response) => {callback(response , null)} , (error)=> {callback(null , error)});
  }

  public getData(callback){

    this.request.get(this.userDataUrl , true)
      .subscribe(response =>{
        callback(response.userData)
      }, error =>{console.error(error)});
  }

  public setModel(model):void{
    this.setUserID(model.publicID)
    this.setUsername(model.username)
    this.setEmail(model.email)
    this.setProfileImg(model.profileImg)
  }

}
