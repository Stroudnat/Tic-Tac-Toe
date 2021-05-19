const Board = () => {
    const [player, setPlayer] = React.useState(1);
    const [gameState, setGameState] = React.useState([]);
    let status =`Winner: ${checkForWinner(gameState)}`;

    let playerTurn = `Next: ${player == '0' ? 'Player O':'Player X'}`;

    const takeTurn = (id) => {
        setGameState([...gameState, { id:id, player: player }]);
        setPlayer((player + 1)%2);
        return player;
    };

    const renderSquare = i => <Square id={i} takeTurn={takeTurn}></Square>; //reusable squares to be placed within divs
    return(
        <div className="game-board">
            <div className="grid-row">
                {renderSquare(0)} {/* the #'s are the IDs */}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="grid-row">
                {renderSquare(3)} {/* the #'s are the IDs */}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="grid-row">
                {renderSquare(6)} {/* the #'s are the IDs */}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div id="info">
                <h1>{playerTurn}</h1>
                <h1>{status}</h1>
            </div>
        </div>
    );
};

const Square = ({takeTurn, id}) => { //props are the #(id) from renderSquare  
    const [filled, setFilled] = React.useState(false);
    const [tik, setTik] = React.useState(2);
    const xo = ["O", "X", "+"];

    
    return (
        <button 
        className={tik == '1' ? 'black':'white'}
        onClick={() =>{
            setTik(takeTurn(id));
            setFilled(true);
            console.log(`Square: ${id} filled by player ${tik}`);
        }}>
            <h1>{xo[tik]}</h1>
        </button>
    );
};

const win = [
    //rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6]
];

const checkPlayerTurn = (gameState) => {
    return gameState.player;
};

const checkForWinner = (gameState) => {
    // get array of box id's
    // can't be a winner in less than 5 turns
    if (gameState.length < 5) return 'No Winner Yet';
    let p0 = gameState.filter((item) => {
      if (item.player == 0) return item;
    });
    p0 = p0.map((item) => item.id);
    let px = gameState.filter((item) => {
      if (item.player == 1) return item;
    });
    px = px.map((item) => item.id);
    if (p0 != null && px != null) {
      var win0 = win.filter((item) => {
        return isSuperset(new Set(p0), new Set(item));
      });
      var winX = win.filter((item) => {
        return isSuperset(new Set(px), new Set(item));
      });
    }
    if (win0.length > 0) return 'Player O ';
    else if (winX.length > 0) return 'Player X ';
    return 'No Winner Yet';
  };

  function isSuperset(set, subset) {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }



// =============================================
ReactDOM.render(<Board/>, document.getElementById("root"));