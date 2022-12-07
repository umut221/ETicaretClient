import { _isAuthenticated } from './../../services/common/auth.service';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../services/ui/custom-toastr.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private toastr:CustomToastrService, private spinner: NgxSpinnerService,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.spinner.show(SpinnerType.AtomBall);
    if(!_isAuthenticated){
      this.router.navigate(["login"],{queryParams: {returnUrl:state.url}});
      this.toastr.message("You need to login!!","Unauthorized Access!", ToastrMessageType.Warning, ToastrPosition.BottomRight);
    }
    this.spinner.hide(SpinnerType.AtomBall);
    return true;
  }
}
