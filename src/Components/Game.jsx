import React from 'react';
import Board from './Board';
import CalculateWinner from './CalculateWinner';
import '../App.css';

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (CalculateWinner(squares) || squares[i]){
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          xIsNext: !this.state.xIsNext,
          stepNumber: history.length,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = CalculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return(
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)} style={{width: "137px", marginBottom: "5px", color: "#d8dee9"}}><p style={{color: "#5e81ac", height: "5px"}}>{desc}</p></button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="container-fluid">
                <div row className="row d-flex justify-content-center" style={{paddingBottom: "20px"}}>
                    <p style={{color: "#8FBCBB", fontSize: "36px"}}>{status}</p>
                </div>
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="row d-flex justify-content-center" style={{paddingTop: "20px", marginRight: "20px"}}>
                    <ol style={{color: "#8FBCBB"}}>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;