import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../classes/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() {}

    addToCart(theCartItem: CartItem) {
      
      // we check if there is an item in the cart
      let alreadyExistsInCart : boolean = false;
      let existingCartItem: CartItem = undefined!;

      if(this.cartItems.length > 0) {



        existingCartItem = this.cartItems.find(tempCartItem =>tempCartItem.id === theCartItem.id)!;

        //finding the item in the card by item id
        /*
        for(let tempCartItem of this.cartItems) {
          if(tempCartItem.id === theCartItem.id) {

            existingCartItem = tempCartItem;
            break;
          
        }
      }
      */

      //if we found..
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if(alreadyExistsInCart) {
      existingCartItem.quantity++;
    }

    else {
      //adding item
      this.cartItems.push(theCartItem);
    }

    //calculate total price and quantity
    this.computeCartTotals();
  }


  computeCartTotals() {
    
    let totalPriceValue : number=0;
    let totalQuantityValue : number = 0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.piecePrice; 
      totalQuantityValue += currentCartItem.quantity;
    }

    // we publish new values and all subscribers will receieve new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //logging
    this.logCartData( totalPriceValue, totalQuantityValue);
  }



  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.piecePrice;

      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, 
      piecePrice=${tempCartItem.piecePrice}, subtotal=${subTotalPrice}`);
    }


    console.log(`totalPrice: ${totalPriceValue.toFixed(2)} , quantity=${totalQuantityValue}`);
    console.log('-----');


  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if(cartItem.quantity === 0) {
      this.remove(cartItem);
    }
    else{
      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem) {
    
    //we get the index of the item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);

    //if we find it, we simply remove it from the index
    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }



  }

}
