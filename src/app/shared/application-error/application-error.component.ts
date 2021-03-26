import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ProductService} from '../../services/product/product.service'

@Component({
  selector: 'app-application-error',
  templateUrl: './application-error.component.html',
  styleUrls: ['./application-error.component.scss']
})
export class ApplicationErrorComponent implements OnInit {

  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(private modalService: BsModalService,public ProductService:ProductService){}

  modalRef: BsModalRef;

  ngOnInit(): void {
    this.modalRef = this.modalService.show(this.errorTemplate);
  }

  hide() {
    this.modalRef.hide();
  }

}
