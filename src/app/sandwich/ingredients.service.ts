import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService implements OnInit {
  private url = 'http://localhost:3000/ingredients';

  constructor(private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.getIngredients();
  }

  public getIngredients(){
    return this.httpClient.get(this.url).toPromise();
  }

}
