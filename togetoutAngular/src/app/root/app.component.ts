import {Component, OnInit} from '@angular/core';
import { AuthService} from "../auth.service";
import { ChatAdapter } from 'ng-chat';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'togetoutAngular';

  constructor(private authService:AuthService) { }

  ngOnInit() {
    localStorage.getItem("token");
    
  }

}
