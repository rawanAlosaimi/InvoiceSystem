import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-action-confirm-dialog',
  templateUrl: './action-confirm-dialog.component.html',
  styleUrl: './action-confirm-dialog.component.css'
})
export class ActionConfirmDialogComponent {

  title!: string;
  actionType!: string;
  constructor(private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    // Get dialog data
    this.title = this.data.title;
    this.actionType = this.data.actionType;
  }

  action() {
    this.dialogRef.close({
      action: this.actionType
    });
  }

  close() {
    this.dialogRef.close({
      action: 'close',
      data: ''
    });
  }
}
