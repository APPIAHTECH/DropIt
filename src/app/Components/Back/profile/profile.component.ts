import { Component, OnInit } from '@angular/core';
import { User } from './../../../model/User.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tab:number
  cards:Array<String>

  constructor(public user:User) {
    this.tab = 1
    this.cards = []
    let model = JSON.parse(localStorage.getItem('user'))
    user.setModel(model)
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

  }

}
