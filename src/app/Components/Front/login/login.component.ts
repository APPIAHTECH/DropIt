import { Component, OnInit } from '@angular/core';
import { HelperService } from './../../../global/Helper.service';
import { User } from './../../../model/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public passError = false
  public mailError = false
  public errorMsg = "What's The New Stuff Are You Building ? , Welcome Back :D"
  public msg = "READY?"

  constructor(public user:User , public helper:HelperService) { }

  ngOnInit() { }



  login(){
      if(this.validation()){

        this.user.login(this.user , (user)=>{

          if(user.exist && user.validatedAccount && user.passwordMathed){

            this.msg = "Let go! "
            this.errorMsg = "Dropit is waiting for you :D"
            localStorage.setItem('tokenAcces' , user.tokenAcces)
            this.user.setAccesToken(user.tokenAcces)
            this.user.getData((res)=>{
              localStorage.setItem('user' , JSON.stringify(res))
              this.helper.redirectTo('/dashboard')
            })

          }else if(!user.exist){
            this.msg = "Unlucky "
            this.errorMsg = "Wrong credentianls , have you wrote the email and password correctly ?"
          }else if(!user.passwordMathed){
            this.msg = "Unlucky "
            this.errorMsg = "Wrong credentianls ,  have you wrote the email and password correctly ? "

          }else{
            this.msg = "Error "
            this.errorMsg = "UPS !.Something went wrong , refresh the page and try it again. "
          }

        })

      }
  }


  validation():boolean{

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

}
