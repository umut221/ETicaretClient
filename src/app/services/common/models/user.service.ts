import { SocialUser } from '@abacritt/angularx-social-login';
import { TokenResponse } from './../../../contracts/token/TokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../ui/custom-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_User } from './../../../contracts/users/create_user';
import { User } from './../../../entities/user';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastr: CustomToastrService) { }

  async create(user: User): Promise<Create_User>{
    const observable:Observable<Create_User | User> = this.httpClientService.post<User | Create_User>({
      controller:"users"
    },user);
    return await firstValueFrom(observable) as Create_User;
  }

  async login(usernameOrEmail:string, password:string, successCallBack?: () => void): Promise<any>{
    const observable:Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"users",
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
      controller:"users",
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
      controller:"users",
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


