import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, Data } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import 'rxjs/operators';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.getRouteData()
      .subscribe(data => {
        this.title = data.title;
        this.titleService.setTitle(data.title);
        let meta: MetaDefinition =  {
          name: 'description',
          content: data.title
        };
        this.metaService.updateTag(meta);
      });
  }

  ngOnInit() {}

  getRouteData(): Observable<Data> {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => !event.snapshot.firstChild),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

}
