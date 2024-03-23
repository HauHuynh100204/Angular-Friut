// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';
// import { Carts } from '../cart';
// import { CartService } from '../cart.service';
// import { Products } from '../products';
// import { ProductsService } from '../products.service';

// @Component({
//   selector: 'app-product-details',
//   templateUrl: './product-details.component.html',
//   styleUrls: ['./product-details.component.css']
// })
// export class ProductDetailsComponent implements OnInit {
//   productDetail: Products | undefined
//   protected cartList: Carts[] = [];
//   constructor(private router: ActivatedRoute, private prod: ProductsService, private cartService: CartService, private authService: AuthService, private route: Router) {
//     cartService.getAllCartList().subscribe(data => {
//       this.cartList = data
//     })
//     this.authService.ngOnInit()
//     this.userId = this.authService.userId;
//   }
//   InStock: number = 0
//   userId: string | undefined
//   itemCount: number = 0
//   itemSum: number = 0
//   ngOnInit(): void {
//     let id = this.router.snapshot.params['id']
//     this.prod.getProductId1(id).subscribe(res => {
//       this.productDetail = res
//     })
//     this.preload()
//   }
//   preload() {
//     this.cartService.getAllCartList().subscribe(data => {
//       this.cartList = data;
//       this.itemCount = this.cartService.ItemCount(this.userId!);
//       this.itemSum = this.cartService.ItemSum(this.userId!);
//     });
//   }
//   checkInStock() {
//     var bool = false;
//     this.cartService.getAllCartById(this.userId!)?.forEach(e => {
//       if (this.productDetail?.id == e.productId) {
//         if (this.productDetail.inStock <= e.quantity) {
//           bool = true;
//         }
//       }
//     })
//     return bool
//   }

//   // Add() {
//   //   if (this.authService.ngOnInit()) {
//   //     var item = {
//   //       "userId": this.authService.userId,
//   //       "productId": this.productDetail?.id,
//   //       "productName": this.productDetail?.productName,
//   //       "productCode": this.productDetail?.productCode,
//   //       "releaseDate": this.productDetail?.releaseDate,
//   //       "price": this.productDetail?.price,
//   //       "description": this.productDetail?.description,
//   //       "starRating": this.productDetail?.starRating,
//   //       "imageUrl": this.productDetail?.imageUrl,
//   //       "quantity": 1
//   //     }
//   //     var check = this.cartList.find((i) => i.productId == item.productId && i.userId == item.userId)

//   //     if (check) {
//   //       item.quantity += check.quantity
//   //       this.cartService.UpdateCart(check.id, item).subscribe((result) => {

//   //       })
//   //     } else {
//   //       this.cartService.AddCart(item).subscribe((result) => {

//   //       })
//   //     }
//   //     this.reloadCurrentRoute()
//   //   }
//   // }
//   Add() {
//     if (this.authService.ngOnInit()) {
//       var item = {
//         "userId": this.authService.userId,
//         "productId": this.productDetail?.id,
//         "productName": this.productDetail?.productName,
//         "productCode": this.productDetail?.productCode,
//         "releaseDate": this.productDetail?.releaseDate,
//         "price": this.productDetail?.price,
//         "description": this.productDetail?.description,
//         "starRating": this.productDetail?.starRating,
//         "imageUrl": this.productDetail?.imageUrl,
//         "quantity": 1
//       }

//       var check = this.cartList.find((i) => i.productId == item.productId && i.userId == item.userId);

//       if (check) {
//         item.quantity += check.quantity;
//         this.cartService.UpdateCart(check.id, item).subscribe((result) => {
//           // Update inStock after successful update
//           this.productDetail!.inStock -= item.quantity;
//         });
//       } else {
//         this.cartService.AddCart(item).subscribe((result) => {
//           // Update inStock after successful addition
//           this.productDetail!.inStock -= item.quantity;
//         });
//       }
//       this.reloadCurrentRoute();
//     }
//   }
//   private reloadCurrentRoute() {
//     const currentUrl = this.route.url;
//     this.route.navigateByUrl('', { skipLocationChange: true }).then(() => {
//       this.route.navigate([currentUrl]);
//       this.cartService.ganGiaTri()
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Carts } from '../cart';
import { CartService } from '../cart.service';
import { Products } from '../products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetail: Products | undefined
  protected cartList: Carts[] = [];
  constructor(
    private router: ActivatedRoute,
    private prod: ProductsService,
    private cartService: CartService,
    private authService: AuthService,
    private routers: Router,
    private route: Router) {
    cartService.getAllCartList().subscribe(data => {
      this.cartList = data
    })
    this.authService.ngOnInit()
    this.userId = this.authService.userId;
  }
  InStock: number = 0
  userId: string | undefined
  itemCount: number = 0
  itemSum: number = 0
  ngOnInit(): void {
    let id = this.router.snapshot.params['id']
    this.prod.getProductId1(id).subscribe(res => {
      this.productDetail = res
    })
    this.preload()
  }
  preload() {
    this.cartService.getAllCartList().subscribe(data => {
      this.cartList = data;
      this.itemCount = this.cartService.ItemCount(this.userId!);
      this.itemSum = this.cartService.ItemSum(this.userId!);
    });
  }
  checkInStock() {
    var bool = false;
    this.cartService.getAllCartById(this.userId!)?.forEach(e => {
      if (this.productDetail?.id == e.productId) {
        if (this.productDetail.inStock <= e.quantity) {
          bool = true;
        }
      }
    })
    return bool
  }

  Add() {
    if (this.authService.ngOnInit()) {
      var item = {
        "userId": this.authService.userId,
        "productId": this.productDetail?.id,
        "productName": this.productDetail?.productName,
        "productCode": this.productDetail?.productCode,
        "releaseDate": this.productDetail?.releaseDate,
        "price": this.productDetail?.price,
        "description": this.productDetail?.description,
        "starRating": this.productDetail?.starRating,
        "imageUrl": this.productDetail?.imageUrl,
        "quantity": 1
      }

      var check = this.cartList.find((i) => i.productId == item.productId && i.userId == item.userId);

      if (check) {
        item.quantity += check.quantity;
        this.cartService.UpdateCart(check.id, item).subscribe((result) => {
          // Update inStock after successful update
          this.productDetail!.inStock -= item.quantity;
        });
      } else {
        this.cartService.AddCart(item).subscribe((result) => {
          // Update inStock after successful addition
          this.productDetail!.inStock -= item.quantity;
        });
      }
      this.reloadCurrentRoute();
    }
    else {
      alert('Bạn phải đăng nhập mới mua sản phẩm được')
      this.routers.navigate(['/login']);
    }
  }
  private reloadCurrentRoute() {
    const currentUrl = this.route.url;
    this.route.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
      this.cartService.ganGiaTri()
    });
  }
}
