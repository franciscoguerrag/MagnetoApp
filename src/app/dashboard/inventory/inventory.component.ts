import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { CrudService } from '../../model/crudService';
import { map } from 'rxjs/operators';
import { Inventory } from 'src/app/model/inventory';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
    selector: 'inventory-root',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {

    loginError: string;
    loading = false;
    sellers: any;
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
    dataInventory: any;
    outputs: any;
    inputs: any;
    productsReport: any[];
 
  constructor(
      private formBuilder: FormBuilder,
      private crudService:CrudService,
      private router: Router
  ) { 
  }

  async  getInventory () { 

    return new Promise((resolve, reject) => {
		let inventory: Inventory = new Inventory(
      null,
      null,
      null,
      null);
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
        if (!data.length) {
          this.dataInventory=data;
          this.crudService.AddInventory(inventory);
          console.log('not exist');
        }
        else {
          console.log(' exist', data);
          resolve(data);
          return data;
        }
     });; 

    });

	} 

  async  GetProductsList () { 

    return new Promise((resolve, reject) => {
	
      this.crudService.GetProductsList().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.key, ...c.payload.val() })
          )
        )
        ).subscribe(data => {
            resolve(data);
      });

    });

	} 

   async ngOnInit() {
    this.productsReport=[];
    this.dataInventory=  await  this.getInventory();
    console.log('Response ',this.dataInventory);
    this.products=  await  this.GetProductsList();
    console.log('products',this.products);
    this.outputs= this.dataInventory[0].outputs;
    this.inputs= this.dataInventory[0].inputs;
    
    this.products.forEach(obj => {
    console.log('OBJ',obj.name);
    let sumaOutput : number = 0;
    if(this.outputs){
      Object.entries(this.outputs).forEach((entry) => {
      let products = (entry[1]['products']);
      let res = products.filter(it => it.name.includes(obj.name))
      .reduce(function(sum, elem) {
        return sum + Number(elem.quantity);
        }, 0);
        sumaOutput= sumaOutput +Number(res);
    
      });
    }
    console.log('sumaOutput',sumaOutput);
  
    let sumaInput : number = 0;
    if(this.inputs){
      Object.entries(this.inputs).forEach((entry) => {
        let products = (entry[1]['products']);
        let res = products.filter(it => it.name.includes(obj.name))
        .reduce(function(sum, elem) {
          return sum + Number(elem.quantity);
        }, 0);
        sumaInput= sumaInput +Number(res);
      });
    }
    console.log('sumaInput',sumaInput);
    this.productsReport.push({name:obj.name, input:sumaInput, output:sumaOutput, stock: sumaInput - sumaOutput})
     });
   
  }

  ngOnDestroy() {
    if(this._subscription)
      this._subscription.unsubscribe()
  }


}

