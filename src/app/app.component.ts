import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Component } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService:AuthService, private toastr:CustomToastrService, private router:Router) {
    authService.IdentityCheck();
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.IdentityCheck();
    this.router.navigate([""]);
    this.toastr.message("Signed Out", "Info!", ToastrMessageType.Info, ToastrPosition.BottomRight);
  }
}