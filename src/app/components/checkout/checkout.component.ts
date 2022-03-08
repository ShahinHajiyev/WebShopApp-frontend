import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {

   this.checkoutFormGroup = this.formBuilder.group({
     customer: this.formBuilder.group({
       firstName: [''],
       lastName: [''],
       email: ['']
     }),
     shippingAddress:this.formBuilder.group({
       streetAddress:[''],
       city:[''],
       state:[''],
       postalCode:[''],
       country:['']
     }),
      billingAddress:this.formBuilder.group({
        streetAddress:[''],
        city:[''],
        state:[''],
        postalCode:[''],
        country:['']
      }),
      card:this.formBuilder.group({
        cardNumber:[''],
        cardName:[''],
        expirationMonth:[''],
        expirationYear:[''],
        cvv:['']
   })
  });

  }

  onSubmit(){
    console.log('Just Display');
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('customer')?.value.email);
  }

  copyShippingToBilling(event){

    if(event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

}
