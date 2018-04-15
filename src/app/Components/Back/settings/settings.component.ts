import { Component, OnInit } from '@angular/core';
import { User } from './../../../model/User.model'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  freeSpace = "1GB"
  tab:number
  options:Array<string> = ['Avilable' , 'Used']
  values:Array<number> = [100 , 0]

  constructor(public user:User) {
    let model
    this.tab = 1
    model = JSON.parse(localStorage.getItem('user'))
    user.setModel(model)
    this.setAccountInfor(user)
    this.setTypeAccount(user)
  }

  ngOnInit() {}

  selectTab(tab:number){
    this.tab = tab
  }

  onSelectionChange():void{
  }

  isSelected(checkTab:number){
    return this.tab === checkTab
  }

  save(){

  }

  setAccountInfor(user:User){

    let totalSpace = user.accountInfo.totalSpace
    let usedSpace = user.accountInfo.usedSpace

    if(totalSpace == this.freeSpace)
      this.values[1] = totalSpace / usedSpace;
  }

  setTypeAccount(user:User){

  }

}
