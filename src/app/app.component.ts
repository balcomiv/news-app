import { Component } from '@angular/core';
import { NewsApiService } from './services/news-api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  newsArticles:Array<any>;
  newsSources:Array<any>;

  private unsubscribe = new Subject<void>();
  
  constructor(
    private newsApi: NewsApiService
  ) {
    console.log('app component constructor called');         
  }

  ngOnInit() {
    //load articless
    this.newsApi.initArticles()
    .pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe(data => this.newsArticles = data['articles']);
    
    //load news sources
    this.newsApi.initSources()
    .pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe(data=> this.newsSources = data['sources']);  
  }

  searchArticles(source){
    console.log("selected source is: "+source);

    this.newsApi.getArticlesByID(source)
    .pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe(data => this.newsArticles = data['articles']);
  }
}
