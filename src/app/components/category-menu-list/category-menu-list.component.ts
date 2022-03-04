import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/classes/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-menu-list',
  templateUrl: './category-menu-list.component.html',
  styleUrls: ['./category-menu-list.component.css']
})
export class CategoryMenuListComponent implements OnInit {

  productCategories!: ProductCategory[];

  constructor(private service: ProductService) { }

  ngOnInit(): void {

    this.listProductCategories();

  }

  listProductCategories() {
    
    this.service.getCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );


  }

}
