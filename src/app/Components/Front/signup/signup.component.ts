import { Component, OnInit } from '@angular/core';
import { HelperService } from './../../../global/Helper.service';
import { User } from './../../../model/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public userError = false
  public passError = false
  public mailError = false
  public errorMsg = "Let's build new stuff !"
  public msg = "Join Up"

  constructor(public user:User , public helper:HelperService) { }

  ngOnInit() {
  }

  signup(){
      if(this.validation()){

        this.user.singup(this.user , (user)=>{
          if(user.exist){
            this.msg = "Unlucky "
            this.errorMsg = "This email is on use"
          }else if(user.toValidate){
            alert("We  have send you a confirm link to your email account , please confirm your account ...")
          }else{
            this.msg = "Error "
            this.errorMsg = "UPS !.Something went wrong , refresh the page and try it again. "
          }

        })

      }
  }


  validation():boolean{

    if(this.user.getUsername() === "" || this.user.getUsername() === " " || this.user.getUsername() === undefined){
      this.userError = true
      return false
    }

    if(this.onlyWhiteSpaces(this.user.getUsername())){
      this.userError = true
      return false
    }

    if(!HelperService.isValidEmail(this.user.getEmail())){
      this.mailError = true
      return false
    }

    if(this.user.getPassword() === "" || this.user.getPassword() === " " || this.user.getPassword() === undefined){
      this.passError = true
      return false
    }
      return true

  }

  onlyWhiteSpaces(str) { return !str.replace(/\s/g, '').length }

}
