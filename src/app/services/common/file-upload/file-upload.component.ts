import { DialogService } from './../dialog.service';
import { FileUploadDialogState, FileUploadDialogComponent } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { CustomToastrService, ToastrMessageType } from './../../ui/custom-toastr.service';
import { AlertifyService, MessageType, Position } from './../../admin/alertify.service';
import { HttpClientService } from './../http-client.service';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private alertify: AlertifyService, private toastr: CustomToastrService,
    private dialogService:DialogService) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed : () => {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {
  
          const successMessage = "Files uploaded successfully.";
  
          if (this.options.isAdminPage) {
            this.alertify.message(successMessage, {
              messageType: MessageType.Success,
              dismissOthers: true,
              position: Position.TopRight,
              delay: 4
            })
          } else {
            this.toastr.message(successMessage, "Info", ToastrMessageType.Success)
          }
  
        }, (errorResponse: HttpErrorResponse) => {
  
          const errorMessage: string = "An error was encountered while uploading the file.";
  
          if (this.options.isAdminPage) {
            this.alertify.message(errorMessage, {
              messageType: MessageType.Error,
              dismissOthers: true,
              position: Position.TopRight,
              delay: 4
            })
          } else {
            this.toastr.message(errorMessage, "Info", ToastrMessageType.Error)
          }
        })
      }
    })
  }

  // openDialog(afterClosed:any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width: '250px',
  //     data: FileUploadDialogState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == FileUploadDialogState.Yes){
  //       afterClosed();
  //     }
  //   });
  // }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
