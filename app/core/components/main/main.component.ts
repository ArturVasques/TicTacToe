import { Component, OnInit } from '@angular/core';

export class Cell {
  player: string;
  constructor(player: string) {
    this.player = player
  }
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public MATRIX_SIZE = 3;
  public matrix = new Array(this.MATRIX_SIZE).fill([]).map(() => new Array(this.MATRIX_SIZE).fill([]).map(() => new Cell('')));
  public player = '1';
  public winner = null;
  public draw = false;

  private turn = 1;

  constructor() { }

  ngOnInit() {
  }

  public onClickSquare(cell: Cell): void {
    this.fillCell(cell) && !this.checkForWinner() && this.incrementTurn() && this.changePlayer() ;
  }

  public onClickRestart(): void {
      this.player = '1';
      this.winner = '';
      this.turn = 1;
      this.draw = false;
      this.matrix.map(row => {
        row.map(cell => {
          cell.player = '';
        })
      })
  }

  private checkForWinner(): boolean {
    const player = this.player;
    const matrix = this.matrix;

    if (this.verifyHorizontally(player, matrix) || this.verifyVertically(player, matrix) || this.verifyDiagonnaly(player, matrix)) {
      this.winner = player;
      return true;
    }

    return false;
  }

  private verifyHorizontally(player: string, matrix: Array<Array<Cell>>): boolean {
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
      if (row.every(cell => cell.player === player)) {
        return true;
      }
    }
    return false;
  }

  private verifyVertically(player: string, matrix: Array<Array<Cell>>): boolean {
    const transposedMatrix = matrix[0].map((col, i) => matrix.map(row => row[i]));
    return this.verifyHorizontally(player, transposedMatrix);
  }

  private verifyDiagonnaly(player: string, matrix: Array<Array<Cell>>): boolean {
    return this.verifyDiagonalTopBottom(player, matrix) || this.verifyDiagonalBottomTop(player, matrix);
  }

  private verifyDiagonalTopBottom(player: string, matrix: Array<Array<Cell>>): boolean {
    const diagonal = [];
    let auxIndex = 0;
    matrix.forEach(row => {
      if(row[auxIndex].player === player){
        diagonal.push(auxIndex);
      }
      auxIndex++;
    })
    return diagonal.length === matrix.length;
  }

  private verifyDiagonalBottomTop(player: string, matrix: Array<Array<Cell>>): boolean {
    const diagonal = [];
    let auxIndex = matrix.length - 1;
    matrix.forEach(row => {
      if(row[auxIndex].player === player){
        diagonal.push(auxIndex);
      }
      auxIndex--;
    })
    return diagonal.length === matrix.length;
  }

  private fillCell(cell: Cell): boolean {
    if (!cell.player && !this.winner) {
      cell.player = this.player;
      return true;
    }
    return false;
  }

  private incrementTurn(): boolean {
    this.turn++;
    if(this.turn > 9) {
      this.draw = true;
      return false;
    }
    return true;
  }

  private changePlayer(): void {
    this.player = this.player === '1' ? '2' : '1';
  }

}
