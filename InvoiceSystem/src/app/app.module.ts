import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCustomerDialogComponent } from './dialogs/add-customer-dialog/add-customer-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ActionConfirmDialogComponent } from './dialogs/action-confirm-dialog/action-confirm-dialog.component';
import { PrintPreviewComponent } from './dialogs/print-preview/print-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CustomersComponent,
    InvoicesComponent,
    AddCustomerDialogComponent,
    ActionConfirmDialogComponent,
    PrintPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
