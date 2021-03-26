import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
   date:any
  constructor(public ProductService:ProductService,public orderService:OrderService,
    public translate:TranslateService) { }

  ngOnInit() {
    this.date=new Date()
  }

}
