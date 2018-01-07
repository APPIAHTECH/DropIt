import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  public static isValidEmail(email:string):boolean{

    if(email === undefined || email == " " || email == "")
      return false

    if(email.length <=0) return false;
    if(!email.includes('@') || !email.includes('.')) return false;

    let mail= email.split('@') , domain , i , count = 0 , pos;
    if(mail.length > 2) return false;

    for(i = 0 ; i < mail[1].length; i++){
      if(mail[1].charAt(i) == '.') count++;
      if(count >= 2) return false;
    }

    pos = mail[1].indexOf('.')+1;
    domain = mail[1].substring(pos);
    if(domain.length <= 1) return false;

    return true;
  }

  getLocalStorageUserToken():any{
    if(!localStorage.getItem('tokenAcces')){
      this.redirectTo('/login');
      return false;
    }else
      return localStorage.getItem('tokenAcces');
  }


  public redirectTo(url:string):void{
    window.location.href = url;
  }

}
