import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product/product.service'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public ProductService:ProductService,public translate:TranslateService) { }

  ngOnInit() {
  }

}
