import {HttpErrorResponse} from '@angular/common/http'
export class ErrorHandler{
handleError(errorResponse:HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
       console.error('client side error',errorResponse.error.message)
       console.error('server side error',errorResponse)
    }else{
        return alert('please refresh website again')
    }
}
}