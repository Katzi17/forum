import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'forum-app';
  page = '';

  constructor(private router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((evts: any) => {
        this.page = (evts.urlAfterRedirects as string).split('/')[1] as string;
      });
  }
}
