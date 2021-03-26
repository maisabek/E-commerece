import { User } from './user';
import { PaymentMethods } from '../enums/payment-methods.enum';

export class Payment {
    id: number;
    client: User;
    date: Date;
    amount: number;
    payment_method: PaymentMethods;
    invoiceId: number;
}
