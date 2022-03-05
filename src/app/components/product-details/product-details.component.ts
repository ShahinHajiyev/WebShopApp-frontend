import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private service : ProductService,
              private activatedRoute: ActivatedRoute) { }

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

}
