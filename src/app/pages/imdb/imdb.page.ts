import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import {HomePage } from 'src/app/pages/home/home.page'


@Component({
  selector: 'app-imdb',
  templateUrl: './imdb.page.html',
  styleUrls: ['./imdb.page.scss'],
})
export class ImdbPage implements OnInit {
[x: string]: any;
public topic:any;
searchTerm: string | undefined;

  results: any[] | undefined;

  constructor(private apiService: ApiService, private route: Router) { }

  ngOnInit() {
  }
  search() {
    const options = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '9b3d44363dmsh8dcdef0982f5d0cp18309bjsnb36565be3ad0',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      })
    };

    this.apiService.search(this.topic).subscribe((response: any) => {
      console.log(response);
      this.results = response.d;
      console.log(this.results);
    });
  }
  goBack(){
    this.route.navigate(['/home'])
  }
}
