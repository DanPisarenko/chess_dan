import logo from '../../assets/black-king.png'
import {Colors} from "../Board";
import {Cell} from "../Board";
import Bishop_blackLogo from '../../assets/black/bishop.png'
import Bishop_whiteLogo from '../../assets/white/bishop.png'
import King_whiteLogo from '../../assets/white/king.png'
import King_blackLogo from '../../assets/black/king.png'
import Rook_whiteLogo from '../../assets/white/rook.png'
import Rook_blackLogo from '../../assets/black/rook.png'
import Pawn_whiteLogo from '../../assets/white/pawn.png'
import Pawn_blackLogo from '../../assets/black/pawn.png'
import Knight_blackLogo from '../../assets/black/knight.png'
import Knight_whiteLogo from '../../assets/white/knight.png'
import Queen_blackLogo from '../../assets/black/queen.png'
import Queen_whiteLogo from '../../assets/white/queen.png'

export enum FigureNames { // названия фигурок
  FIGURE = "figure",
  KING = "king",
  KNIGHT = "knight",
  PAWN = "pawn",
  QUEEN = "queen",
  ROOK = "rook",
  BISHOP = "bishop",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;


  constructor(color: Colors, cell: Cell) { // обозначение данных для фигурок
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE
    this.id = Math.random()
  }

  canMove(target: Cell) : boolean {
    if(target.figure?.color === this.color)
      return false
    if(target.figure?.name === FigureNames.KING)
      return false
    return true;
  }

  mvFigure(target: Cell) {}
}

export class Bishop extends Figure { // class Bishop figure

  constructor(color: Colors, cell: Cell) {
    super(color, cell); 
    this.logo = color === Colors.BLACK ? Bishop_blackLogo : Bishop_whiteLogo; //logo(image) of figure
    this.name = FigureNames.BISHOP; // name of figure
  }

  canMove(target: Cell): boolean { //function of moving
    if(!super.canMove(target))
      return false;
    if(this.cell.isEmptyDiagonal(target))
      return true
    return false
  }
}

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? King_blackLogo : King_whiteLogo;
    this.name = FigureNames.KING;
  }
  canMove(target: Cell): boolean {
    if(!super.canMove(target))
      return false;
    return true
  }
}

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? Knight_blackLogo : Knight_whiteLogo;
    this.name = FigureNames.KNIGHT;
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target))
      return false;
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
  }
}

export class Pawn extends Figure {

  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? Pawn_blackLogo : Pawn_whiteLogo;
    this.name = FigureNames.PAWN;
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target))
      return false;
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2

    if ((target.y === this.cell.y + direction || this.isFirstStep
        && (target.y === this.cell.y + firstStepDirection))
      && target.x === this.cell.x
      && this.cell.board.getCell(target.x, target.y).isEmpty()) {
      return true;
    }

    if(target.y === this.cell.y + direction
    && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
    && this.cell.isEnemy(target)) {
      return true;
    }

    return false;
  }

  mvFigure(target: Cell) {
    super.mvFigure(target);
    this.isFirstStep = false;
  }
}

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? Queen_blackLogo : Queen_whiteLogo;
    this.name = FigureNames.QUEEN;
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target))
      return false;
    if(this.cell.isEmptyVertical(target))
      return true;
    if(this.cell.isEmptyHorizontal(target))
      return true;
    if(this.cell.isEmptyDiagonal(target))
      return true;
    return false
  }
}

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? Rook_blackLogo : Rook_whiteLogo;
    this.name = FigureNames.ROOK;
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target))
      return false;
    if(this.cell.isEmptyVertical(target))
      return true
    if(this.cell.isEmptyHorizontal(target))
      return true
    return false
  }
}
