import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Product } from 'src/app/models/porduct';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  @Input() inputProduct: Product;
  constructor(public productService: ProductService,
              private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  hideDialog() {
    this.dialog.closeAll();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
