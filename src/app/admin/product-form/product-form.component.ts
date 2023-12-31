import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {

  
  categories$;
  id: any;
  product:any= {};
  constructor(
    private router: Router,
    private route :ActivatedRoute,
   private categoryService: CategoryService,
    private productService: ProductService ) {
    this.categories$ = this.categoryService.getCategories();
    
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log('PRODUCT ID', this.id);

    // Important line of code to get single product from firebase
    if (this.id)
      this.productService
        .get(this.id)
        .valueChanges()
        .pipe(take(1))
        .subscribe((p) => (this.product = p));




  }

  save(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    // if (!confirm('Are you sure you want to delete this product?')) return;
      this.productService.delete(this.id);
     this.router.navigate(['/admin/products']);
  }




}
