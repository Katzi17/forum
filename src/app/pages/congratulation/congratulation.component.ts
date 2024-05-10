import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.component.html',
  styleUrls: ['./congratulation.component.scss'],
})
export class CongratulationComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  back() {
    this.router.navigateByUrl('/questions');
  }
}
