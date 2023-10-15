import { Component } from '@angular/core';
import {Router,NavigationEnd} from '@angular/router'
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  urlText:string = 'home';
  public constructor(router:Router){
    router.events.pipe(filter( event => event instanceof NavigationEnd))
    .subscribe((res) => {
      if(res instanceof NavigationEnd){
        console.log(res);
        this.urlText = res.url;
      }
    })
  }
}
