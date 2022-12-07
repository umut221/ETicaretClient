import { AuthService } from './../../../services/common/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { UserService } from './../../../services/common/models/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService:UserService, spinner:NgxSpinnerService, private authService:AuthService, private activatedRoute: ActivatedRoute, private router:Router) { 
    super(spinner);
  }

  ngOnInit(): void {
  }

  async login(usernameOrEmail:string, password:string){
    this.showSpinner(SpinnerType.AtomBall);
    await this.userService.login(usernameOrEmail,password, ()=>{
      this.authService.IdentityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string =params["returnUrl"];
        if(returnUrl) 
            this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.AtomBall);
    });
  }

}
