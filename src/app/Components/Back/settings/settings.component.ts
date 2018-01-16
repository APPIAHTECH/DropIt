import { Component, OnInit } from '@angular/core';
import { User } from './../../../model/User.model'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  tab:number
  constructor(public user:User) {
    this.tab = 1
    let model = JSON.parse(localStorage.getItem('user'))
    user.setModel(model)
  }

  ngOnInit() {}

  selectTab(tab:number){
    this.tab = tab
  }

  isSelected(checkTab:number){
    return this.tab === checkTab
  }

  save(){}

}
