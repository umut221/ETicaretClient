import { DialogService } from './../../services/common/dialog.service';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from './../../services/admin/alertify.service';
import { HttpClientService } from './../../services/common/http-client.service';
import { DeleteDialogComponent, DeleteState } from './../../dialogs/delete-dialog/delete-dialog.component';
import { ProductService } from './../../services/common/models/product.service';
import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService,
    private alertify: AlertifyService, private spinner: NgxSpinnerService, private dialogService: DialogService) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "/assets/delete.png");
    img.setAttribute("style", "cursor:pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callBack: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed:
        async () => {
          const td: HTMLTableCellElement = this.element.nativeElement;
          await this.httpClientService.delete({
            controller: this.controller
          }, this.id).subscribe(data => {
            $(td.parentElement).animate({
              opasity: 0,
              left: "+=50",
              height: "toogle"
            }, 700, () => {
              this.callBack.emit();
              this.alertify.message("The product has been successfully deleted", {
                messageType: MessageType.Success,
                dismissOthers: true,
                position: Position.TopRight,
                delay: 4
              })
            });
          }, (errorMessage: HttpErrorResponse) => {
            this.spinner.hide(SpinnerType.AtomBall)
            this.alertify.message("An unexpected error was encountered while deleting the product", {
              messageType: MessageType.Error,
              dismissOthers: true,
              position: Position.TopRight,
              delay: 4
            })
          });
        }
    })
  }

}

