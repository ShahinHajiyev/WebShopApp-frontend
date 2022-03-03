import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[] = [];

  constructor(private service : ProductService) { }

  ngOnInit(): void {
    this.listTheProducts();
  }

  listTheProducts(){
      this.service.getProductsList().subscribe( 
        data => {
          this.products = data;
        }
      )
  }

}
