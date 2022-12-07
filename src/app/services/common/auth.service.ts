import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  IdentityCheck(){
    const token: string = localStorage.getItem("accessToken");

    // const decodeToken = this.jwtHelper.decodeToken(token);                         //Tokenı parçalara ayırıp her bir veriye erişmemizi sağlar.
    // const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);     //Tokenın ne zamana kadar geçerli olduğunu bulur.
    let expired: boolean;                                                             //Token hala geçerli mi onu kontrol eden yapı.
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      expired = true;
    }
    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean{
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;
