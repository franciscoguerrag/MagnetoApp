import {formatDate} from '@angular/common';


export interface InventoryInterface {
  $key: string;
  client: string;
  seller: string;
  delivery: string;
  products: any;
}


export class Inventory implements InventoryInterface {
  created: string;
  $key: string;
  constructor(public client: string, public seller: string, public delivery: string,public products:any) {
    this.created = formatDate(new Date(), 'yyyy/MM/dd', 'en');
   }
 
}