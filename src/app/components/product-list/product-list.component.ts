import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  
  products: Product[] = [];
  
  currentCategoryId!: number;

  isSearchlevel!: boolean;

  constructor(private service : ProductService,
               private activatedRoute: ActivatedRoute) { }




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
    const theKeyword : string = this.activatedRoute.snapshot.paramMap.get('keyword')!;

    //search products using keyword
    this.service.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
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

     this.service.getProductsList(this.currentCategoryId).subscribe( 
       data => {
         this.products = data;
       }
     )

    }




}