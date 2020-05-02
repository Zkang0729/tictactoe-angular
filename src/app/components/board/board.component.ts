import { Component, OnInit } from '@angular/core';
import { CellEnum } from '../cell/cell-enum.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  private currentPlayer: CellEnum;
  public statusMessage: string;
  private isGameOver: boolean;
  public board: CellEnum[][];
  private moveCount: number = 0;

  public constructor() {}

  public ngOnInit(): void {
    this.newGame();
  }

  public get gameOver(): boolean {
    return this.isGameOver;
  }

  public newGame(): void {
    this.board = [];
    for (var i = 0; i < 3; i++) {
      this.board[i] = [];
      for (var j = 0; j < 3; j++) {
        this.board[i][j] = CellEnum.EMPTY;
      }
    }
    this.currentPlayer = CellEnum.X;
    this.isGameOver = false;
    this.statusMessage = `Player ${this.currentPlayer}'s turn.`;
  }

  public move(row: number, col: number): void {
    if (!this.isGameOver && this.board[row][col] === CellEnum.EMPTY) {
      this.board[row][col] = this.currentPlayer;
      this.moveCount++;

      // Check Col
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[row][i] != this.currentPlayer) break;
        if (i == this.board.length - 1) {
          this.isGameOver = true;
          this.statusMessage = `Player ${this.currentPlayer} wins!`;
          return;
        }
      }

      // Check Row
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i][col] != this.currentPlayer) break;
        if (i == this.board.length - 1) {
          this.isGameOver = true;
          this.statusMessage = `Player ${this.currentPlayer} wins!`;
          return;
        }
      }

      // Check Diag
      if (row == col) {
        for (var i = 0; i < this.board.length; i++) {
          if (this.board[i][i] != this.currentPlayer) break;
          if (i == this.board.length - 1) {
            this.isGameOver = true;
            this.statusMessage = `Player ${this.currentPlayer} wins!`;
            return;
          }
        }
      }

      // Check Anti-diag
      if (row + col == this.board.length - 1) {
        for (var i = 0; i < this.board.length; i++) {
          if (this.board[i][this.board.length - 1 - i] != this.currentPlayer)
            break;
          if (i == this.board.length - 1) {
            this.isGameOver = true;
            this.statusMessage = `Player ${this.currentPlayer} wins!`;
            return;
          }
        }
      }

      // Check Draw
      if (this.moveCount == Math.pow(this.board.length, 2)) {
        this.isGameOver = true;
        this.statusMessage = "It's a draw!";
        return;
      }
    }

    this.currentPlayer =
      this.currentPlayer === CellEnum.X ? CellEnum.O : CellEnum.X;
    this.statusMessage = `Player ${this.currentPlayer}'s trun.`;
  }
}
