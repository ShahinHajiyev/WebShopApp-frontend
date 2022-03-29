import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/classes/cart-item';
import { OrderHistory } from 'src/app/classes/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];

  
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService) { }




  ngOnInit(): void {
         
    this.handleOrderHistory();
  }


  handleOrderHistory(){

    //read email from brows storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail'));

    //data from the service

    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data =>{
        this.orderHistoryList = data._embedded.orders;
      }
    );



  }

}
