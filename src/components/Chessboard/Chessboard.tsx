import { useEffect, useRef, useState } from "react";

import Rules, { getViableMoves } from "../../rules/rules"; // Import the rules from a different folder
import Tile, { dispViableMoves } from "../Tile/Tile"; //Import Tile functionalities -> Same folder
import { viableMoves } from "../../rules/rules";
import './Chessboard.css' //Import styling from current location
import {VERTICAL_AXIS, HORIZONTAL_AXIS, Piece, PieceType, ColorType,initialBoardState, Position, GRID_SIZE, samePosition} from '../../Constant';



//Turn indicator 
let isWhiteTurn = true 

// King On Check Indication 
let kingOnCheck = false 


//Pointer for the selected element, must be removed later on for nullification
let currElement: HTMLElement | null = null;

export function turnIndicator() { 
    
    const text = (isWhiteTurn === true) ? "White's Turn" : "Black's Turn"
    return (
        <div className ='sign'>{text}</div>
    )
    
}
/**
 * Sketches the chess board to be used by App.tsx
 * @returns a chessboard
 */ 
export default function Chessboard() { 
    
    // Allows us to add state without switching to class components
    //Reactive variable to set an active piece 
    const [activePiece, setActivePiece] =  useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>({x: -1, y: -1}); 
    //Reactive variables for the initially clicked position
  
    // pieces will start off as initialBoardState 
    const [pieces,setPieces] = useState<Piece[]>(initialBoardState)
    
    const chessBoardRef = useRef<HTMLDivElement>(null); //make a reference to the chessboard
    const rules = new Rules(); 
    
    /**
    * Grabs the piece 
    * @param e a mouse event
    */
    function grabPiece(e: React.MouseEvent<HTMLElement | null>) { 
 
    const chessboard = chessBoardRef.current;
    const element = e.target as HTMLElement //Consider the target event as an html element object 
    console.log(element)

    currElement = element; 
    //Access the current target's style attribute
    const currTarget = element.getAttribute('title')
    const currPiece = element.getAttribute('style')
    //Identify piece color by the first character of the piece 
    const isWhite = currTarget?.charAt(0) === 'w'
    const isBlack = currTarget?.charAt(0) === 'b'
    
    const pieceName = currPiece?.substring(37,39)



    if (isWhiteTurn === true) {
        
        if (isWhite && chessboard) {
        // Set the x and y coordinate of the selected tile
        const grabX = Math.floor((e.clientX - chessboard.offsetLeft ) / GRID_SIZE); 
        const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)); 

        setGrabPosition({x: grabX, y: grabY })


        // Store coordinates of the clicked location with offset (styling purposes)
        const x = e.clientX - GRID_SIZE/2; 
        const y = e.clientY - GRID_SIZE/2;

        // Styling purposes for grabbed element

        
        currElement.style.position = "absolute";
        currElement.style.left = `${x}px`;
        currElement.style.top = `${y}px`;
        setActivePiece(currElement);

        } // End of White Piece Turn 
    }

    else if (isWhiteTurn === false) {
        if (isBlack && chessboard) { 
        // Set the x and y coordinate of the selected tile
        const grabX = Math.floor((e.clientX - chessboard.offsetLeft ) / GRID_SIZE); 
        const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)); 
        
        setGrabPosition({x: grabX, y: grabY })
        
        
        // Store coordinates of the clicked location with offset (styling purposes)
        const x = e.clientX - GRID_SIZE/2; 
        const y = e.clientY - GRID_SIZE/2;
        
        // Styling the grabed piece 

        currElement.style.position = "absolute";
        currElement.style.left = `${x}px`;
        currElement.style.top = `${y}px`;

        setActivePiece(element); 
        } // End of Black Piece Turn 
    }
}

/**
 * Function that moves the piece
 * @param e mouse event
 */
function movePiece(e: React.MouseEvent) { 
 
   
    const chessboard = chessBoardRef.current;

    //If there is an active piece 
    if (activePiece && chessboard ) {
    
    // Set constraints
    const minX = chessboard.offsetLeft - 25 ;
    const minY = chessboard.offsetTop - 25;
    const maxX = chessboard.offsetLeft + chessboard.clientWidth -75;
    const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;

    // Store coordinates of the clicked location with offset -> To be used for styling purposes 
    const x = e.clientX - 50; 
    const y = e.clientY - 50;
    
    //If x is left out of bounds
    if (x < minX) {
        activePiece.style.left = `${minX}px`
    }   
    // If x is right out of bounds 
    else if(x > maxX) { 
        activePiece.style.left = `${maxX}px`
    }

    //If it's contained inside the board
    else {
        activePiece.style.left = `${x}px`
    }

    //If y is above the board
    if (y < minY) {
        activePiece.style.top = `${minY}px`
    }

    //If y is below the board 
    else if(y > maxY) { 
        activePiece.style.top = `${maxY}px`
    }

    //If y is inside the board 
    else {
        activePiece.style.top = `${y}px`
    }

    activePiece.style.position = "absolute"
    
    
    }
}

/**
 * Function for dropping the piece, do so by nullifying the address of the active piece 
 * @param e mouse event
 */
function dropPiece(e: React.MouseEvent) { 
    const chessboard = chessBoardRef.current; //ref to the current chess board
    const element = e.target as HTMLElement //Consider the target event as an html element object 
    const currTarget = element.getAttribute('title')
    const isWhite = currTarget?.charAt(0) === 'w'
    const isBlack = currTarget?.charAt(0) === 'b'
    const pieceName = currTarget?.substring(0);
   
    if (activePiece && chessboard) {

        
        //Calculate new coordinates for the clicked pieces and make it match with the grid's coordinates
        const x = Math.floor((e.clientX - chessboard.offsetLeft ) / GRID_SIZE);
        const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));
        
        const selectedPiece = pieces.find(p => samePosition(p.position,grabPosition)) 
        
        //Curr piece => {3,4}
        //Curr piece => {4,3}
        if (selectedPiece) { 
            const validMove = rules.isValidMove(grabPosition ,{x,y}, selectedPiece.type, selectedPiece.team,pieces); 

            const pawnDirection = (selectedPiece.team === ColorType.ME) ? 1: -1

            
            const isEnpassantMove = rules.isEnpassantMove(grabPosition, {x, y} ,selectedPiece.type , selectedPiece.team, pieces);

           

            //If the selected piece is valid to perform enpassant 
            if (isEnpassantMove) { 
               
                //REDUCE function
                //Results -> array of results 
                //Piece -> the current piece we are handling 

                const updatedPiece = pieces.reduce( (results,piece) => { 
                    if (samePosition(piece.position,grabPosition)) {
                        piece.enpassant = true; 
                        piece.position.x = x; 
                        piece.position.y = y; 
                        results.push(piece)
                    }

                    //Don't add the piece that has been taken
                    //Same as !(piece.position.x === x && piece.position.y === y - pawnDirection)
                    else if (!(samePosition(piece.position, {x, y: y - pawnDirection}))) { 
                        results.push(piece);

                        piece.enpassant = false; //Prevent doing an enpassant twice in a row 
                    }
                    return results;
                }, [] as Piece[]);

                if (isWhiteTurn === true) { 
                    isWhiteTurn = false 
                }
                else { 
                    isWhiteTurn = true 
                }
              setPieces(updatedPiece)
            
            }
            
            else if (validMove) {
             
                const updatedPiece = pieces.reduce((results,piece) => { 

                    //If the current piece in the iteration matches the selected piece's coordinates
                    //Then set the values accordingly 
                    if (samePosition(piece.position, grabPosition)) { 
                        
                        //If the move performed is a special move, then that piece can be enpassante
                         //Once the piece has move after the special move, then it's no longer viable for an enpassant 
                        piece.enpassant = (Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN)                      
                        
                        piece.position.x = x;
                        piece.position.y = y; 
                        results.push(piece); //Push selected piece's position

                        //Don't add conquered piece back into chessboard
                    } else if (!(samePosition(piece.position, {x,y}))) {

                        //Pawn cannot be enpassanted if no special move is performed 
                        if (piece.type === PieceType.PAWN) { 
                            piece.enpassant = false; 
                        }
                    results.push(piece); 
                    }
                    return results; //return the array so that the next time, the array will already contain the piece 

                },[] as Piece[]);

                if (isWhiteTurn === true) { 
                    isWhiteTurn = false 
                    console.log('BLACK TURN')
                }
                else { 
                    isWhiteTurn = true 
                    console.log('WHITE TURN')
                }

                 //Check if the king was put on check after the latest move 
                kingOnCheck = (rules.kingIsOnCheck(pieces) === true) ? true : false
          
                //Modify setPieces functionality
                setPieces(updatedPiece); 
                activePiece.style.removeProperty("background-image");
                activePiece.style.removeProperty("top");
                activePiece.style.removeProperty("left");
                
        } else { 
            //Reset Piece position 
            activePiece.style.position = "relative"; 
            activePiece.style.removeProperty("top");
            activePiece.style.removeProperty("left");

        }
        
    }
    setActivePiece(null);
}
}
  
    //Helper DS to contain a tile object
    let chessBoard = []; 
    
    // Treat the board as a 2D Array 
    for (let row = HORIZONTAL_AXIS.length-1; row >= 0; row--) { 

      for (let col = 0; col < VERTICAL_AXIS.length; col++) { 
    
        const number = row + col + 2; // This is how we decide which rows are supposed to be white or red 
        
        // For each iteration, find the piece that's associated to each column and row 
        const piece = pieces.find(p => samePosition(p.position, {x: col, y:row}))

        // Update image based on result, if the position contains no piece, let it be an empty string 
        let image = piece ? piece.image: " "; 
        
    
        //Use helper method from tile.tsx
        
        //RENDER THE CHESS PIECE along with its image after iterating through a column
        chessBoard.push(<Tile key={`${row},${col}`}  number = {number} image = {image}/>);
  
        }

    }
    
    return <div

    onMouseDown= {e => grabPiece(e)} 
    onMouseMove = {e => movePiece(e)}     
    onMouseUp= {e => dropPiece(e)}
    id ="chessboard"
    ref={chessBoardRef}
        //Now we can use this to access the board
        >
        {chessBoard}
    </div>; //Return the rendered board
    
}