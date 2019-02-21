import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return ( 
        <button 
        className = "square"
        onClick = {props.onClick} > {
            props.value
        } 
    </button>
    );
}

//Square components are controlled components because the board has full control over them
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares:Array(9).fill(null), //initialize array with 9 nulls
            xIsNext: true,
        };
    }
    
    handleClick(i) {
        const squares = this.state.squares.slice(); //slice creates copy of squares to modify
        
        //allows function to return early if someone's won or square already filled
        if (calcWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares:squares,
            xIsNext:!this.state.xIsNext,
        });
    }
    
    renderSquare(i) {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        return (
            <Square 
            value = {this.state.squares[i]}
            onClick={() => this.handleClick(i)} //this function gets called when a square gets clicked
        />
        ); 
    }

    render() {
        const winner = calcWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return ( <
            div >
            <
            div className = "status" > {
                status
            } < /div> <
            div className = "board-row" > {
                this.renderSquare(0)
            } {
                this.renderSquare(1)
            } {
                this.renderSquare(2)
            } <
            /div> <
            div className = "board-row" > {
                this.renderSquare(3)
            } {
                this.renderSquare(4)
            } {
                this.renderSquare(5)
            } <
            /div> <
            div className = "board-row" > {
                this.renderSquare(6)
            } {
                this.renderSquare(7)
            } {
                this.renderSquare(8)
            } <
            /div> <
            /div>
        );
    }
}

class Game extends React.Component {
    render() {
        return ( <
            div className = "game" >
            <
            div className = "game-board" >
            <
            Board / >
            <
            /div> <
            div className = "game-info" >
            <
            div > { /* status */ } < /div> <
            ol > { /* TODO */ } < /ol> <
            /div> <
            /div>
        );
    }
}

function calcWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i=0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null;
}

// ========================================

ReactDOM.render( <
    Game / > ,
    document.getElementById('root')
);
