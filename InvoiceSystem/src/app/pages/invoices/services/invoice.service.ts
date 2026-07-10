import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from "../../customers/services/customer.service";

export interface Invoice {
  id: number;
  customerName: string;
  dateAndTime: Date;
}

export interface InvoiceDetails {
  invoiceId: number;
  customer: Customer;
  dateAndTime: string;
  currency: string;
  items: InvoiceItem[];
  totalAmount: number;
}

export interface InvoiceItem {
  itemName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'https://localhost:7046/api/Invoice';
  constructor(private http: HttpClient) { }

  // fetch all Invoices from the API
  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/GetAllInvoices`);
  }

  // fetch Invoice Detailsfrom the API
  getInvoiceDetails(id: number){
    return this.http.get(`${this.baseUrl}/GetInvoiceDetails/${id}`);
  }
}
