import React from 'react';
import './Tile.css'; 

import {Position} from '../../Constant';
import { viableMoves } from '../../rules/rules';


/**
 * To be used by Tile Function
 */
interface Props { 
    image: string 
    number : number;
}

export function dispViableMoves(pieceName: string){ 
    if (pieceName === 'bp') { 
        return (
            
            <div className = "tile highlighted-tile"> </div>
        )
    }

}
export default function Tile({number,image}: Props) {  
    if (number % 2 === 0 ) { 
        
        //You don't have to access a whole tag by reading their entire keyword 
        //

        //The img tag will always look at the public folder of react so transfer your images there 
        if (image.charAt(14) === 'w') {
        return (
        <div className = "tile coloured-tile">   
        {/* Render the image as a background image rather than a file */}
        {/* Only render as a background image if it's not a null value */}
       {image && <div style={{backgroundImage: `url(${image})`}} className = 'chess-piece' title = "white-piece">   </div>}

        </div> )
        }
        else { 
            return (
                <div className = "tile coloured-tile">   
               {image && <div style={{backgroundImage: `url(${image})`}} className = 'chess-piece' title = "black-piece">   </div>}
        
                </div> )
        }
    }
    else { 
        if (image.charAt(14) === 'w') {
         return (
        
        <div className= 'tile white-tile'>
        
        {image && <div style={{backgroundImage: `url(${image})`}} className = 'chess-piece' title = 'white-piece'>   </div>}
        
             </div>
        )
         }
         else { 
            return (
        
                <div className= 'tile white-tile'>
                
                {image && <div style={{backgroundImage: `url(${image})`}} className = 'chess-piece' title = 'black-piece'>   </div>}
                
                     </div>
                ) 
         }
    }
}