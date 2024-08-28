import { createProducer } from "@rbxts/reflex";
import { Board, Cell, PlayerOption } from "shared/game/constants";

interface BoardState {
	board: Board;
	playerOption: PlayerOption;
	player1: number;
	player2: number;
}

const initialState: BoardState = {
	board: [false, false, false, false, false, false, false, false, false],
	playerOption: "X",
	player1: 0,
	player2: 0,
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
});
