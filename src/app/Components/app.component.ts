import { Component } from '@angular/core';
import { NavigationExtras , Router  , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private permitedNonLoginRoutes : Array<String> = ['/' , 'signup' , 'login' , 'project/detail/:id' , 'add-project' , 'my/profile']
  public static HOST = "http://localhost:3500/"
  public static title = 'Dropit';

  constructor(private router: Router, private route: ActivatedRoute) {

    let href = window.location.href
    let pos = href.lastIndexOf('/')
    let currentUrl = href.substring(pos + 1).trim()
    console.log(currentUrl)
      if(!this.permitedNonLoginRoutes.includes(currentUrl))
        if(!localStorage.getItem('user')) router.navigate(['/'])

  }
}
