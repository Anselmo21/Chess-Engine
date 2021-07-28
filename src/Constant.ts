//The positioning of the board
export const VERTICAL_AXIS = ["1","2","3","4","5","6","7","8"];
export const HORIZONTAL_AXIS = ['a','b','c','d','e','f','g', 'h'];

export const GRID_SIZE = 100; 

export function samePosition(p1: Position, p2: Position) { 
    return p1.x === p2.x && p1.y === p2.y; 
}


export interface lastMovedPiece { 
  position:Position
  validMoves: Position[] 
}

/**
 * Interface to store positioning values 
 */
export interface Position { 
    x: number
    y: number
}

/**
 * Interface for the piece 
 */
 export interface Piece {
    image: string 
    position: Position
    type: PieceType
    team: ColorType
    enpassant?: boolean
}
/**
* Color type determining 
*/
export enum ColorType { 
   ENEMY,
   ME
}

/**
* Determining the type of piece 
*/
export enum PieceType { 
   PAWN, 
   BISHOP,
   KNIGHT,
   ROOK,
   QUEEN,
   KING, 
}

// Array List to contain the image of the chess pieces 
export const initialBoardState: Piece[] = [
    {
      image: `assets/images/bR.png`,
      position: { 
        x: 0,
        y: 7,
      },

      type: PieceType.ROOK,
      team: ColorType.ENEMY,
    },
    {
      image: `assets/images/bN.png`,
      position: {
        x: 1, 
        y: 7, 
      },
      type: PieceType.KNIGHT,
      team: ColorType.ENEMY,
    },
    {
      image: `assets/images/bB.png`,
      position: {
        x: 2,
        y: 7,
      },
      type: PieceType.BISHOP,
      team: ColorType.ENEMY,
    },
    {
      image: `assets/images/bQ.png`,
      position: {
        x: 3,
        y: 7,
      },

      type: PieceType.QUEEN,
      team: ColorType.ENEMY,
    },

    {
      image: `assets/images/bK.png`,
      position: {
        x: 4,
        y: 7,
      },

      type: PieceType.KING,
      team: ColorType.ENEMY,
    },

    {
      image: `assets/images/bB.png`,
      position: {
        x: 5,
        y: 7,
      },
      type: PieceType.BISHOP,
      team: ColorType.ENEMY,

    },
    {
      image: `assets/images/bN.png`,
      position: {
        x: 6,
        y: 7,
      },
      type: PieceType.KNIGHT,
      team: ColorType.ENEMY,
    },

    {
      image: `assets/images/bR.png`,
      position: {
        x: 7,
        y: 7,
      },
      type: PieceType.ROOK,
      team: ColorType.ENEMY,
    },

    {
      image: `assets/images/bp.png`,
      position: {
        x: 0,
        y: 6,
      }, 

      type: PieceType.PAWN,
      team: ColorType.ENEMY,
    },

    {
      image: `assets/images/bp.png`,
      position: {
        x: 1,
        y: 6,
      }, 

      type: PieceType.PAWN,
      team: ColorType.ENEMY,
    },
    {
      image: `assets/images/bp.png`,
      position: {
        x: 2,
        y: 6,
      }, 

      type: PieceType.PAWN,
      team: ColorType.ENEMY,
    },

    {
      image: `assets/images/bp.png`,
      position: {
        x: 3,
        y: 6,
      },

      type: PieceType.PAWN,
      team: ColorType.ENEMY,
    },

    {
      image: `assets/images/bp.png`,
      position: {
        x: 4,
        y: 6,
      },

      type: PieceType.PAWN,
      team: ColorType.ENEMY,
    },

    {
      image: `assets/images/bp.png`,
      position: { 
        x: 5,
        y: 6,
      }, 
      type: PieceType.PAWN,
      team: ColorType.ENEMY,
    },

    {
      image: `assets/images/bp.png`,
      position: {
        x: 6,
        y: 6,
      },
      type: PieceType.PAWN,
      team: ColorType.ENEMY,
    },

    {
      image: `assets/images/bp.png`,
      position: {
        x: 7,
        y: 6,
      },

      type: PieceType.PAWN,
      team: ColorType.ENEMY,
    },
  
    {
      image: `assets/images/wR.png`,
      position: {
        x: 0,
        y: 0,
      },

      type: PieceType.ROOK,
      team: ColorType.ME,
    },

    {
      image: `assets/images/wN.png`,
      position: {
        x: 1,
        y: 0,
      },
      type: PieceType.KNIGHT,
      team: ColorType.ME,
    },

    {
      image: `assets/images/wB.png`,
      position: {
        x: 2,
        y: 0,
      }, 

      type: PieceType.BISHOP,
      team: ColorType.ME,
    },

    {
      image: `assets/images/wQ.png`,
      position: {
        x: 3,
        y: 0,
    },
      type: PieceType.QUEEN,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wK.png`,
      position: {
        x: 4,
        y: 0,
      }, 
      type: PieceType.KING,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wB.png`,
      position: {
        x: 5, 
        y: 0, 
      }, 
      type: PieceType.BISHOP,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wN.png`,
      position: {
        x: 6,
        y: 0,
      }, 
      type: PieceType.KNIGHT,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wR.png`,
      position: { 
        x: 7, 
        y: 0, 
      },

      type: PieceType.ROOK,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wp.png`,
      position: {
        x: 0,
        y: 1,
      }, 
      type: PieceType.PAWN,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wp.png`,
      position: {
        x: 1,
        y: 1,
      }, 
      type: PieceType.PAWN,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wp.png`,
      position: {
        x: 2,
        y: 1,
      }, 
      type: PieceType.PAWN,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wp.png`,
      position: {
        x: 3,
        y: 1,
      },
      type: PieceType.PAWN,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wp.png`,
      position: {
        x: 4,
        y: 1,
      }, 

      type: PieceType.PAWN,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wp.png`,
      position: { 
        x: 5,
        y: 1,
      }, 
      type: PieceType.PAWN,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wp.png`,
      position: {
        x: 6,
        y: 1,
      },
      type: PieceType.PAWN,
      team: ColorType.ME,
    },
    {
      image: `assets/images/wp.png`,
      position: {
        x: 7,
        y: 1,
      }, 

      type: PieceType.PAWN,
      team: ColorType.ME,
    },
  ];