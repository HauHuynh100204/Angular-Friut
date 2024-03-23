import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; // Thêm import cho FormGroup và FormControl
import { Products } from '../products';
import { ProductsService } from '../products.service'; // Điền đường dẫn thích hợp

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  @Input() productList: Products[] = [];
  showRating(str: any) {
    alert(`${str}`);
  }
  formProduct = new FormGroup({
    // id: new FormControl<number>(1),
    productName: new FormControl<string>(''),
    productCode: new FormControl<string>(''),
    releaseDate: new FormControl<string>(''),
    price: new FormControl<number>(0),
    inStock: new FormControl<number>(0),
    description: new FormControl<string>(''),
    starRating: new FormControl<number>(5),
    imageUrl: new FormControl<string>(''),
  });
  constructor(private prod: ProductsService) {
    prod.getAllProductList().subscribe(data => {
      this.productList = data;
    })
  }
  ngOnInit(): void {
    this.formProduct.controls['imageUrl'].setValue('./assets/images');
    this.prod.getAllProductList().subscribe((data) => {
      this.productList = data;
    });
  }
  file: string = '';
  IsAdd: number = 1;
  IsUpdate: number = 0;
  Add() {
    // this.formProduct.controls['id'].setValue(this.autoId())
    this.formProduct.controls['imageUrl'].setValue(this.file)
    this.prod.AddProduct(this.formProduct.value).subscribe((result) => {
      console.log(result)
      this.ngOnInit()
    })
  }
  // On file Select
  id: any
  Edit(index: number) {
    this.id = this.productList[index].id
    this.formProduct.controls['productName'].setValue(this.productList[index].productName)
    this.formProduct.controls['productCode'].setValue(this.productList[index].productCode)
    this.formProduct.controls['releaseDate'].setValue(this.productList[index].releaseDate)
    this.formProduct.controls['price'].setValue(this.productList[index].price)
    this.formProduct.controls['description'].setValue(this.productList[index].description)
    this.formProduct.controls['imageUrl'].setValue(this.productList[index].imageUrl)
    this.formProduct.controls['inStock'].setValue(this.productList[index].inStock)
    this.file = this.productList[index].imageUrl
  }
  Update() {
    this.formProduct.controls['imageUrl'].setValue(this.file)
    this.prod.UpdateProduct(this.id, this.formProduct.value).subscribe((result) => {
      console.log(result)
      this.ngOnInit()
      this.resetForm()
    })
  }
  Delete(index: number) {
    const productName = this.productList[index].productName;
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${productName}" không?`)) {
      this.id = this.productList[index].id;
      this.prod.DeleteProduct(this.id).subscribe((result) => {
        console.log(result);
        this.ngOnInit();
      });
    } else {
      console.log('Hủy bỏ xóa sản phẩm.');
    }
  }
  onChange(event: any) {
    var str = event.target.files[0].name
    this.file = './assets/images/' + str
  }
  autoId() {
    return this.productList.length + 1;
  }
  resetForm() {
    this.formProduct.controls['productName'].setValue('')
    this.formProduct.controls['productCode'].setValue('')
    this.formProduct.controls['releaseDate'].setValue('')
    this.formProduct.controls['price'].setValue(0)
    this.formProduct.controls['description'].setValue('')
    this.formProduct.controls['inStock'].setValue(0)
    this.file = '';
  }
}
