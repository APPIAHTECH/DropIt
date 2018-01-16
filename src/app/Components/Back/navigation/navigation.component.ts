import { Component, OnInit } from '@angular/core';
import { HelperService } from './../../../global/Helper.service';
import { User } from './../../../model/User.model';
import {AppComponent} from './../../app.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  scrolling:boolean = false
  profileUrl:string
  title:string

  constructor(public helper:HelperService , public user:User) {
    this.title = AppComponent.TITLE
    let model = JSON.parse(localStorage.getItem('user'))
    user.setModel(model)
    this.profileUrl = "profile/"+user.getUserID()
  }

  ngOnInit() {window.onscroll = ()=> this.scrollFunction()}

  scrollFunction(){

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
      this.scrolling = true
    else
      this.scrolling = false
  }

  exit(){
    localStorage.clear()
    sessionStorage.clear()
    this.helper.redirectTo('/')
  }

}
