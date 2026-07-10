import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-print-preview',
  templateUrl: './print-preview.component.html',
  styleUrl: './print-preview.component.css'
})
export class PrintPreviewComponent {
  invoice!: any;
  constructor(private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    // Get dialog data
    this.invoice = this.data.invoice;
  }

  print() {
      const printContent = document.getElementById('print-section');
      const windowPrint = window.open('', '', 'width=900,height=650');

      if (!windowPrint || !printContent) return;

      // get style
      const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
          try {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('');
          } catch {
            return '';
          }
        })
        .join('');

      windowPrint.document.write(`
    <html>
      <head>
        <title>Invoice Print</title>

        <style>
          ${styles}

          body {
            font-family: Arial;
            margin: 0;
            padding: 20px;
            color: #000;
          }

          @media print {
            button {
              display: none;
            }
          }
        </style>
      </head>

      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);

      windowPrint.document.close();
      windowPrint.focus();
      windowPrint.print();
    }

}
