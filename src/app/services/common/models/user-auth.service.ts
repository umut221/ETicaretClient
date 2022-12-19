import { Injectable } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { TokenResponse } from 'src/app/contracts/token/TokenResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastr: CustomToastrService) { }

  async login(usernameOrEmail:string, password:string, successCallBack?: () => void): Promise<any>{
    const observable:Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"auth",
      action:"Login"
    }, {usernameOrEmail, password} );
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
    } 

      this.toastr.message("User login successfully.","Info", ToastrMessageType.Success, ToastrPosition.BottomRight);
    successCallBack();
  }

  async googleLogin(user : SocialUser, callBackFunction?: () => void): Promise<any>{
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller:"auth",
      action:"google-login"
    },user)
    const tokenResponse:TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.toastr.message("Google login successfully.","Info!",ToastrMessageType.Success, ToastrPosition.BottomRight);
    }
    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void) : Promise<any>{
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller:"auth",
      action:"facebook-login"
    },user);
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(TokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.toastr.message("Facebook login successfully.","Info!", ToastrMessageType.Success, ToastrPosition.BottomRight);
    }
    callBackFunction();
  }
}
