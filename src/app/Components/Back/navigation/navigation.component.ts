import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  scrolling:boolean = false

  constructor() { }

  ngOnInit() {window.onscroll = ()=> this.scrollFunction()}

  scrollFunction(){

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
      this.scrolling = true
    else
      this.scrolling = false
  }

}
