import { UserAuthService } from './../../../services/common/models/user-auth.service';
import { AuthService } from './../../../services/common/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser, FacebookLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userAuthService:UserAuthService, spinner:NgxSpinnerService, private authService:AuthService, private activatedRoute: ActivatedRoute, private router:Router,
    private socialAuthService: SocialAuthService) { 
    super(spinner);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.AtomBall);
      switch (user.provider){
        case "GOOGLE":
          await this.userAuthService.googleLogin(user, () => {
            this.authService.IdentityCheck();
            this.hideSpinner(SpinnerType.AtomBall);
            if(this.authService.isAuthenticated) this.router.navigate([""]);
          }); 
          break;
        case "FACEBOOK":
          await this.userAuthService.facebookLogin(user, () => {
            this.authService.IdentityCheck();
            this.hideSpinner(SpinnerType.AtomBall);
            if(this.authService.isAuthenticated) this.router.navigate([""]);
          })
          break;
      }
    });
  }
  ngOnInit(): void {
  }
  async login(usernameOrEmail:string, password:string){
    this.showSpinner(SpinnerType.AtomBall);
    await this.userAuthService.login(usernameOrEmail,password, ()=>{
      this.authService.IdentityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string =params["returnUrl"];
        if(returnUrl) 
            this.router.navigate([returnUrl]);
        else
            this.router.navigate([""]);
      });
      this.hideSpinner(SpinnerType.AtomBall);
    });
  }

  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
