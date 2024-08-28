import { createProducer } from "@rbxts/reflex";
import { Board, Cell, PlayerOption } from "shared/game/constants";

interface BoardState {
	board: Board;
	playerOption: PlayerOption;
}

const initialState: BoardState = {
	board: [false, false, false, false, false, false, false, false, false],
	playerOption: "X",
};

export const boardSlice = createProducer(initialState, {
	setCell: (state, index: number, value: Cell) => ({
		...state,
		board: state.board.map((cell, currentIndex) => (currentIndex === index ? value : cell)),
	}),

	swapPlayerOption: (state) => ({
		...state,
		playerOption: state.playerOption === "X" ? "O" : "X",
	}),
});
