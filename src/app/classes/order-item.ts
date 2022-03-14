import { CartItem } from "./cart-item";

export class OrderItem {

    imageUrl:string;
    unitPrice:number;
    quantity:number;
    productId: string;

    constructor(cartItem: CartItem){
        this.imageUrl = cartItem.imageURL;
        this.quantity = cartItem.quantity;
        this.unitPrice= cartItem.piecePrice;
        this.productId = cartItem.id;
    }

}
