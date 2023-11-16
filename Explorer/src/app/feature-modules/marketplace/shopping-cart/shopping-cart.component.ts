import { Component } from '@angular/core';
import { ShoppingCart, OrderItem } from '../model/shopping-cart.model';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  shoppingCart: ShoppingCart;
  orderItem: OrderItem;

  constructor(
    private marketplaceService: MarketplaceService,
    private authService: AuthService
  ) {}

  get total(): number {
    return this.calculateTotal();
  }

  calculateTotal(): number {
    let totalPrice = 0;

    if (this.shoppingCart && this.shoppingCart.orderItems) {
      for (const orderItem of this.shoppingCart.orderItems) {
        totalPrice += orderItem.price;
      }
    }

    return totalPrice;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.loadShoppingCart(user.id); 
      }
    });
  }

  loadShoppingCart(userId: number): void {
    this.marketplaceService.getShoppingCart(userId)
      .subscribe(cart => {
        this.shoppingCart = cart;
        this.shoppingCart.total = this.calculateTotal();
      });
  }

  removeOrderItem(cartId: number | undefined, tourId: number | undefined): void {
    // Check if cartId and tourId are defined before proceeding
    if (cartId === undefined || tourId === undefined) {
      console.error('Invalid cartId or tourId');
      return;
    }
  
    this.marketplaceService.removeOrderItem(cartId, tourId)
      .subscribe(updatedShoppingCart => {
        this.shoppingCart = updatedShoppingCart;
      }, error => {
        console.error('Error removing order item', error);
      });
  }

  purchase(cartId: number ): void {
       
    this.marketplaceService.purchase(cartId)
      .subscribe(updatedShoppingCart => {
        this.shoppingCart = updatedShoppingCart;
      }, error => {
        console.error('Error purchasing items', error);
      });
  }
  
}
