import './App.css'; //Import Styling component from this css file 

import Chessboard from './components/Chessboard/Chessboard'; //Import the Chessboard func from chessboard.tsx
//Call the function inside 
function App() { 
  return ( 
    <div id = 'app'> 
      
     

      <Chessboard/>
    
    </div>
  );
}

export default App;