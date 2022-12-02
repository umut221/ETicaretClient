import { NgxSpinnerService } from 'ngx-spinner';
export class BaseComponent{

  constructor(private spinner: NgxSpinnerService) { }
  
  showSpinner(spinnerType: SpinnerType){
    this.spinner.show(spinnerType);

    setTimeout(() => this.hideSpinner(spinnerType), 500);
  }

  hideSpinner(spinnerType: SpinnerType){
    this.spinner.hide(spinnerType);
  }

}
export enum SpinnerType{
  AtomBall = "s1",
  ScaleBall = "s2",
  ClockwiseBall = "s3"
}