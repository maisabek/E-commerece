import { Invoice } from './invoice'
import { Profile } from './profile'
import { Order } from './order'
import { Payment } from './payment'
export class User {
    id:number
    username:string
    password:string
    zipcode:string
    city:string
    street:string
    isAdmin:boolean
    profile:Profile
    orders:Order[]
    invoices:Invoice[]
    payments:Payment[]
}
