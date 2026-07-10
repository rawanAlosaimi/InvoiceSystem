import { Component, OnInit } from '@angular/core';
import { InvoiceService, Invoice, InvoiceDetails } from './services/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { PrintPreviewComponent } from '../../dialogs/print-preview/print-preview.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit {
  invoicesList: Invoice[] = [];
  invoice!: any;
  constructor(private _invoiceService: InvoiceService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getInvoices();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  getInvoices() {
    this._invoiceService.getAllInvoices().subscribe(data => {
      this.invoicesList = data;
    });
  }

  openPrintDialog(Id: number) {
    this._invoiceService.getInvoiceDetails(Id).subscribe(data => {

      const dialogRef = this.dialog.open(PrintPreviewComponent, {
        data: {
          invoice: data
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result?.action === 'close') {
          return;
        }
      });
    });
  }
} 
