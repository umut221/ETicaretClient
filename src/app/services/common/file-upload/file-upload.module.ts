import { DialogModule } from './../../../dialogs/dialog.module';
import { FileUploadComponent } from './file-upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';


@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    DialogModule
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
