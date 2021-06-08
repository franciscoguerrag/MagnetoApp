import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { CrudService } from '../../model/crudService';
import { map } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { isNumeric } from 'rxjs/util/isNumeric';
import { Inventory } from 'src/app/model/inventory';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'delivery-root',
    templateUrl: './delivery.component.html',
    styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit, OnDestroy {

    deliveryForm: FormGroup;
    loginError: string;
    loading = false;
    sellers: any;
    clients: any;
    deliveries: any;
    products: any;
    keyword = 'name';
    selectedProduct: any;
    showProductErrorMessage=[];
    showProductQuantityErrorMessage=[];
    numberRegEx = /\-?\d*\.?\d{1,2}/;
    quantity: FormControl;
    showButtonSave=false;
    private _subscription: Subscription;
    key :any;
   
    onKeydown(event,thing) {
      if (event.key === "Enter") {
        console.log(event);
        console.log(thing);
      }
    }

  constructor(
      private formBuilder: FormBuilder,
      private crudService:CrudService,
      private changeDetect: ChangeDetectorRef,
      private router: Router
  ) { 
  }

  ngOnInit() {
    this.showProductErrorMessage =[];
    this.showProductQuantityErrorMessage =[];
  
       this.deliveryForm = this.formBuilder.group({
          products: this.formBuilder.array([]),
          seller_name:  [null],
          client_name:  [null],
          delivery_name:  [null],
      });

      this.crudService.GetSellersList().snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.key, ...c.payload.val() })
            )
          )
          ).subscribe(data => {
              this.sellers = data;
              console.log('sellers',data);
      });

      this.crudService.GetClientsList().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.key, ...c.payload.val() })
          )
        )
        ).subscribe(data => {
            this.clients = data;
            console.log('clients',data);
    });

    this.crudService.GetDeliveriesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.key, ...c.payload.val() })
        )
      )
      ).subscribe(data => {
          this.deliveries = data;
          console.log('deliveries',data);
    });

    this.crudService.GetProductsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.key, ...c.payload.val() })
        )
      )
      ).subscribe(data => {
          this.products = data;
          console.log('products',data);
    });
    const add = this.deliveryForm.get('products') as FormArray;
    add.push(this.formBuilder.group({
        product: '',
        productSpan: true,
        quantity: ''
    }))
  }


  addProductGroup(index) {
    if(this.deliveryForm.get('products')['controls'][index]
       && this.deliveryForm.get('products')['controls'][index].value.product
       && !this.deliveryForm.get('products')['controls'][index].value.product.key)
          this.deliveryForm.get('products')['controls'][index].value.productSpan=false;

    let size = this.deliveryForm.get('products')['controls'].length-1;
    console.log(this.deliveryForm.get('products')['controls'][size].value);

    if(this.deliveryForm.get('products')['controls'][index].value.productSpan &&
      isNumeric(this.deliveryForm.get('products')['controls'][index].value.quantity
      && this.deliveryForm.get('products')['controls'][size].value.product
      && this.deliveryForm.get('products')['controls'][size].value.quantity
      ))
    {
      const add = this.deliveryForm.get('products') as FormArray;
      add.push(this.formBuilder.group({
          product:  '',
          productSpan: true,
          quantity:''
      }));
      this.showButtonSave = false;
    }
  }

  deleteProductGroup(index: number) {

      let size = this.deliveryForm.get('products')['controls'].length-1;
     
      if (index != size) {
        this.showButtonSave = false;
        if (this.deliveryForm.get('products')['controls'][index].value.product != ''
            && isNumeric(this.deliveryForm.get('products')['controls'][index].value.quantity)
            && this.deliveryForm.get('products')['controls'][index].value.productSpan)
            this.showButtonSave = true;
        if (this.deliveryForm.get('products')['controls'][size].value.product == ''
          && this.deliveryForm.get('products')['controls'][size].value.quantity == '')
          this.showButtonSave = false;
      }
      else {
        this.showButtonSave = false;
        if (this.deliveryForm.get('products')['controls'][size].value.product == ''
          && this.deliveryForm.get('products')['controls'][size].value.quantity == '')
          this.showButtonSave = true;
      }
         
      const add = this.deliveryForm.get('products') as FormArray;
      add.removeAt(index)
  }

  detectChanges(index) {
   if(this.deliveryForm.get('products')['controls'][index]
       && this.deliveryForm.get('products')['controls'][index].value.product
       && !this.deliveryForm.get('products')['controls'][index].value.product.key)
          this.deliveryForm.get('products')['controls'][index].value.productSpan=false;
    
    this.showButtonSave = false;
    if (this.deliveryForm.get('products')['controls'][index].value.product != ''
        && isNumeric(this.deliveryForm.get('products')['controls'][index].value.quantity)
        && this.deliveryForm.get('products')['controls'][index].value.productSpan)
        this.showButtonSave = true;

    if(this.deliveryForm.get('products')['controls'][index].value.productSpan){
      this.showProductErrorMessage[index] = 'valid';
    }
    else {
      this.showProductErrorMessage[index] = 'invalid';
    }
  }

  validQuantity(index) {
    if(this.deliveryForm.get('products')['controls'][index]
    && this.deliveryForm.get('products')['controls'][index].value.product
    && !this.deliveryForm.get('products')['controls'][index].value.product.key)
       this.deliveryForm.get('products')['controls'][index].value.productSpan=false;

    this.showButtonSave = false;
    if (this.deliveryForm.get('products')['controls'][index].value.product != ''
        && isNumeric(this.deliveryForm.get('products')['controls'][index].value.quantity)
        && this.deliveryForm.get('products')['controls'][index].value.productSpan)
        this.showButtonSave = true;

    if (this.deliveryForm.get('products')['controls'][index].value.quantity == '' ||
      isNumeric(this.deliveryForm.get('products')['controls'][index].value.quantity)){
        this.showProductQuantityErrorMessage[index] = 'valid';
    }
    else {
      this.showProductQuantityErrorMessage[index] = 'invalid';
    }
  }

  selectEvent(e){}
  onFocused(e){}
  onChangeSearch(e){}

  saveProductGroup(){

    if (!this.deliveryForm.get('client_name').value 
    || !this.deliveryForm.get('seller_name').value
    || !this.deliveryForm.get('delivery_name').value)
    {
      alert('Por favor ingrese la información de cliente,vendedor y/o transportador');
    }
    else {
      if(confirm("Estas seguro de guardar!")) {
        let products = [];
        this.deliveryForm.get('products')['controls'].forEach(obj => {
          products.push({
            name:obj.value.product.name,
            quantity: obj.value.quantity
          });
        });
        let inventory: Inventory = new Inventory(
        this.deliveryForm.get('client_name').value,
        this.deliveryForm.get('seller_name').value,
        this.deliveryForm.get('delivery_name').value,
        products);

        this._subscription = this.crudService.GetInventoryList().snapshotChanges().pipe(
          map(actions => 
            actions.map(a => {
              const data = a.payload.val() as Inventory;
              const id = a.key;
              return { id, ...data };
            }).filter(a => 
              inventory.created ==  a.created
            )
          ))
          .subscribe(data => {
          console.log(data);
            if (!data.length) {
              this.crudService.AddProductsCompleted(inventory,inventory.products);
              this.router.navigate(['dashboard']);
          }
          else {
            this.crudService.AddProducts(inventory,inventory.products,data[0].id,'outputs');
            this.router.navigate(['dashboard']);
          }
        });;
        }
    }
  }
  
  ngOnDestroy() {
    if(this._subscription)
      this._subscription.unsubscribe()
  }


  clickMethod() {
    
  }
}

