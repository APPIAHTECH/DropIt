import { Component, OnInit } from '@angular/core';
import { HelperService } from './../../../global/Helper.service';
import { User } from './../../../model/User.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  mailError:boolean = false
  passError:boolean = false
  passError2:boolean = false
  codeError:boolean = false
  mathedError:boolean = false

  nextP:number = 1
  code:string
  userCode:string
  passwordTwo:string
  errorMsg:string = "Forgot password ?"
  msg:string = "We will send your a link to the specify email address. Please follow this instructions :"
  constructor(public helper:HelperService , public user:User) { }

  ngOnInit() { }

  reset(){
    if(this.user.getPassword() === "" || this.user.getPassword() === undefined){
      this.passError = true
      return
    }

    if(this.passwordTwo === "" || this.passwordTwo === undefined){
      this.passError2 = true
      return
    }

    if(this.user.getPassword() != this.passwordTwo){
      this.mathedError = true
      this.errorMsg = "Password Dosen't Match"
      this.msg = "Please make shure password maches"
      return
    }

    this.user.resetPasswordNewPassword(this.user , (res)=>{
      if(!res.error){
          alert("You have update your password")
          this.helper.redirectTo('/login')
      }
      else{
        this.errorMsg = "Error "
        this.msg = "UPS !.Something went wrong , refresh the page and try it again. "
      }

    })
  }

  start(){
    if(this.validation()){
      this.user.resetPassword(this.user , (res)=>{

        if(!res.error){
          if(res.exist)
            this.code = res.confirmCode
          else{
            this.errorMsg = "Unlucky"
            this.msg = "can't regonize this email :/"
            this.nextP--
          }
        }
        else{
          this.msg = "Error "
          this.msg = "UPS !.Something went wrong , refresh the page and try it again. "
        }

      })
    }
  }
  next(){this.nextP++}

  confirm(){

    if(this.userCode === "" || this.userCode === undefined){
      this.codeError = true
      return
    }

    if(this.userCode === this.code)
      this.next()
    else{
      this.codeError = true
      return
    }

  }

  validation():boolean{

    if(!HelperService.isValidEmail(this.user.getEmail())){
      this.mailError = true
      return false
    }
      return true

  }

}
