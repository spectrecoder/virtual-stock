import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationBoxComponent } from './confirmation-box/confirmation-box.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ConfirmationBoxComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports:[
  ]
})
export class SharedModule { }
