import {Component, OnInit} from '@angular/core';
import { AuthService} from "../auth.service";
import { ChatAdapter } from 'ng-chat';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'togetoutAngular';

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {

    }


}
