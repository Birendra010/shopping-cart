import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private itemsRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list('products');
  }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<any[]> {
    return this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  get(productId: string) {
    console.log(productId);
    return this.db.object('/products/' + productId);
  }

  update(productId: string, product: Partial<unknown>) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
