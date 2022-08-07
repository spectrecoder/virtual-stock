import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JSONService {

  constructor() { }
  
  Save(item:any,key:string){
    let stringObject = JSON.stringify(item);
    localStorage.setItem(key,stringObject);
  }

  Get(key:string){
    let stringObject = localStorage.getItem(key);
    let object = JSON.parse(stringObject ? stringObject : '{}');
    return stringObject?object:null;
  }
}
