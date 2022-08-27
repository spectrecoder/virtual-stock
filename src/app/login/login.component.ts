import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private routes:Router) { }

  ngOnInit(): void {
    $('.toggle').on('click', function() {
      $('.container').stop().addClass('active');
    });
    
    $('.close').on('click', function() {
      $('.container').stop().removeClass('active');
    });
  }

  Login(){
    this.routes.navigate(['/stocks'])
  }

}
