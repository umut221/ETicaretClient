import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService ) {
    super(spinner)
   }

  ngOnInit(): void {
  }
}
