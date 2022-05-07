import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss'],
})
export class AuthorDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
