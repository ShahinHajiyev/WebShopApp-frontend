import { Product } from "./product";

export class CartItem {

    id: string;
    name: string;
    imageURL: string;
    piecePrice: number;

    quantity!: number;

    constructor(product:Product) {

        this.id = product.productId;
        this.name = product.productName;
        this.imageURL = product.imageURL;
        this.piecePrice = product.productUnitPrice;
        this.quantity=1;

    }
}
