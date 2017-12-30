import { Component, OnInit} from '@angular/core';
import { Directive, Renderer, ElementRef , ViewChild } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @ViewChild("alert") alert;

  public alertType: string
  public message: string
  public component: string
  public isClosed:boolean
  private nativeElement : Node

  constructor(public renderer : Renderer, public element : ElementRef) { this.nativeElement = element.nativeElement }

  ngAfterContentInit() {
     this.alert.nativeElement.focus();
   }

  ngOnInit() { console.log(this.nativeElement)}

  create(alertSettings:any):void{
    this.alertType = alertSettings.alertType
    this.message = alertSettings.message
    this.component = alertSettings.component
    let appNotify = this.renderer.createElement(this.nativeElement , "alert");
    let place = document.querySelector(this.component)
    place.appendChild(this.nativeElement)
  }

  close(event:any){
    let alert = document.querySelector("#alert")
    alert.remove();
    this.isClosed = true
  }

}
