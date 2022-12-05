import { SelectProductImageDialogComponent } from './../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { DialogService } from './../../../../services/common/dialog.service';
import { AlertifyService, MessageType, Position } from './../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { ProductService } from './../../../../services/common/models/product.service';
import { List_Product } from './../../../../contracts/list_product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productService:ProductService,spinner:NgxSpinnerService, private alertify:AlertifyService,
    private dialogService: DialogService
    ) { 
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'photos', 'update', 'delete'];
  
  dataSource: MatTableDataSource<List_Product>= null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() : Promise<void>{
    this.showSpinner(SpinnerType.AtomBall)
    const allProducts: {totalCount: number, products:List_Product[]} = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0 , this.paginator ? this.paginator.pageSize : 5,() => this.hideSpinner(SpinnerType.AtomBall), errorMessage =>
     this.alertify.message(errorMessage,
     {
      messageType:MessageType.Error,
      dismissOthers: true,
      position:Position.TopRight,
      delay:4
    }));
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }

  pageChange(){
    this.getProducts();
  }

  addProductImages(id:string){
    this.dialogService.openDialog({
      componentType:SelectProductImageDialogComponent,
      data: id,
      options : {
        width:"1400px"
      }
    })
  }

  
}
