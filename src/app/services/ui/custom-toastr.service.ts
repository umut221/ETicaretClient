import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }

  message(message:string, title:string, messageType:ToastrMessageType = ToastrMessageType.Success, position: ToastrPosition = ToastrPosition.BottomLeft){
      this.toastr[messageType](message,title,{
        positionClass: position
      })
  }
}


export enum ToastrMessageType{
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info"
}

export enum ToastrPosition{
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  TopLeft = "toast-top-left",
  BottomLeft= "toast-bottom-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"
}
