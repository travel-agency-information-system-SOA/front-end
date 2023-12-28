import { Component } from '@angular/core';
import { ShoppingCart, OrderItem } from '../model/shopping-cart.model';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Coupon } from '../model/coupon.model';
import { CurrencyService } from 'src/app/currency.service';

@Component({
  selector: 'xp-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  shoppingCart: ShoppingCart;
  orderItem: OrderItem;
  usedCoupons: number[] = []
  currency: string[] = ['USD', 'EUR', 'JPY', 'GBP', 'CNY', 'AUD', 'CAD', 'CHF', 'SEK', 'NZD', 'RSD', 'INR'];
  selectedCurrency: string = 'USD';
  previousSelectedCurrency: string;
  exchangeRate: number;
  shouldShowOriginal: boolean;

  constructor(
    private marketplaceService: MarketplaceService,
    private authService: AuthService,
    private currencyService: CurrencyService,
  ) {
    this.shouldShowOriginal = true
    this.previousSelectedCurrency = 'USD'
  }

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
       
    for (const couponId of this.usedCoupons) {
      
      this.marketplaceService.deleteCoupon(couponId).subscribe({
        next: () => {
        },
        error: () => {
        }
      })      
    }
    
    this.marketplaceService.updateShoppingCart(this.shoppingCart)
    .subscribe(updatedShoppingCart => {
      this.shoppingCart = updatedShoppingCart;
    }, error => {
      console.error('Error updating cart', error);
    });

    this.marketplaceService.purchase(cartId)
      .subscribe(updatedShoppingCart => {
        this.shoppingCart = updatedShoppingCart;
      }, error => {
        console.error('Error purchasing items', error);
      });
  }

  checkCoupon(code: string, tourId: number): void {

    if(!code){
      return
    }

    this.marketplaceService.getCouponByCodeAndTourId(code, tourId).subscribe({
      next: (coupon: Coupon) => {
        if(!coupon){
          alert("Coupon you entered is ether invalid, expired or for a wrong tour!")
          return
        }

        for (const orderItem of this.shoppingCart.orderItems) {
          if(orderItem.idTour === tourId) {
            orderItem.price -= (coupon.discount/100)*orderItem.price
          }
        }

        this.shoppingCart.total = this.calculateTotal();
        this.usedCoupons.push(coupon.id)
        alert("Coupon successfuly used!")

      },
      error: () => {
      }
    })


  }

  onCurrencyChange(newCurrency: string): void {
    this.selectedCurrency = newCurrency;
    console.log(this.previousSelectedCurrency + " u " + this.selectedCurrency)
    // Fetch the new exchange rate
    this.currencyService.getExchangeRate(this.selectedCurrency).subscribe(
      (exchangeRate: number) => {
        // Use the exchange rate here
        this.exchangeRate = exchangeRate;
        console.log(this.exchangeRate)
        // Set the flag to show the converted price
        this.shouldShowOriginal = false;
      },
      (error: any) => {
        // Handle errors if needed
        console.error('Error fetching exchange rate:', error);
      }
    );
    this.previousSelectedCurrency = this.selectedCurrency
  }

  convertedCurrency(originalPrice: number): string {
    const convertedPrice = originalPrice * this.exchangeRate;
    console.log(originalPrice)    // Format the converted price as needed
    return convertedPrice.toFixed(2);
  }
  
}
