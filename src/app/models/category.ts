import { CategoryType } from '../enums/category-type.enum';
import { Product } from './porduct';

export class Category {
    id: number
    name:string
    title: string
    category:string
    image:string
    description: string
    products: Product[]
    type: CategoryType
}
