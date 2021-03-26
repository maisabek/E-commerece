import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ProductService} from '../../services/product/product.service'

@Component({
  selector: 'app-resource-not-found',
  templateUrl: './resource-not-found.component.html',
  styleUrls: ['./resource-not-found.component.scss']
})
export class ResourceNotFoundComponent implements OnInit {

  @ViewChild('notFoundTemplate', {static: true}) notFoundTemplate: TemplateRef<any>;
  constructor(private modalService: BsModalService,public ProductService:ProductService){}
  modalRef: BsModalRef
  ngOnInit(){
    this.modalRef = this.modalService.show(this.notFoundTemplate)
  }
  hide(){
    this.modalRef.hide();
  }

}
