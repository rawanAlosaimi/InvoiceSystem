import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrl: './add-customer-dialog.component.css'
})
export class AddCustomerDialogComponent {

  title!: string;
  isEdit!: boolean;
  mobileNumberErorr: boolean = false;
 
  constructor(private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }
 
  customerForm = new FormGroup({
    id: new FormControl(0), 
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    address: new FormControl('', Validators.required)
  });

  ngOnInit() {
    // fill customer data in edit mood
    if (this.data.customer) {
      this.customerForm.patchValue(this.data.customer);
    }

    // Get dialog data
    this.title = this.data.title;
    this.isEdit = this.data.isEdit;
  }

  save() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    let mobileNum = this.customerForm.get('mobile')?.value as string;


    if (mobileNum?.length < 10) {
      this.mobileNumberErorr = true;
      return;
    } else {
      this.mobileNumberErorr = false;
    }

    if (this.isEdit) {

      const original = this.data.customer;
      const current = this.customerForm.value;

      if (JSON.stringify(original) === JSON.stringify(current)) {
        
        this.dialogRef.close({
          action: 'noChange'
        });

        return;
      }
    }

    this.dialogRef.close({
      action: 'save',    
      data: this.customerForm.value
    });
  }

  close() {
    this.dialogRef.close({
      action: 'close',
      data: ''
    });
  }
}
