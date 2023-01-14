import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  public get(url:string,options?:any){
    return this.http.get(url,options);
  }

  public post(url:string,options?:any){
    return this.http.post(url,options);
  }

  public delete(url:string,options?:any){
    return this.http.delete(url,options);
  }

  public patch(url:string,options?:any){
    return this.http.patch(url,options);
  }
}
