import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router, // we are aliasing this module for a cleaner call
    Route,
    Link
    // etc.
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';


<
Navbar bg = "light"
expand = "lg" >
    <
    Navbar.Brand href = "#home" > React - Bootstrap < /Navbar.Brand> <
    Navbar.Toggle aria - controls = "basic-navbar-nav" / >
    <
    Navbar.Collapse id = "basic-navbar-nav" >
    <
    Nav className = "mr-auto" >
    <
    Nav.Link href = "#home" > Home < /Nav.Link> <
    Nav.Link href = "#link" > Link < /Nav.Link> <
    NavDropdown title = "Dropdown"
id = "basic-nav-dropdown" >
    <
    NavDropdown.Item href = "#action/3.1" > Action < /NavDropdown.Item> <
    NavDropdown.Item href = "#action/3.2" > Another action < /NavDropdown.Item> <
    NavDropdown.Item href = "#action/3.3" > Something < /NavDropdown.Item> <
    NavDropdown.Divider / >
    <
    NavDropdown.Item href = "#action/3.4" > Separated link < /NavDropdown.Item> <
    /NavDropdown> <
    /Nav> <
    Form inline >
    <
    FormControl type = "text"
placeholder = "Search"
className = "mr-sm-2" / >
    <
    Button variant = "outline-success" > Search < /Button> <
    /Form> <
    /Navbar.Collapse> <
    /Navbar>


function Square(props) {
    return ( <
        button className = "square"
        onClick = {
            props.onClick
        } > {
            props.value
        } <
        /button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return ( <
            Square value = {
                this.props.squares[i]
            }
            onClick = {
                () => this.props.onClick(i)
            }
            />
        );
    }

    render() {
        return ( <
            div >
            <
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
            /div> < /
            div >
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return ( <
                li key = {
                    move
                } >
                <
                button onClick = {
                    () => this.jumpTo(move)
                } > {
                    desc
                } < /button> < /
                li >
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return ( <
            div className = "game" >
            <
            div className = "game-board" >
            <
            Board squares = {
                current.squares
            }
            onClick = {
                i => this.handleClick(i)
            }
            /> < /
            div > <
            div className = "game-info" >
            <
            div > {
                status
            } < /div> <
            ol > {
                moves
            } < /ol> < /
            div > <
            /div>
        );
    }
}

// ========================================

ReactDOM.render( < Game / > , document.getElementById("root"));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}