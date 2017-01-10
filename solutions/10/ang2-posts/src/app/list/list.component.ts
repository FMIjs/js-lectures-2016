import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output, Input, ViewEncapsulation} from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { IPost } from '../models/post';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class ListComponent implements OnInit, AfterViewInit {
  posts$:Observable<IPost[]>;
  pageSize:number = 10;
  offset:number = 0;
  @Input() value:string; 
  @Output('myclick') clickEmiter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('search') searchInput:ElementRef;

  constructor(private dataService:DataService) { }

  read() {
    this.posts$ = this.dataService.get(this.offset, this.pageSize); 
  }

  ngOnInit() {
    this.dataService.fetchPosts().subscribe((data) => {
      this.read();
    });
  }

  ngAfterViewInit() {
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .debounceTime(500)
      .map(() => this.searchInput.nativeElement.value)
      .subscribe(val => { 
        this.dataService.setFilter(val);
        this.read();
      });
  }

  prev() {
    if(this.offset === 0) return;
    this.offset -= this.pageSize;
    this.read();
  }

  next() {
    if(this.offset === this.dataService.posts.length) return;
    this.offset += this.pageSize;
    this.read();
  }

  emit() {
    this.clickEmiter.emit(true);
  }

}
