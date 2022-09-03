import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Ordination } from './ordination';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { UpOrdination } from './up-ordination';

@Injectable({
  providedIn: 'root'
})
export class OrdinationService {

  ordinations : Ordination[] = [];
  ordination !: Ordination;

  orderUrl= 'http://localhost:8080/orders/';
  httpOptions={headers: new HttpHeaders({'Content-Type' : 'application/json'})}

  constructor(private Http : HttpClient) { }

  public getOrders(): Observable<Ordination[]>{
    return this.Http.get<Ordination[]>(this.orderUrl+'all',this.httpOptions);
  }

  public findOrderById(id:number): Observable<Ordination>{
    return this.Http.get<Ordination>(this.orderUrl+'find/'+id,this.httpOptions);
  }

  public addOrders(ordination:Ordination):Observable<Ordination>{
    return this.Http.post<Ordination>(this.orderUrl+'add',ordination);
  }

  public updateOrder(ordination:UpOrdination): Observable<Ordination>{
    return this.Http.put<Ordination>(this.orderUrl+'update',ordination);
  }

  public getOrderInPeriod(startDate:Data, endDate:Data): Observable<Ordination>{
    return this.Http.get<Ordination>(this.orderUrl+startDate+'/'+endDate,this.httpOptions);
  }

  public deleteOrder(orderId:number):Observable<void>{
    return this.Http.delete<any>(this.orderUrl+'delete/'+orderId,this.httpOptions);
  }
}
