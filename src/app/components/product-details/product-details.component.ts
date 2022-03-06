import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/classes/cart-item';
import { Product } from 'src/app/classes/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private service : ProductService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }


  handleProductDetails() {
    // getting id param string and convert to int

    const theProductId: number = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.service.getProduct(theProductId).subscribe(
      data =>{
        this.product = data;
      }
    );
  }

  addToCart(){

    console.log(`Adding to cart: ${this.product.productName}, ${this.product.productUnitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
