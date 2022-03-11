import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/classes/country';
import { State } from 'src/app/classes/state';
import { FormService } from 'src/app/services/form.service';
import { MyEmptySpaceValidator } from 'src/app/validators/my-empty-space-validator';

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
  countries: Country[] = [];

  shippingAdddressState: State[] = [];
  billingAdddressState: State[] = [];

  constructor(private formBuilder : FormBuilder,
              private formService: FormService) { }

  ngOnInit(): void {

   this.checkoutFormGroup = this.formBuilder.group({
     customer: this.formBuilder.group({
       firstName: new FormControl('',[Validators.required, Validators.minLength(2), MyEmptySpaceValidator.compensateWhiteSpace]),
       lastName:  new FormControl('',[Validators.required, Validators.minLength(2), MyEmptySpaceValidator.compensateWhiteSpace]),
       email:     new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                                                                                    MyEmptySpaceValidator.compensateWhiteSpace])
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

  this.formService.getCountries().subscribe(
    data =>{
      console.log("Obtaine countries: " + JSON.stringify(data));
      this.countries = data;
    }
  );

  }


  //this will be used by html template to access to the form control for checking the status of the form control
  get firstName(){ return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName');  }
  get email()    { return this.checkoutFormGroup.get('customer.email');     }




  onSubmit(){
    console.log('Just Display');

    if(this.checkoutFormGroup.invalid){
      //triggers the display of the error messages
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('customer')?.value.email);
    console.log("Shipping address " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
    console.log("State is: " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name);


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
