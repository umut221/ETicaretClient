import { FileUploadOptions } from './../../../../services/common/file-upload/file-upload.component';
import { AlertifyService, MessageType, Position } from './../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { Create_Product } from './../../../../contracts/create_product';
import { ProductService } from './../../../../services/common/models/product.service';
import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productService:ProductService, spinner:NgxSpinnerService, private alertify:AlertifyService) {
    super(spinner);
   }

  ngOnInit(): void {
  }

  @Output() createdProduct:EventEmitter<Create_Product> = new EventEmitter();

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller:"product",
    explanation: "Drag or select pictures.",
    isAdminPage: true,
    accept:".png, .jpg, .jpeg"
  };

  create(name:HTMLInputElement,stock:HTMLInputElement,price: HTMLInputElement){
    this.showSpinner(SpinnerType.AtomBall);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    
    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.AtomBall);
      this.alertify.message("The product has been successfully added.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight,
        delay: 4
      }); 
      this.createdProduct.emit(create_product);   
    },(errorMessage: string)=>{
      this.alertify.message(errorMessage,{
        messageType:MessageType.Error,
        dismissOthers:true,
        position:Position.TopRight,
        delay:4
      })
    }
    );
  }

}






//Selam nasılsın? Ben seni çok seviyorum. <3333333333333333333333333333333333333333    -Ece
