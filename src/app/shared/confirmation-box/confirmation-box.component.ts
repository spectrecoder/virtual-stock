import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.css']
})
export class ConfirmationBoxComponent implements OnInit {
  message:string = "Do You really want to delete this record?";

  constructor(@Inject(MAT_DIALOG_DATA) data:any,private dialogRef:MatDialogRef<ConfirmationBoxComponent>) { 
    if(data){
      this.message = data.message || this.message;
    }
  }

  ngOnInit(): void {
  }

  onConfirmClick(){
    this.dialogRef.close(true);
  }

}
