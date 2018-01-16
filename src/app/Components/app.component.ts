import { Component } from '@angular/core';
import { NavigationExtras , Router  , ActivatedRoute} from '@angular/router';
import {NotificationComponent} from './Back/notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public static HOST = "http://localhost:3500/"
  public static TITLE = 'Dropit';

  constructor(private router: Router, private route: ActivatedRoute , notifica:NotificationComponent) {
  }
}
