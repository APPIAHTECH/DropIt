import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  tab:number

  constructor() { this.tab = 1 }

  ngOnInit() {
  }

  selectTab(tab:number){
    this.tab = tab
  }

  isSelected(checkTab:number){
    return this.tab === checkTab
  }

}
