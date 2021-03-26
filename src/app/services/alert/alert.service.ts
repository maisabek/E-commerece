import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'
import { Router,NavigationStart } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AlertService {
 private subject=new Subject()
  keepAfterNavigationChange=false
  constructor(private router:Router){
    this.router.events.subscribe(events =>{
      if(events instanceof NavigationStart){
        if(this.keepAfterNavigationChange){
          this.keepAfterNavigationChange=false
        }
      }else{
        this.subject.next()
      }
    })
  }
   success(message:string,keepAfterNavigationChange=false){
    this.keepAfterNavigationChange=keepAfterNavigationChange
    this.subject.next({type:'success',text:message})
   }
   error(message:string,keepAfterNavigationChange=false){
     this.keepAfterNavigationChange=keepAfterNavigationChange
     this.subject.next({type:'error',text:message})
   }
   getMessage():Observable<any>{
     return this.subject.asObservable()
   }
  
}
