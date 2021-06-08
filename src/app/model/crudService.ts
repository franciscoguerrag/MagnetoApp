import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Inventory } from './inventory';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})

export class CrudService {
  usersRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  userRef: AngularFireObject<any>;     // Reference to user object, Its an Observable too
  productsRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  sellersRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  clientsRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  deliveriesRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  inventoryRef: AngularFireList<any>;     // Reference to user object, Its an Observable too
  inventorRef: AngularFireObject<any>;     // Reference to user object, Its an Observable too
 
 
  constructor(private db: AngularFireDatabase) { }   // Inject AngularFireDatabase dependency in constructor

  // Create User
  AddUser(user: User) {
    this.usersRef.push({
      name: user.name,
      user: user.user,
      password: user.password,
      email: user.email,
    })
  }

  // Read User
  GetUser(id: string) {
    this.userRef = this.db.object('users/' + id);
    return this.userRef;
  }

  // Read Users List
  GetUsersList() {
    this.usersRef = this.db.list('users');
    return this.usersRef;
  }  

  // Update User
  UpdateUser(user: User) {
    this.userRef.update({
      name: user.name,
      user: user.user,
      password: user.password,
      email: user.email,
    })
  }  

  // Delete User
  DeleteUser(id: string) { 
    this.userRef = this.db.object('users/'+id);
    this.userRef.remove();
  }
  
  // Read Products List
  GetProductsList() {
    this.usersRef = this.db.list('products');
    return this.usersRef;
  } 

  // Read Products List
  GetSellersList() {
    this.sellersRef = this.db.list('sellers');
    return this.sellersRef;
  } 

  // Read Products List
  GetClientsList() {
    this.clientsRef = this.db.list('clients');
    return this.clientsRef;
  } 

  // Read Products List
  GetDeliveriesList() {
    this.deliveriesRef = this.db.list('deliveries');
    return this.deliveriesRef;
  } 
  
  // Create User
  AddInventory(inventory: Inventory) {
    this.inventoryRef = this.db.list('inventory');
    this.inventoryRef.push(
       { created: inventory.created,
       }
    )
  }

  // Create User
  AddProducts(inventory: Inventory, products, refId, type) {
    this.inventoryRef = this.db.list('inventory/' + refId + '/' + type  );
    this.inventoryRef.push(
      { 
        delivery: inventory.delivery,
        client: inventory.client,
        seller: inventory.seller,
        products
      }
    )
  }

  
  // Create User
  AddProductsCompleted(inventory: Inventory, products) {
    this.inventoryRef = this.db.list('inventory');
    this.inventoryRef.push(
       { created: inventory.created,
         outputs :
         [
          {
            delivery: inventory.delivery,
            client: inventory.client,
            seller: inventory.seller,
            products
          }
        ]
      }
    )
  }

  // Create User
  AddReceiptsCompleted(inventory: Inventory, products) {
    this.inventoryRef = this.db.list('inventory');
    this.inventoryRef.push(
       { created: inventory.created,
         inputs :
         [
          {
            delivery: inventory.delivery,
            client: inventory.client,
            seller: inventory.seller,
            products
          }
        ]
      }
    )
  }


  // Read Users List
  GetInventoryList() {
    this.inventoryRef = this.db.list('inventory');
    return this.inventoryRef;
  }  

  // Delete Inventory
  DeleteInventory() { 
    this.inventorRef = this.db.object('inventory');
    this.inventorRef.remove();
  }
}