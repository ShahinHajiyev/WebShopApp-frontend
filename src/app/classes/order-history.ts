import { Product } from "./product";

export class OrderHistory {

    id: string;
    orderTrackingNumber: string;
    totalPrice: number;
    totalQuantity: number;
    dateCreated: Date;
    imageURL: string;

    constructor(product:Product) {
        this.imageURL = product.imageURL;
    }

}
