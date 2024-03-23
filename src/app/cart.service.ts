// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Carts } from './cart';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   protected cartList: Carts[] = [];
//   constructor(private http: HttpClient, private router: Router) {
//     this.http.get<Carts[]>(`${this.URL}`).subscribe(data => {
//       this.cartList = data;
//     })
//   }
//   private URL = 'http://localhost:3000/carts';
//   ganGiaTri() {
//     this.http.get<Carts[]>(`${this.URL}`).subscribe(data => {
//       this.cartList = data;;
//     })
//   }
//   getAllCartList(): Observable<Carts[]> {
//     return this.http.get<Carts[]>(`${this.URL}`);
//   }
//   getAllCartById(userId: string): Carts[] | undefined {
//     var a = this.cartList.filter((i) => i.userId == userId)
//     return a;
//   }
//   getCartId(id: string): Carts | undefined {
//     return this.cartList.find((i) => i.id == id);
//   }
//   getCartId1(id: number) {
//     return this.http.get<Carts>(`${this.URL}/${id}`);
//   }
//   searchId(id: string) {
//     return this.cartList.find((item) => item.id == id);
//   }
//   AddCart(frmProduct: any): Observable<Carts[]> {
//     var post = this.http.post<Carts[]>(`${this.URL}`, frmProduct);
//     return post;
//   }
//   EditCart(index: number) {
//     return this.cartList[index];
//   }
//   UpdateCart(id: string, frmProduct: any): Observable<Carts[]> {
//     return this.http.put<Carts[]>(`${this.URL}/${id}`, frmProduct);
//   }
//   DeleteCart(id: string): Observable<Carts[]> {
//     return this.http.delete<Carts[]>(`${this.URL}/${id}`);
//   }

//   ItemCount(userId: string) {
//     var count = 0;
//     this.getAllCartById(userId)?.forEach(item => {
//       count += item.quantity
//     })
//     return count;
//   }
//   ItemSum(userId: string) {
//     var sum = 0;
//     this.getAllCartById(userId)?.forEach(element => {
//       sum += element.price * element.quantity
//     });
//     return sum;
//   }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Carts } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private URL = 'http://localhost:3000/carts';
  protected cartList: Carts[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<Carts[]>(`${this.URL}`).subscribe(data => {
      this.cartList = data;
    }, error => {
      console.error('Error fetching cart list:', error);
    });
  }

  ganGiaTri() {
    this.http.get<Carts[]>(`${this.URL}`).subscribe(data => {
      this.cartList = data;
    }, error => {
      console.error('Error fetching cart list:', error);
    });
  }

  getAllCartList(): Observable<Carts[]> {
    return this.http.get<Carts[]>(`${this.URL}`);
  }

  getAllCartById(userId: string): Carts[] {
    return this.cartList.filter((i) => i.userId == userId);
  }

  getAllCartById1(userId: string): Observable<Carts[]> {
    return this.http.get<Carts[]>(`${this.URL}?userId=${userId}`);
  }

  getCartId(id: string): Carts | undefined {
    return this.cartList.find((i) => i.id == id);
  }

  getCartId1(id: number): Observable<Carts> {
    return this.http.get<Carts>(`${this.URL}/${id}`);
  }

  searchId(id: string): Carts | undefined {
    return this.cartList.find((item) => item.id == id);
  }

  AddCart(frmProduct: any): Observable<Carts[]> {
    return this.http.post<Carts[]>(`${this.URL}`, frmProduct);
  }

  EditCart(index: number) {
    return this.cartList[index];
  }

  UpdateCart(id: string, frmProduct: any): Observable<Carts[]> {
    return this.http.put<Carts[]>(`${this.URL}/${id}`, frmProduct);
  }

  DeleteCart(id: string): Observable<Carts[]> {
    return this.http.delete<Carts[]>(`${this.URL}/${id}`);
  }

  ItemCount(userId: string): number {
    let count = 0;
    this.getAllCartById(userId).forEach(item => {
      count += item.quantity;
    });
    return count;
  }

  ItemSum(userId: string): number {
    let sum = 0;
    this.getAllCartById(userId).forEach(element => {
      sum += element.price * element.quantity;
    });
    return sum;
  }
}