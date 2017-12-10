import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cards:Array<String>
  constructor() { this.cards = []}

  ngOnInit() {
    this.cards.push("Hola")
    this.cards.push("Hola")
    this.cards.push("Hola")
    this.cards.push("Hola")
  }

}
