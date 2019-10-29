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
    let token;
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token");
    }


    if(token != null){
      console.log(token);
      console.log("On a réussi à récupérer le token et les infos, vous êtes connectés ! BGGGG !!!!!");
      this.authService.reponse['token'] = token;
      this.authService.getUserInfo();
    }
    else{
      this.authService.reponseErreur = "Votre session a expiré. Merci de vous reconnecter!";
      this.router.navigate(['/login'])
    }

  }

}
