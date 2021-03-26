import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  availableData = {
    totalOrders: 0,
    totalPayments: 0,
  }
  constructor(private orderService:OrderService,private authService:AuthService,
    public translate:TranslateService){}

  ngOnInit(){
    this.availableData.totalOrders=this.orderService.orders.length
    this.availableData.totalPayments=this.authService.paymentMethods.length
  }

}
