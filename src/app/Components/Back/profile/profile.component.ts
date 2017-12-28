import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tab:number
  cards:Array<String>
  constructor() {   this.tab = 1; this.cards = []}

  ngOnInit() {

    this.cards.push("Hola")
    this.cards.push("Hola")
    this.cards.push("Hola")
    this.cards.push("Hola")
    
  }

  selectTab(tab:number){
    let select = "-1"
    this.tab = tab
  }

  isSelected(checkTab:number){
    return this.tab === checkTab
  }


}
