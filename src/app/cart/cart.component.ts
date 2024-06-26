import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Carts } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartList: Carts[] = []
  InStock: number = 0
  itemCount: number = 0
  itemSum: number = 0
  userId: string | undefined
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router) {
    cartService.getAllCartList().subscribe(data => {
      this.cartList = data
    })
    this.authService.ngOnInit()
    this.userId = this.authService.userId;
  }
  ngOnInit(): void {
    this.preload()
  }
  preload() {
    this.cartService.getAllCartById1(this.userId!).subscribe(data => {
      this.cartList = data;
      this.itemCount = this.cartService.ItemCount(this.userId!);
      this.itemSum = this.cartService.ItemSum(this.userId!);
    });
  }

  Remove(i: string) {
    const userConfirmed = window.confirm("Bạn có chắc muốn xóa sản phẩm này ?");
    if (userConfirmed) {
      this.cartService.DeleteCart(i).subscribe(data => {
        this.reloadCurrentRoute()
      })
    }

  }
  DeleteAll() {
    const userConfirmed = window.confirm("Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng ?");
    if (userConfirmed) {
      this.cartService.getAllCartList().subscribe(data => {
        data.forEach(item => {
          this.cartService.DeleteCart(item.id).subscribe(d => {
            this.reloadCurrentRoute()
          })
        })
      })

    }
  }
  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      this.cartService.ganGiaTri()
      this.ngOnInit()
    });
  }
}
