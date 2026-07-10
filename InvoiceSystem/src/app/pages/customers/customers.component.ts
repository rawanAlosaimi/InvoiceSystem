import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerDialogComponent } from '../../dialogs/add-customer-dialog/add-customer-dialog.component';
import { ActionConfirmDialogComponent } from '../../dialogs/action-confirm-dialog/action-confirm-dialog.component';
import { CustomerService, Customer, AddNewCustomer } from './services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customersList: Customer[] = [];

  constructor(private dialog: MatDialog, private _customerService: CustomerService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCustomers();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  getCustomers() {
    this._customerService.getAllCustomers().subscribe(data => {
      this.customersList = data;
    });
  }

  // Add Customer
  openAddCustomerDialog() {
    const addCustomerDialog = this.dialog.open(AddCustomerDialogComponent, {
      data: {
        customer: '',
        isEdit: false,
        title: 'Add new customer'
      } 
    });

    addCustomerDialog.afterClosed().subscribe(result => {
      if (result.action == 'save') {
        this.addCustomer(result.data);
      }
    });
  }

  addCustomer(customer: AddNewCustomer) {
    this._customerService.addNewCustomer(customer).subscribe({
      next: () => {
        this.getCustomers();

        this.snackBar.open('Customer added successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        console.log(err);

        this.snackBar.open('Error while adding customer', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  // Update Customer
  updateCustomerDialog(customer: Customer) {
    const updateCustomerDialog = this.dialog.open(AddCustomerDialogComponent, {
      data: {
        customer: customer,
        isEdit: true,
        title: 'Edit Customer'
      } 
    });

    updateCustomerDialog.afterClosed().subscribe(result => {
      if (!result) return;

      if (result.action == 'save') {
        this.updateCustomer(result.data);
      } else if (result.action == 'noChange') {
        this.snackBar.open('No changes detected', 'Close', { duration: 3000 });
      } else if (result.action == 'close') {
        return;
      }
    });
  }

  updateCustomer(customer: Customer) {
    this._customerService.updateCustomer(customer).subscribe({
      next: () => {
        // update ui
        this.customersList = this.customersList.map(c =>
          c.id === customer.id ? customer : c
        );

        this.snackBar.open('Customer updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        console.log(err);

        this.snackBar.open('Error while updating customer', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  deleteCustomerDialog(id: number) {
    const deleteCustomerDialog = this.dialog.open(ActionConfirmDialogComponent, {
      data: {
        title: 'Are you sure you want to delete this customer?',
        actionType: 'Delete'
      }
    });

     deleteCustomerDialog.afterClosed().subscribe(result => {
      if (!result) return;

       if (result.action == 'Delete') {
         this.deleteCustomer(id);
      } else if (result.action == 'close') {
        return;
      }
    });
  
}

  deleteCustomer(id: number) {
    this._customerService.deleteCustomer(id).subscribe({
      next: () => {

        this.customersList = this.customersList.filter(c => c.id !== id);

        this.snackBar.open('Customer deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

      },
      error: () => {
        this.snackBar.open('Error deleting customer', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  getFirstTwoLetters(name: string): string {
    return name
      .replace(/\s/g, '')
      .substring(0, 2)
      .toUpperCase();
  }
}
