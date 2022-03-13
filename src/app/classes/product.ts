

export class Product {

    productId : string | undefined;
    sku!: string;
    productName:string = "";
    productDescription:string = "";
    productUnitPrice:number = 0;
    imageURL:string = "";
    active:boolean = true;
    piecesInStock:number= 0;
    creationDate: Date | undefined ;
    lastUpdate:Date | undefined;



}
