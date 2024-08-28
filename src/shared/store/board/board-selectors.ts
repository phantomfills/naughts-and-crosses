import { SharedState } from "..";

export const selectBoard = (state: SharedState) => state.board.board;

export const selectCellTaken = (index: number) => (state: SharedState) => state.board.board[index] !== false;

export const selectBoardFull = (state: SharedState) => state.board.board.every((cell) => cell !== false);

export const selectWinner = (state: SharedState) => {
	const board = state.board.board;

	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (const combination of winningCombinations) {
		const [index1, index2, index3] = combination;
		if (board[index1] && board[index1] === board[index2] && board[index1] === board[index3]) {
			return board[index1];
		}
	}
};

export const selectStalemate = (state: SharedState) => selectBoardFull(state) && !selectWinner(state);

export const selectPlayerOption = (state: SharedState) => state.board.playerOption;
