import { createProducer } from "@rbxts/reflex";
import { Board, Cell, PlayerOption, TIMEOUT_TIME } from "shared/game/constants";

interface BoardState {
	board: Board;
	playerOption: PlayerOption;
	player1: number;
	player2: number;
	timeout: number;
}

const initialState: BoardState = {
	board: [false, false, false, false, false, false, false, false, false],
	playerOption: "X",
	player1: 0,
	player2: 0,
	timeout: TIMEOUT_TIME,
};

export const boardSlice = createProducer(initialState, {
	resetBoard: (state) => initialState,

	setCell: (state, index: number, value: Cell) => ({
		...state,
		board: state.board.map((cell, currentIndex) => (currentIndex === index ? value : cell)),
	}),

	swapPlayerOption: (state) => ({
		...state,
		playerOption: state.playerOption === "X" ? "O" : "X",
	}),

	setPlayers: (state, player1: number, player2: number) => ({
		...state,
		player1,
		player2,
	}),

	setTimeout: (state, timeout: number) => ({
		...state,
		timeout,
	}),

	decrementTimeout: (state) => ({
		...state,
		timeout: state.timeout - 1,
	}),
});
