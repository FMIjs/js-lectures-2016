import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPost } from './models/post';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/reduce';

const URL = environment.url;

@Injectable()
export class DataService  {
  posts:IPost[] = [];
  filter:string;

  constructor(private http:Http) { }

  fetchPosts():Observable<any> {
    return this.http.get(URL).map(res => res.json()).map((posts:IPost[]) => (this.posts = posts));
  }

  setFilter(value: string) {
    this.filter = value;
  }

  get(offset:number, size:number):Observable<IPost[]> {
    return Observable.from(this.posts).filter((post:IPost) => {
      if(!this.filter) return true;
      return post.title.indexOf(this.filter) !== -1;
    }).skip(offset).take(size).reduce((acc, curr) => acc.push(curr) && acc, []);
  }
}
