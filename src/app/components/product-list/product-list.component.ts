import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/classes/cart-item';
import { Product } from 'src/app/classes/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  
  products: Product[] = [];
  
  currentCategoryId: number =1;
  previousCategoryId: number = 1;

  isSearchlevel: boolean = false;


  //pagination properties

  thePageNumber : number = 1;
  thePageSize : number = 5;
  theTotalElements : number = 0;

  previousKeyword: string = null; 
  

  constructor(private service : ProductService,
               private activatedRoute: ActivatedRoute,
               private cartService: CartService) { }




  ngOnInit(): void {
     
    this.activatedRoute.paramMap.subscribe(() => {
      this.listRequestedProducts();
   }); 
  }



  listRequestedProducts(){

    this.isSearchlevel = this.activatedRoute.snapshot.paramMap.has('keyword');

    if(this.isSearchlevel) {
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }

  }


  handleSearchProducts(){
    const theKeyword : string = this.activatedRoute.snapshot.paramMap.get('keyword');

    //if keywords are different we are gonna set the page number to 1

    if(this.previousKeyword != theKeyword) {
      this.thePageNumber=1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, pageNumber=${this.thePageNumber}`);


    //search products using keyword
    this.service.searchProductsPaginate(this.thePageNumber-1,
                                        this.thePageSize,
                                        theKeyword).subscribe(this.processResult());
  }


    handleListProducts(){

   //parameter is available or not
   const hasCategoryId:boolean=this.activatedRoute.snapshot.paramMap.has('id');

   if(hasCategoryId) {
     //get the id and convert to number with '+'
     this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id')!;
   }
   else {
     //if no categoryid available, default is 1
     this.currentCategoryId = 1;
    
   }



   //Check if we have different category id than previous
   //Note: Angular will reuse a component if it is currently being reused 

   //if categoryid is different than previous then reset page number to back to 1

   if(this.previousCategoryId != this.currentCategoryId) {

   this.previousCategoryId = this.currentCategoryId;
  }
   console.log(`currentCategoryId = ${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)




     this.service.getProductsListPaginate(this.thePageNumber -1,
                                          this.thePageSize,
                                          this.currentCategoryId)
                                          .subscribe(this.processResult());
    }

    processResult(){
      return data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      };
    }

    updatePageSize(pageSize : number) {
      this.thePageSize = pageSize;
      this.thePageNumber = 1;
      this.listRequestedProducts();
    }

    addToCart(product : Product){
      console.log(`productName= ${product.productName}, ${product.productUnitPrice} `);

      const theCartItem  = new CartItem(product) ;

      this.cartService.addToCart(theCartItem);


    }


    //testing a method ( not related to the current level of app)




}
