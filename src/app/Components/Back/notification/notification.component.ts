import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input('alertType') alertType
  @Input('message') message
  @Input('autoClose') autoClose
  @Input('show') show

  constructor() {}

  ngAfterContentInit() { }

  ngOnInit() { }

  close(event){ this.show = false}

  closeAlert(){
    setTimeout(()=>{
      document.getElementById('alert').hidden = true
    } , 2500)
  }

}
