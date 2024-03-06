import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{ counter: any }>) {}
  title = 'angularweek3P';

  ngOnInit(): void {}
}
