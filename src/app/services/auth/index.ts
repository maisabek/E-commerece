import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { ErrorInterceptorService } from './error-interceptor.service';

export const interceptorProviders=[
{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},
{provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}
]