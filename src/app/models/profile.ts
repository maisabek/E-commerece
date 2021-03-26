import { User } from './user';

export class Profile {
    id: number;
    user: User;
    username: string;
    lastname: string;
    gender: string;
    age: string;
    email: string;
    address:{
        city: string
        street: string
        zipcode: string
    };
    country: string;
    phone: string;
    cartId: number;
    image: string;

}
