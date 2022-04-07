import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { CartItem } from 'src/app/classes/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems : CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity:number = 0;
  isAuthenticated: boolean = false;
  storage: Storage = sessionStorage;


  constructor(private oktaAuthService: OktaAuthService,
             private cartService: CartService) { }

  async ngOnInit(): Promise<void> {

        this.isAuthenticated = await this.oktaAuthService.isAuthenticated();
/*
        // Subscribe to authentication state changes
        this.oktaAuthService.$authenticationState.subscribe(
          (result) => {
            this.isAuthenticated = result;
            this.getUserDetails();
          }
        );
        */
        

    this.listCartDetails();

  }

  getUserDetails() {
    if (this.isAuthenticated) {
      
      // Fetch the logged in user details (user's claims)
      //
      
      this.oktaAuthService.getUser().then(
        (res) => {
         
          // getting the email address from authentication response
          const theEmail = res.email;

          //email is stored in browser storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail));  
        }
      );
    }
  }



  listCartDetails() {

   this.cartItems = this.cartService.cartItems;

   this.cartService.totalPrice.subscribe(
     data => this.totalPrice = data
   );

   this.cartService.totalQuantity.subscribe(
     data =>this.totalQuantity = data
   );

   this.cartService.computeCartTotals();
  }


  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }

}
