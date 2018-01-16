import { Component, OnInit , ViewChild } from '@angular/core';
import { User } from './../../../model/User.model'
import { ActivatedRoute } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tab:number
  cards:Array<String>
  id: string
  sub: any
  founded:number
  asSession:boolean
  userFounded ={}
  alertObject:any = {
    alertType:'info',
    message:'',
    show:false,
    autoClose:false
  }

  constructor(public user:User , public route: ActivatedRoute) {
    this.tab = 1
    this.cards = []
    this.founded = 0
    this.asSession = false
    this.sub = this.route.params.subscribe(params =>{
       this.id = params.publicID.toString()
       let model = JSON.parse(localStorage.getItem('user'))
       if(this.id == model.publicID){
         this.founded = 1
         this.asSession = true
         this.user.setModel(model)
       }else{
         this.findUserProfile(this.id)
       }

     })

  }

  ngOnInit() {

    this.cards.push("Hola")
    this.cards.push("Hola")
    this.cards.push("Hola")
    this.cards.push("Hola")

  }

  selectTab(tab:number){
    this.tab = tab
  }

  isSelected(checkTab:number){
    return this.tab === checkTab
  }

  delete(){
    this.alertObject = {
      alertType:'info',
      message:'',
      show:true,
      autoClose:true
    }
  }

  findUserProfile(id:string):void{
    //518f819570272128334fb409f3b14ec8b04cd1ecd5b3db66 ->user to test
    this.user.getUserByID(id , (user)=>{
      if(user){
        this.founded = 2
        this.asSession = false
        this.userFounded = user
        console.log(this.userFounded)
      }
    })
  }

  fileValid(event:any){

    let file : File = event.target.files[0]
    let reader :FileReader = new FileReader();

    if(this.validFileType(file)){
      if(file.size > 1048576)
        alert("length error , max length 1MB")
        else{
          reader.readAsDataURL(file)
          reader.onload = ()=>{
            this.user.setProfileImg(reader.result)
            this.user.updateUser(this.user , (response)=>{
              if(response.updated){
                localStorage.setItem('user' , JSON.stringify(response.user))
              }
            })
          }

        }
    }else
      alert("Not a valid file")
  }

 validFileType(file) {
   let fileTypes = [
     'image/jpeg',
     'image/pjpeg',
     'image/png'
   ]
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }

  return false;
}

}
