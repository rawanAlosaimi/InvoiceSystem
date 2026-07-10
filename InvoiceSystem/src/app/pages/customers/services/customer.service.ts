import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
}

export interface AddNewCustomer {
  name: string;
  email: string;
  mobile: string;
  address: string;
}


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private baseUrl = 'https://localhost:7046/api/Customer';
  constructor(private http: HttpClient) { }

  // fetch all customers from the API
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/GetAllCustomers`);
  }

  // Add New Customer
  addNewCustomer(customer: AddNewCustomer) {
    return this.http.post(`${this.baseUrl}/AddNewCustomer`, customer);
  }

  // Update Customer
  updateCustomer(customer: any) {
    return this.http.put(`${this.baseUrl}/UpdateCustomer`, customer);
  }

  // Delete Customer
  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/DeleteCustomer/${id}`);
  }
}
