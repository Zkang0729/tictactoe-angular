import { Component, OnInit, Input } from '@angular/core';
import { CellEnum } from './cell-enum.enum';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Input() public row: number;
  @Input() public col: number;
  @Input() public piece: CellEnum = CellEnum.EMPTY;

  public constructor() {}

  public ngOnInit(): void {}
}
