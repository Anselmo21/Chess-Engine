// To contain the rules of the chess game, decides whether the move is valid or not 



import {VERTICAL_AXIS, HORIZONTAL_AXIS, Piece, PieceType, ColorType,initialBoardState, Position, lastMovedPiece} from '../Constant';


export const viableMoves:Position[] = [] 

let lastPiece: lastMovedPiece = { position: {x: -1, y: -1}, validMoves :[]}

//Pointer to keep track of the King's Position
let KINGLOCATION: Position = {x: -1, y: -1}

export function getViableMoves() { 
    return viableMoves;
}


/**
 * Defines the set of rules within a chess game 
 */
export default class Rules { 
    
    /**
     * Helper method to check if a tile is occupied 
     * 
     * @param x x coordinate of an evaluated tile
     * @param y y coordinate of an evaluated tile 
     * @param boardState the current state of the board during the evaluation 
     * @returns true if the tile is occupied, o.w it's false 
     */

    tileIsOccupied(desiredPosition: Position, boardState:Piece[]): boolean { 

        //Consider each piece in the board , if a piece inside the boardstate has the same coord
        if (boardState.find(piece => piece.position.x === desiredPosition.x && piece.position.y === desiredPosition.y)) { 
            return true; 
        }
        else { //if there's no match 
            return false;
        }
    }

    //-------------------ROOK HELPERS-------------------//

    /** 
     * Helper to prevent jumping over piece(Illegal Move) in the right direction
     */
    jumpedOverSomethingXRight(initialPosition: Position, desiredPosition: Position, boardState: Piece[]) { 
        
        const moveNumSpotsX = Math.abs(desiredPosition.x - initialPosition.x)

        //To the right 
        for (let i = 1; i < moveNumSpotsX; i++) { 
            if (this.tileIsOccupied({x: initialPosition.x + i, y: initialPosition.y}, boardState)) {
                return true; //Indeed it jumped over a piece
            }
        }

        return false;
    }

    // DEBUGGED: No error
    jumpedOverSomethingXLeft(initialPosition: Position, desiredPosition: Position, boardState: Piece[]) { 
       
        const moveNumSpotsXLeft = Math.abs(desiredPosition.x - initialPosition.x)
        //To the right 
        for (let i = 1; i < moveNumSpotsXLeft; i++) { 
            if (this.tileIsOccupied({x: initialPosition.x - i, y: initialPosition.y}, boardState)) {
                return true //Indeed it jumped over a piece
            }
            
        }

        return false; 
    }

    jumpedOverSomethingYAbove(initialPosition: Position, desiredPosition: Position, boardState: Piece[]) { 

        const moveNumSpotsYAbove = Math.abs(desiredPosition.y - initialPosition.y); 

        for (let i = 1; i < moveNumSpotsYAbove; i++) { 
            if (this.tileIsOccupied({x: initialPosition.x, y: initialPosition.y + i}, boardState)) { 
                return true;
            }
        }

        return false 
    }

    jumpedOverSomethingYBelow(initialPosition: Position, desiredPosition: Position, boardState: Piece[]) { 

        const moveNumSpotsYBelow = Math.abs(desiredPosition.y - initialPosition.y); 

        for (let i = 1; i < moveNumSpotsYBelow; i++) { 
            if (this.tileIsOccupied({x: initialPosition.x, y: initialPosition.y - i}, boardState)) { 
                return true;
            }
        }

        return false 
    }
    //-----------------------------END OF ROOK HELPERS-----------------------------//
    
    //-----------------------------BISHOP HELPERS--------------// 
    jumpedOverPieceLeftUp(initialPosition: Position, desiredPosition: Position, boardState: Piece[]) { 
        const moveNumSpots= Math.abs(desiredPosition.x - initialPosition.x)
        // It doesn't matter which direction is picked because the traversal will be the same 
      
        
        for (let i = 1; i < moveNumSpots; i++) { 
            if (this.tileIsOccupied({x:initialPosition.x - i, y:initialPosition.y + i}, boardState)) {
                 return true
            }
        }
     
        return false
    }

    jumpedOverPieceRightUp(initialPosition: Position, desiredPosition: Position, boardState: Piece[]) { 
        const moveNumSpots= Math.abs(desiredPosition.x - initialPosition.x)
        // It doesn't matter which direction is picked because the traversal will be the same 
      
        
        for (let i = 1; i < moveNumSpots; i++) { 
            if (this.tileIsOccupied({x:initialPosition.x + i, y:initialPosition.y + i}, boardState)) {
                 return true
            }
        }
     
        return false
    }

    jumpedOverPieceLeftBelow(initialPosition: Position, desiredPosition: Position, boardState: Piece[]) { 
        const moveNumSpots= Math.abs(desiredPosition.x - initialPosition.x)
        // It doesn't matter which direction is picked because the traversal will be the same 
      
        
        for (let i = 1; i < moveNumSpots; i++) { 
            if (this.tileIsOccupied({x:initialPosition.x - i, y:initialPosition.y - i}, boardState)) {
                 return true
            }
        }
     
        return false 
    }

    jumpedOverPieceRightBelow(initialPosition: Position, desiredPosition: Position, boardState: Piece[]) { 
        const moveNumSpots= Math.abs(desiredPosition.x - initialPosition.x)
        // It doesn't matter which direction is picked because the traversal will be the same 
      
        
        for (let i = 1; i < moveNumSpots; i++) { 
            if (this.tileIsOccupied({x:initialPosition.x + i, y:initialPosition.y - i}, boardState)) {
                 return true
            }
        }
     
        return false
    }
    //-------------------------END OF BISHOP HELPERS----------------//

    /**
     * Helper method to check if a tile contains an enemy piece
     * @param x x coordinate of the evaluated tile
     * @param y y coordinate of the evaluated tile 
     * @param boardState the current state of the board during the evaluation 
     * @param team the attacking team (color type)
     * @returns true if the tile contains a piece belonging to the enemy
     */
    isEnemyTile(desiredPosition: Position,boardState:Piece[], team: ColorType): boolean {
        
        if (boardState.find((piece) => piece.position.x === desiredPosition.x && piece.position.y === desiredPosition.y && piece.team !== team)) { 
            return true 
        }
        else { 
            return false 
        }
    }

    /**
     * Helper function to determine the viability of an enpassant move 
     * @param prevX the previous x coordinate of the moving piece 
     * @param prevY the previous y coordinate of the moving piece
     * @param currX the new x coordinate of the moving piece 
     * @param currY the new y coordinate of the moving piece 
     * @param pieceType the name of the moving piece 
     * @param colorType the color of the piece 
     * @param boardState current state of the chess board
     * @returns true if the piece(pawn) is qualified for an enpassant, false o.w. 
     */
    isEnpassantMove(initialPosition: Position , desiredPosition: Position, pieceType: PieceType, colorType: ColorType, boardState: Piece[]) { 
     

        //Determine color of the pawn based on the direction it moved
        const pieceDirection = (colorType === ColorType.ME) ? 1: -1
        
        if (pieceType === PieceType.PAWN) { 
            //Check if the pawn is moving to the right or left and if it's moving up or down by one y unit up 
            if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pieceDirection) { 
                
                // Check if there's a piece at the previous tile of the tile to perform enpassant on  
                const piece = boardState.find( 
                    
                    (p) => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pieceDirection && p.enpassant) 
                
        

                //If an enpassantable piece has been found 
                if (piece) {
                    lastPiece.position = desiredPosition

                    if (!this.tileIsOccupied({x: desiredPosition.x+1, y: desiredPosition.y + pieceDirection}, boardState) 
                    || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + pieceDirection},boardState, colorType)) {

                    lastPiece.validMoves.push({x: desiredPosition.x + 1, y: desiredPosition.y + pieceDirection})
                    }


                    if (!this.tileIsOccupied({x: desiredPosition.x - 1, y: desiredPosition.y + pieceDirection}, boardState)
                    || this.isEnemyTile({x: desiredPosition.x - 1, y: desiredPosition.y + pieceDirection}, boardState, colorType)) {
                    lastPiece.validMoves.push({x: desiredPosition.x - 1, y: desiredPosition.y + pieceDirection }) 
                    }

                    return true;

            }
        }
  
    }

    return false    
}   
    
    /**
     * Function to determine the validity of a move 
     * @param prevX previous x location
     * @param prevY previous y location
     * @param currX current location in x
     * @param currY current location in y 
     * @param pieceType type of piece being evaluated 
     * @param colorType the color of the piece being evaluated 
     * @returns true if the move is valid 
     */
    isValidMove(initialPosition: Position , desiredPosition: Position, pieceType: PieceType, colorType: ColorType, boardState: Piece[]) { 
        //If the piece is a pawn 
        if (pieceType === PieceType.PAWN ) { 
            // To denote the initial position of the pawn based on the colour type 
            const specialRow = colorType === ColorType.ME ? 1:6

            //Determine the color of the piece through the direction it traverses 
            const pawnDirection = colorType === ColorType.ME ? 1: -1

            /**
             * Movement LOGIC
            */
            //If the pawn is at its initial position and it moves 2 tiles 
            if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2 * pawnDirection) { 
          
                if (!this.tileIsOccupied(desiredPosition,boardState) &&
                !this.tileIsOccupied({x: desiredPosition.x, y: desiredPosition.y - pawnDirection},boardState)) { 
                    
                    return true;  
                }
            }
            //If the pawn moved 1 tile 
            else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) { 
                if (!this.tileIsOccupied(desiredPosition,boardState)) { 
                    lastPiece.position = desiredPosition

                    if (!this.tileIsOccupied({x: desiredPosition.x+1, y: desiredPosition.y + 1}, boardState) 
                    || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 1},boardState, colorType)) {

                    lastPiece.validMoves.push({x:desiredPosition.x + 1, y: desiredPosition.y +1})
                    }

                    if (!this.tileIsOccupied({x: desiredPosition.x+1, y: desiredPosition.y + 1}, boardState) 
                    || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y + 1},boardState, colorType)) {

                    lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y+1})

                    }
                    return true; 
                }
            }
            
             /**
             * CONQUER LOGIC
             */
            else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === pawnDirection) { 
                //Conquer in upper or bottom left corner 
                if (this.isEnemyTile(desiredPosition,boardState, colorType)) {
                    lastPiece.position = desiredPosition;

                    if (!this.tileIsOccupied({x: desiredPosition.x+1, y: desiredPosition.y + 1}, boardState) 
                    || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 1},boardState, colorType)) {
                        lastPiece.validMoves.push({x:desiredPosition.x + 1, y:desiredPosition.y + 1})
                    }

                    if (!this.tileIsOccupied({x: desiredPosition.x+1, y: desiredPosition.y + 1}, boardState) 
                    || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y + 1},boardState, colorType)) {

                    lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y+1})

                    }
                    return true
                }
                
            }
            else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection) { 
                //Conquer in upper or bottom right corner 
                if (this.isEnemyTile(desiredPosition,boardState, colorType)) {
                    lastPiece.position = desiredPosition

                    if (!this.tileIsOccupied({x: desiredPosition.x+1, y: desiredPosition.y + 1}, boardState) 
                    || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 1},boardState, colorType)) {
                        lastPiece.validMoves.push({x:desiredPosition.x + 1, y:desiredPosition.y + 1})
                    }

                    if (!this.tileIsOccupied({x: desiredPosition.x+1, y: desiredPosition.y + 1}, boardState) 
                    || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y + 1},boardState, colorType)) {

                    lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y+1})

                    }
                    return true; 
                }
            }
        } 
        
        else if (pieceType === PieceType.KNIGHT) { 
      
           
            /**
             * Move logic for the knight
             * create 8 different patterns for movement   
             */
            for (let i = -1 ; i < 2 ; i +=2) { 
                if (desiredPosition.y - initialPosition.y === 2 * i) { 
                    if (desiredPosition.x - initialPosition.x === -1) { 
                        if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition, boardState, colorType)) {
                            lastPiece.position = desiredPosition

                            //Potential Move Num 1
                            if (!this.tileIsOccupied({x: desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 1, y:desiredPosition.y + 2})
                            }

                            //Potential Move Num 2
                            if (!this.tileIsOccupied({x: desiredPosition.x + 2, y: desiredPosition.y + 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 2, y: desiredPosition.y + 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 2, y:desiredPosition.y + 1})
                            }

                            //Potential Move Num 3
                            if (!this.tileIsOccupied({x: desiredPosition.x - 1, y: desiredPosition.y + 2}, boardState) || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y + 2})
                            }

                            //Potential Move Num 4
                            if (!this.tileIsOccupied({x: desiredPosition.x - 2, y: desiredPosition.y + 1}, boardState) || this.isEnemyTile({x:desiredPosition.x -2, y: desiredPosition.y + 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y + 1})
                            }

                            //Potential Move Num 5
                            if (!this.tileIsOccupied({x: desiredPosition.x - 1, y: desiredPosition.y -2}, boardState) || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y - 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y - 2})
                            }

                            //Potential Move Num 6
                            if (!this.tileIsOccupied({x: desiredPosition.x -2, y: desiredPosition.y - 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y - 1})
                            }

                            //Potential Move Num 7
                            if (!this.tileIsOccupied({x: desiredPosition.x + 1, y: desiredPosition.y - 2}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y - 1})
                            }

                            //Potential Move Num 8 
                            if (!this.tileIsOccupied({x: desiredPosition.x + 2, y: desiredPosition.y - 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 2, y: desiredPosition.y - 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 2, y:desiredPosition.y - 1})
                            }
                            



                            return true; 
                            
                        }
                      
                    }
                    if (desiredPosition.x - initialPosition.x === 1) { 
                        if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition, boardState, colorType)) {
                            lastPiece.position = desiredPosition
                              //Potential Move Num 1
                              if (!this.tileIsOccupied({x: desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 1, y:desiredPosition.y + 2})
                            }

                            //Potential Move Num 2
                            if (!this.tileIsOccupied({x: desiredPosition.x + 2, y: desiredPosition.y + 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 2, y: desiredPosition.y + 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 2, y:desiredPosition.y + 1})
                            }

                            //Potential Move Num 3
                            if (!this.tileIsOccupied({x: desiredPosition.x - 1, y: desiredPosition.y + 2}, boardState) || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y + 2})
                            }

                            //Potential Move Num 4
                            if (!this.tileIsOccupied({x: desiredPosition.x - 2, y: desiredPosition.y + 1}, boardState) || this.isEnemyTile({x:desiredPosition.x -2, y: desiredPosition.y + 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y + 1})
                            }

                            //Potential Move Num 5
                            if (!this.tileIsOccupied({x: desiredPosition.x - 1, y: desiredPosition.y -2}, boardState) || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y - 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y - 2})
                            }

                            //Potential Move Num 6
                            if (!this.tileIsOccupied({x: desiredPosition.x -2, y: desiredPosition.y - 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y - 1})
                            }

                            //Potential Move Num 7
                            if (!this.tileIsOccupied({x: desiredPosition.x + 1, y: desiredPosition.y - 2}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y - 1})
                            }

                            //Potential Move Num 8 
                            if (!this.tileIsOccupied({x: desiredPosition.x + 2, y: desiredPosition.y - 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 2, y: desiredPosition.y - 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 2, y:desiredPosition.y - 1})
                            }
                            
                            return true; 
                        }
                       
                    }
                }
                if (desiredPosition.x - initialPosition.x === 2 * i) { 
                    if (desiredPosition.y - initialPosition.y === 1) {
                        if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition, boardState, colorType)) {
                            lastPiece.position = desiredPosition
                              //Potential Move Num 1
                              if (!this.tileIsOccupied({x: desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 1, y:desiredPosition.y + 2})
                            }

                            //Potential Move Num 2
                            if (!this.tileIsOccupied({x: desiredPosition.x + 2, y: desiredPosition.y + 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 2, y: desiredPosition.y + 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 2, y:desiredPosition.y + 1})
                            }

                            //Potential Move Num 3
                            if (!this.tileIsOccupied({x: desiredPosition.x - 1, y: desiredPosition.y + 2}, boardState) || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y + 2})
                            }

                            //Potential Move Num 4
                            if (!this.tileIsOccupied({x: desiredPosition.x - 2, y: desiredPosition.y + 1}, boardState) || this.isEnemyTile({x:desiredPosition.x -2, y: desiredPosition.y + 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y + 1})
                            }

                            //Potential Move Num 5
                            if (!this.tileIsOccupied({x: desiredPosition.x - 1, y: desiredPosition.y -2}, boardState) || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y - 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y - 2})
                            }

                            //Potential Move Num 6
                            if (!this.tileIsOccupied({x: desiredPosition.x -2, y: desiredPosition.y - 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y - 1})
                            }

                            //Potential Move Num 7
                            if (!this.tileIsOccupied({x: desiredPosition.x + 1, y: desiredPosition.y - 2}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y - 1})
                            }

                            //Potential Move Num 8 
                            if (!this.tileIsOccupied({x: desiredPosition.x + 2, y: desiredPosition.y - 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 2, y: desiredPosition.y - 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 2, y:desiredPosition.y - 1})
                            }
                            
                            return true; 
                        }
                       
                    }
                    if (desiredPosition.y - initialPosition.y === -1) { 
                        if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition, boardState, colorType)) {
                            lastPiece.position = desiredPosition 
                              //Potential Move Num 1
                              if (!this.tileIsOccupied({x: desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 1, y:desiredPosition.y + 2})
                            }

                            //Potential Move Num 2
                            if (!this.tileIsOccupied({x: desiredPosition.x + 2, y: desiredPosition.y + 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 2, y: desiredPosition.y + 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 2, y:desiredPosition.y + 1})
                            }

                            //Potential Move Num 3
                            if (!this.tileIsOccupied({x: desiredPosition.x - 1, y: desiredPosition.y + 2}, boardState) || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y + 2})
                            }

                            //Potential Move Num 4
                            if (!this.tileIsOccupied({x: desiredPosition.x - 2, y: desiredPosition.y + 1}, boardState) || this.isEnemyTile({x:desiredPosition.x -2, y: desiredPosition.y + 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y + 1})
                            }

                            //Potential Move Num 5
                            if (!this.tileIsOccupied({x: desiredPosition.x - 1, y: desiredPosition.y -2}, boardState) || this.isEnemyTile({x:desiredPosition.x - 1, y: desiredPosition.y - 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 1, y:desiredPosition.y - 2})
                            }

                            //Potential Move Num 6
                            if (!this.tileIsOccupied({x: desiredPosition.x -2, y: desiredPosition.y - 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y - 1})
                            }

                            //Potential Move Num 7
                            if (!this.tileIsOccupied({x: desiredPosition.x + 1, y: desiredPosition.y - 2}, boardState) || this.isEnemyTile({x:desiredPosition.x + 1, y: desiredPosition.y + 2}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x - 2, y:desiredPosition.y - 1})
                            }

                            //Potential Move Num 8 
                            if (!this.tileIsOccupied({x: desiredPosition.x + 2, y: desiredPosition.y - 1}, boardState) || this.isEnemyTile({x:desiredPosition.x + 2, y: desiredPosition.y - 1}, boardState,colorType)) { 
                                lastPiece.validMoves.push({x:desiredPosition.x + 2, y:desiredPosition.y - 1})
                            }
                            
                            return true; 
                        }
      
                    }
                }
            }
            
        }
        else if(pieceType === PieceType.ROOK) { 
            /**
             * Movement Logic + Conquer logic 
             */
        
            
            let maxRightMove = 7 - initialPosition.x;
            let maxUpMove = 7 - initialPosition.y; 
            
            // console.log(this.jumpedOverSomethingX(initialPosition, desiredPosition,boardState))

            // Left of the Rook
            if (initialPosition.y === desiredPosition.y && desiredPosition.x - initialPosition.x < 0) { 
                if (this.jumpedOverSomethingXLeft(initialPosition,desiredPosition,boardState) === false) { 
                   
                    if(!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition, boardState, colorType)) {
                        return true 
                    }
                 
                }
                else {
                    return false;
                }
            }
           
            // Right of the rook 
            if (initialPosition.y === desiredPosition.y && desiredPosition.x - initialPosition.x <= 7 ) { 
                    if (this.jumpedOverSomethingXRight(initialPosition, desiredPosition,boardState) === false) {
                        if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType) ) { 
                            return true;
                        }
                    }
                else {
                    return false; 
                }
            
            }
            // ROOK UPWARD MOVMEMENT
            if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y < 0 ) { 
                if (this.jumpedOverSomethingYBelow(initialPosition, desiredPosition, boardState) === false) { 
                    if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) { 
                        return true; 
                    }
                }
            else { 
                return false;
            }
            }

            // ROOK DOWNWARD MOVEMENT
            if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y <= 7 ) { 
                if (this.jumpedOverSomethingYAbove(initialPosition, desiredPosition, boardState) === false) { 
                    if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                        return true 
                    }
                }
                else {
                    return false;
                }
            }

        }
        else if (pieceType === PieceType.BISHOP) { 

            /**
             * MOVE + CONQUER MOVES 
             */

            const isDiagonalMovement = Math.abs(desiredPosition.x - initialPosition.x) === Math.abs(desiredPosition.y - initialPosition.y)

            //Left-Up movement -> WORKS
            if (desiredPosition.x - initialPosition.x < 0 && desiredPosition.y - initialPosition.y >= 0 && isDiagonalMovement) { 
                if (this.jumpedOverPieceLeftUp(initialPosition,desiredPosition, boardState) === false) { 
                    if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                        
                         return true 
                    }
                }
                else { 
                    return false
                }
            }

            // Right-Up movement -> WORKS
            if (desiredPosition.x - initialPosition.x >= 0 && desiredPosition.y - initialPosition.y >= 0 && isDiagonalMovement) { 
                if (this.jumpedOverPieceRightUp(initialPosition,desiredPosition, boardState) === false) { 
                    if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                         return true 
                    }
                }
                else { 
                    return false
                }
            }

            //Right-Bottom Movement
            if (desiredPosition.x - initialPosition.x >= 0 && desiredPosition.y - initialPosition.y < 0 && isDiagonalMovement) { 
                
                if (this.jumpedOverPieceRightBelow(initialPosition,desiredPosition, boardState) === false) {
              
                    if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                         return true 
                    }
                }
                else { 
                    return false
                }
            }

            //Left-Bottom Movement 
            if (desiredPosition.x - initialPosition.x < 0 && desiredPosition.y - initialPosition.y < 0 && isDiagonalMovement) { 
                
                if (this.jumpedOverPieceLeftBelow(initialPosition,desiredPosition, boardState) === false) {
                    
                    if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                         return true 
                    }
                }
                else { 
                    return false
                }
            }
        }

        else if (pieceType === PieceType.QUEEN) { 
            /**
             * The queen can move in 8 directions
             * Reuse Bishop + Rook Codes
             */
             const isDiagonalMovement = Math.abs(desiredPosition.x - initialPosition.x) === Math.abs(desiredPosition.y - initialPosition.y)

             //Diagonal Left Up Movement 
             if (desiredPosition.x - initialPosition.x < 0 && desiredPosition.y - initialPosition.y >= 0 && isDiagonalMovement) { 
                 if (this.jumpedOverPieceLeftUp(initialPosition,desiredPosition, boardState) === false) { 
                     if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                         
                          return true 
                     }
                 }
                 else { 
                     return false
                 }
             }
 
             // Diagonal Right Up Movement 
             if (desiredPosition.x - initialPosition.x >= 0 && desiredPosition.y - initialPosition.y >= 0 && isDiagonalMovement) { 
                 if (this.jumpedOverPieceRightUp(initialPosition,desiredPosition, boardState) === false) { 
                     if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                          return true 
                     }
                 }
                 else { 
                     return false
                 }
             }
 
             //Diagonal Right-Bottom Movement
             if (desiredPosition.x - initialPosition.x >= 0 && desiredPosition.y - initialPosition.y < 0 && isDiagonalMovement) { 
                 
                 if (this.jumpedOverPieceRightBelow(initialPosition,desiredPosition, boardState) === false) {
               
                     if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                          return true 
                     }
                 }
                 else { 
                     return false
                 }
             }
 
             //Diagonal Left-Bottom
             if (desiredPosition.x - initialPosition.x < 0 && desiredPosition.y - initialPosition.y < 0 && isDiagonalMovement) { 
                 
                 if (this.jumpedOverPieceLeftBelow(initialPosition,desiredPosition, boardState) === false) {
                     
                     if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                          return true 
                     }
                 }
                 else { 
                     return false
                 }
             }

            // Left 
            if (initialPosition.y === desiredPosition.y && desiredPosition.x - initialPosition.x < 0) { 
                if (this.jumpedOverSomethingXLeft(initialPosition,desiredPosition,boardState) === false) { 
                   
                    if(!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition, boardState, colorType)) {
                        return true 
                    }
                 
                }
                else {
                    return false;
                }
            }
           
            // Right 
            if (initialPosition.y === desiredPosition.y && desiredPosition.x - initialPosition.x <= 7 ) { 
                    if (this.jumpedOverSomethingXRight(initialPosition, desiredPosition,boardState) === false) {
                        if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType) ) { 
                            return true;
                        }
                    }
                else {
                    return false; 
                }
            
            }
            // Upward Movement 
            if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y < 0 ) { 
                if (this.jumpedOverSomethingYBelow(initialPosition, desiredPosition, boardState) === false) { 
                    if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) { 
                        return true; 
                    }
                }
            else { 
                return false;
            }
            }

            //Downward Movement 
            if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y <= 7 ) { 
                if (this.jumpedOverSomethingYAbove(initialPosition, desiredPosition, boardState) === false) { 
                    if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                        return true 
                    }
                }
                else {
                    return false;
                }
            }


        }
        
        else if (pieceType === PieceType.KING) { 
            /** 
             * King's moves are all 1 block each, I think of it as a combination of pawn(that can move backwards) + bishop
             */
            

            // Left of the KING
            if (initialPosition.y === desiredPosition.y && desiredPosition.x - initialPosition.x === -1) {    
                if(!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition, boardState, colorType)) {
                    return true 
                }
                 
                else {
                    return false;
                }
            }
           
            // Right of the KING
            if (initialPosition.y === desiredPosition.y && desiredPosition.x - initialPosition.x === 1 ) { 
                if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType) ) { 
                    return true;
                    }
                else {
                    return false; 
                }
            
            }

            // ABOVE THE KING
            if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === 1 ) { 
                if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) { 
                    return true; 
                }
                
                else { 
                    return false;
                }

            }

            // BELOW THE KING  
            if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === -1 ) { 
                if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                    return true 
                    
                }
                else {
                    return false;
                }
            }
            

            const isDiagonalMovement = Math.abs(desiredPosition.x - initialPosition.x) === Math.abs(desiredPosition.y - initialPosition.y)

            //Left-Up movement -> WORKS
            if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === 1 && isDiagonalMovement) {
                if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                         return true 
                    }
                
                else { 
                    return false
                }
            }

            // Right-Up movement -> WORKS
            if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === 1 && isDiagonalMovement) { 
                if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                    return true 
                }
                else { 
                    return false
                }
            }

            //Right-Bottom Movement
            if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === -1 && isDiagonalMovement) { 
                    if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                         return true 
                    }
                else { 
                    return false
                }
            }

            //Left-Bottom Movement 
            if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === -1 && isDiagonalMovement) { 
                if (!this.tileIsOccupied(desiredPosition,boardState) || this.isEnemyTile(desiredPosition,boardState, colorType)) {
                    return true 
                }
                else { 
                    return false
                }
            }
        }
    }

    /**
     * Method to check if the king was put on check
     * @param kingPos The king's current position on the chessboard
     * @param list 
     * @returns 
     */
    kingIsOnCheck(boardState: Piece[]): boolean  { 
        
        //Set Random Value to find the King's Location
   

        //Find the King's new location 
        boardState.forEach((piece) => {
            if (piece.type === PieceType.KING) { 
                KINGLOCATION = piece.position
            }
        })
        
        //Check if the king's location is a part of the lastPiece's moveset
        const kingIsPart = lastPiece.validMoves.find((pos) => pos.x === KINGLOCATION.x && pos.y === KINGLOCATION.y)
        
        if (kingIsPart) {

        lastPiece.validMoves = []
        return true; 
        } 
        
        lastPiece.validMoves = []
        return false 
        
    }   

    protectKingFromCheck(desiredPostion: Position) { 
        // To Do: 
        
    }

 
}
    


        
    
    