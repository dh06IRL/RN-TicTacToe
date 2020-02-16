import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, Button } from 'react-native';
import Block from './block.js'
import {
    GAME_OVER,
    GAME_OPEN,
    USER_MOVE,
    CPU_MOVE,
    MOVE_X,
    MOVE_O
} from './consts.js'

var gameBoard = ["", "", "", "", "", "", "", "", ""];

export default class Ticitac extends Component {
    state: {
        baseBoard: gameBoard,
        userMoves: [],
        cpuMoves: [],
        status: "",
        gameState: ""
    };

    constructor() {
        super()
        this.state = {
            baseBoard: gameBoard,
            userMoves: [],
            cpuMoves: [],
            status: USER_MOVE,
            gameState: GAME_OPEN
        }
        this.newGame = this.newGame.bind(this);
        this.userMove = this.userMove.bind(this);
        this.pickCpuMove = this.pickCpuMove.bind(this);
        this.checkForWinner = this.checkForWinner.bind(this);
        this.checkForAvailableMoves = this.checkForAvailableMoves.bind(this);
    }

    componentDidMount() {
        this.newGame()
    }

    newGame() {
        //Reset all base game logic / state
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        console.log("New Game State")
        this.setState({
            baseBoard: gameBoard,
            userMoves: [],
            cpuMoves: [],
            status: USER_MOVE,
            gameState: GAME_OPEN
        });
    }

    //tracking updates for each user move
    userMove(selection, cVal, rVal) {
        //Dont let user move until it's their turn
        if (this.state.status != USER_MOVE) {
            console.log("wait your turn!")
            return;
        }
        //only allow move if game isn't over
        if (this.state.gameState == GAME_OPEN) {
            if (gameBoard[selection] == "") {
                gameBoard[selection] = MOVE_X;
                this.setState({
                    baseBoard: gameBoard,
                    gameState: GAME_OPEN,
                    status: CPU_MOVE
                });
                this.pickCpuMove();
            } else {
                console.log("Cell has already been selected!")
            }
        } else if (this.state.gameState = GAME_OVER) {
            console.log("The game is over!")
        }
    }

    checkForAvailableMoves() {
        //Look at all moves made and get count
        var moves = [];
        var index = 0;
        while (index < gameBoard.length) {
            if (gameBoard[index] != "") {
                moves.push(index);
            }
            index++;
        }
        //Only check after enough moves for a possible winner is made
        if (moves.length >= 5) {
            var userHasWon = this.checkForWinner(MOVE_X);
            var cpuHasWon = this.checkForWinner(MOVE_O);
            //if someone has won, end game + state + show dialog
            if (userHasWon || cpuHasWon) {
                console.log("GAME IS OVER");
                this.setState({
                    gameState: GAME_OVER
                });
                var winner = "";
                if (userHasWon) {
                    winner = "You Won!"
                }
                if (cpuHasWon) {
                    winner = "CPU Won!"
                }
                this.gameOverDialog("Game Over", winner);
                return false;
            } else if (moves.length == 9) {
                //if no one has winning combo but all moves are made, draw
                this.setState({
                    gameState: GAME_OVER
                });
                this.gameOverDialog("Game Over", "This game was a draw!");
                return false;
            } else {
                return true;
            }
        } else {
            console.log("Not enough moves for winner");
            return true;
        }
    }

    pickCpuMove() {
        //check for available movees / game state
        if (this.checkForAvailableMoves()) {
            if (this.state.gameState == GAME_OPEN) {
                console.log("cpu move")
                var availCells = [];
                var index = 0;
                while (index < gameBoard.length) {
                    if (gameBoard[index] == "") {
                        availCells.push(index);
                    }
                    index++;
                }
                var RandomNumber = Math.floor(Math.random() * 750) + 2000;
                console.log(RandomNumber);
                setTimeout(() => {
                    gameBoard[availCells[Math.floor(Math.random() * availCells.length)]] = MOVE_O;
                    this.setState({
                        baseBoard: gameBoard,
                        gameState: GAME_OPEN,
                        status: USER_MOVE
                    });
                    this.checkForAvailableMoves();
                }, RandomNumber);
            } else if (this.state.gameState = GAME_OVER) {
                console.log("The game is over!")
            }
        }
    }

    checkForWinner(mover) {
        if ((gameBoard[0] == mover && gameBoard[1] == mover && gameBoard[2] == mover) 
        || (gameBoard[3] == mover && gameBoard[4] == mover && gameBoard[5] == mover) 
        || (gameBoard[6] == mover && gameBoard[7] == mover && gameBoard[8] == mover) 
        || (gameBoard[0] == mover && gameBoard[3] == mover && gameBoard[6] == mover) 
        || (gameBoard[1] == mover && gameBoard[4] == mover && gameBoard[7] == mover) 
        || (gameBoard[2] == mover && gameBoard[5] == mover && gameBoard[8] == mover) 
        || (gameBoard[0] == mover && gameBoard[4] == mover && gameBoard[8] == mover) 
        || (gameBoard[2] == mover && gameBoard[4] == mover && gameBoard[6] == mover)) { 
            return true; 
        } else {
            return false;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Tic Tac Toe</Text>
                <View style={styles.rowHolder}>
                    <Block cellId={0} color="#801336" mVal={this.state.baseBoard[0]} cVal={0} rVal={0} onUserMove={this.userMove}></Block>
                    <Block cellId={1} color="#c72c41" mVal={this.state.baseBoard[1]} cVal={1} rVal={0} onUserMove={this.userMove}></Block>
                    <Block cellId={2} color="#801336" mVal={this.state.baseBoard[2]} cVal={2} rVal={0} onUserMove={this.userMove}></Block>
                </View>
                <View style={styles.rowHolder}>
                    <Block cellId={3} color="#c72c41" mVal={this.state.baseBoard[3]} cVal={0} rVal={1} onUserMove={this.userMove}></Block>
                    <Block cellId={4} color="#801336" mVal={this.state.baseBoard[4]} cVal={1} rVal={1} onUserMove={this.userMove}></Block>
                    <Block cellId={5} color="#c72c41" mVal={this.state.baseBoard[5]} cVal={2} rVal={1} onUserMove={this.userMove}></Block>
                </View>
                <View style={styles.rowHolder}>
                    <Block cellId={6} color="#801336" mVal={this.state.baseBoard[6]} cVal={0} rVal={2} onUserMove={this.userMove}></Block>
                    <Block cellId={7} color="#c72c41" mVal={this.state.baseBoard[7]} cVal={1} rVal={2} onUserMove={this.userMove}></Block>
                    <Block cellId={8} color="#801336" mVal={this.state.baseBoard[8]} cVal={2} rVal={2} onUserMove={this.userMove}></Block>
                </View>
                <Text style={styles.gameStatus}>{this.state.status} : {this.state.gameState}</Text>
                <Button title="Restart Game" color="#801336" onPress={this.newGame} />
            </View>

        );
    }

    gameOverDialog(title, message) {
        Alert.alert(title, message, [{
            text: 'New Game', onPress: () =>
                this.newGame()
        }], { cancelable: false });
    }
}

const styles = StyleSheet.create({
    container: {
        height: 425,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowHolder: {
        flex: 1,
        flexDirection: 'row'
    },
    board: {
        height: 220,
        width: 220,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    title: {
        fontSize: 40,
        paddingTop: 5,
        paddingBottom: 5,
        color: "#ee4540",
    },
    gameStatus: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        color: "#ee4540",
    },
    resetBtn: {
        alignItems: 'center',
        color: '#ee4540',
        padding: 12
    }
})