import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://imdb8.p.rapidapi.com';

  constructor(private http: HttpClient) { }
  search(searchTerm: string) {
    const options = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '9b3d44363dmsh8dcdef0982f5d0cp18309bjsnb36565be3ad0',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      })
    };
    return this.http.get(`${this.apiUrl}/auto-complete?q=${searchTerm}`, options);
  }
}
