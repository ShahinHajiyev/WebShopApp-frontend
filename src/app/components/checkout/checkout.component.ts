import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];

  constructor(private formBuilder : FormBuilder,
              private formService: FormService) { }

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

}