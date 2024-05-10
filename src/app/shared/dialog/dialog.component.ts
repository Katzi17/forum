import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
  }
  ngOnInit() {}
}
