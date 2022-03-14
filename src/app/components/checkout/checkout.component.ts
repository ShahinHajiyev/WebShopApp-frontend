import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/classes/country';
import { Order } from 'src/app/classes/order';
import { OrderItem } from 'src/app/classes/order-item';
import { Purchase } from 'src/app/classes/purchase';
import { State } from 'src/app/classes/state';
import { CheckoutService } from 'src/app/service/checkout.service';
import { CartService } from 'src/app/services/cart.service';
import { FormService } from 'src/app/services/form.service';
import { MyEmptySpaceValidator } from 'src/app/validators/my-empty-space-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];
  countries: Country[] = [];

  shippingAdddressState: State[] = [];
  billingAdddressState: State[] = [];

  constructor(private formBuilder : FormBuilder,
              private formService: FormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  ngOnInit(): void {

    this.reviewCartDetails();

   this.checkoutFormGroup = this.formBuilder.group({
     customer: this.formBuilder.group({
       firstName: new FormControl('',[Validators.required, Validators.minLength(2), MyEmptySpaceValidator.compensateWhiteSpace]),
       lastName:  new FormControl('',[Validators.required, Validators.minLength(2), MyEmptySpaceValidator.compensateWhiteSpace]),
       email:     new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                                                                                    MyEmptySpaceValidator.compensateWhiteSpace])
     }),
     shippingAddress:this.formBuilder.group({
       streetAddress: new FormControl('',[Validators.required, Validators.minLength(2), MyEmptySpaceValidator.compensateWhiteSpace]),
       city:          new FormControl('',[Validators.required, Validators.minLength(2), MyEmptySpaceValidator.compensateWhiteSpace]),
       state:         new FormControl('',[Validators.required]),
       postalCode:    new FormControl('',[Validators.required, Validators.minLength(2), MyEmptySpaceValidator.compensateWhiteSpace]),
       country:       new FormControl('',[Validators.required])
     }),
      billingAddress:this.formBuilder.group({
        streetAddress: new FormControl('',[Validators.required, Validators.minLength(2), MyEmptySpaceValidator.compensateWhiteSpace]),
        city:          new FormControl('',[Validators.required, Validators.minLength(2), MyEmptySpaceValidator.compensateWhiteSpace]),
        state:         new FormControl('',[Validators.required]),
        postalCode:    new FormControl('',[Validators.required, Validators.minLength(2), MyEmptySpaceValidator.compensateWhiteSpace]),
        country:       new FormControl('',[Validators.required])
      }),
      card:this.formBuilder.group({
        cardNumber: new FormControl('',[Validators.pattern('[0-9]{16}'), Validators.required]),
        cardName:   new FormControl('',[Validators.required, Validators.minLength(4), MyEmptySpaceValidator.compensateWhiteSpace]),
        expirationMonth:[''],
        expirationYear:[''],
        cvv:       new FormControl('',[Validators.pattern('[0-9]{3}'), Validators.required])
   })
  });


  //we are gonna populate cards month and year properties;
  const startMonth: number = new Date().getMonth()+1;
  //const startYear: number = new Date().getFullYear();
  

  console.log("startMonth: " + startMonth);
  //console.log("YEAR: " + startYear);

  this.formService.getCreditCardMonth(startMonth).subscribe(
    data => {
      console.log("Obtained month: " + JSON.stringify(data));
      this.creditCardMonth = data; 
    }
  );

  this.formService.getCreditCardYear().subscribe(
    data => {
      console.log("Obtained year: " + JSON.stringify(data));
      this.creditCardYear=data;
    }
  );

  this.formService.getCountries().subscribe(
    data =>{
      console.log("Obtaine countries: " + JSON.stringify(data));
      this.countries = data;
    }
  );

  }
  reviewCartDetails() {

    //subscribe to fields in cart service
    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data
      }
    );

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      }
    );
    
  }


  //this will be used by html template to access to the form control for checking the status of the form control
  get firstName(){ return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName');  }
  get email()    { return this.checkoutFormGroup.get('customer.email');     }

  get shippingAddressStreetAddress()    { return this.checkoutFormGroup.get('shippingAddress.streetAddress');  }
  get shippingAddressCity()             { return this.checkoutFormGroup.get('shippingAddress.city');           }
  get shippingAddressState()            { return this.checkoutFormGroup.get('shippingAddress.state');          }
  get shippingAddressPostalCode()       { return this.checkoutFormGroup.get('shippingAddress.postalCode');     }
  get shippingAddressCountry()          { return this.checkoutFormGroup.get('shippingAddress.country');        }

  get billingAddressStreetAddress()    { return this.checkoutFormGroup.get('billingAddress.streetAddress');    }
  get billingAddressCity()    { return this.checkoutFormGroup.get('billingAddress.city');                      }
  get billingAddressState()    { return this.checkoutFormGroup.get('billingAddress.state');                    }
  get billingAddressPostalCode()    { return this.checkoutFormGroup.get('billingAddress.postalCode');          }
  get billingAddressCountry()    { return this.checkoutFormGroup.get('billingAddress.country');                }

  get cardNumber()    { return this.checkoutFormGroup.get('card.cardNumber');     }
  get cardName()      { return this.checkoutFormGroup.get('card.cardName');       }
  get cardCvv()       { return this.checkoutFormGroup.get('card.cvv');            }




  onSubmit(){
    console.log('Just Display');

    if(this.checkoutFormGroup.invalid){
      //triggers the display of the error messages
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('customer').value.email);
    console.log("Shipping address " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("State is: " + this.checkoutFormGroup.get('shippingAddress').value.state.name);
    

    

    //set up order 
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;


    //get cart items
    const cartItems = this.cartService.cartItems;


    
      
    //let orderItems: OrderItem[] = [];
   // for (let index = 0; index < cartItems.length; index++) {
     // orderItems[index] = new OrderItem(cartItems[index]);
    //}



  //create orderItems from cartItems
    let orderItems  : OrderItem[]= cartItems.map(tempCartItem => new OrderItem(tempCartItem));
    

    //set up purchase
    let purchase = new Purchase();

    //populate purchase customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;


    //populate purchase- shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    //populate purchase billing address
    purchase.billingAddress  = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    //populate purchase -   order and order items
    purchase.order = order;
    purchase.orderItems = orderItems;

    //call rest api with  the checkout service
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          alert(`your order has been received.\nOrder tracking number : ${response.orderTrackingNumber}` );

          //reset cart
          this.resetCart();

        },
        error: err => {
          alert(`There is an error: ${err.message}`);
          
        }
        
      }
    );


  }

  resetCart() {

    //reset cart data

    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    //reset form data

    this.checkoutFormGroup.reset();
    //navigate back to prodcut
    this.router.navigateByUrl("/products");


  }

  copyShippingToBilling(event){

    if(event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      //bug for not copying drop down list from shipping to billing
      this.billingAdddressState = this.shippingAdddressState;
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      
      //for bug fixing
      this.billingAdddressState = [];
    }
  }

  handleDate(){

    const cardFormGroup = this.checkoutFormGroup.get('card');

    const currentYear: number = new Date().getFullYear();
    const selectedYearInForm: number = Number(cardFormGroup?.value.expirationYear);

    //if selected year is the same as current
    let startMonth: number;

    if(currentYear === selectedYearInForm) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonth(startMonth).subscribe(
      data => {
        console.log("Expiretion month: " + JSON.stringify(data));
        this.creditCardMonth = data;
      }
    )

  }

  getStates(formGroupName:string){
     
    const formGroup = this.checkoutFormGroup.get(formGroupName)!;

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country code: ${countryName}`);

    this.formService.getStates(countryCode).subscribe(
      data => {
        if ( formGroupName === 'shippingAddress') {
          this.shippingAdddressState = data;
        }
        else{
          this.billingAdddressState = data;
        }

        formGroup.get('state')?.setValue(data[0]);
      }
    );



  }

}
