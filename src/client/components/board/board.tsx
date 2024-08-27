import React, { useEffect, useState } from "@rbxts/react";
import { Board, Cell, ORIGINAL_BOARD, PlayerOption } from "shared/game/constants";
import { RED, BLUE, WHITE, GREEN } from "shared/style/constants";

export function Board() {
	const [playerOption, setPlayerOption] = useState<PlayerOption>("X");
	const [board, setBoard] = useState<Board>(ORIGINAL_BOARD);
	const [winner, setWinner] = useState<PlayerOption | undefined>(undefined);
	const [stalemate, setStalemate] = useState<boolean>(false);

	const cellTaken = (index: number) => board[index] !== false;

	const setCell = (index: number, value: Cell) => {
		const newBoard = [...board];
		newBoard[index] = value;
		setBoard(newBoard);
	};

	const evaluateWinner = (): PlayerOption | undefined => {
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
			const [a, b, c] = combination;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a];
			}
		}
	};

	const isBoardFull = () => board.every((cell) => cell !== false);

	const evaluateStalemate = () => isBoardFull() && !evaluateWinner();

	useEffect(() => {
		setWinner(evaluateWinner());
		setStalemate(evaluateStalemate());
	}, board);

	return (
		<>
			<textlabel
				Size={new UDim2(0, 300, 0, 50)}
				Position={new UDim2(0.5, 0, 0.5, -200)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Text={stalemate ? "Stalemate!" : winner ? `${winner} wins!` : `${playerOption}'s turn`}
				TextScaled={true}
				Font={Enum.Font.Arcade}
			/>
			<frame
				Size={new UDim2(0, 300, 0, 300)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
			>
				{board.map((cell, index) => {
					const x = (index % 3) * 100;
					const y = math.floor(index / 3) * 100;

					const color = cell === "X" ? RED : cell === "O" ? BLUE : WHITE;
					const text = cell === "X" ? "X" : cell === "O" ? "O" : "";

					return (
						<frame
							Size={new UDim2(0, 100, 0, 100)}
							Position={new UDim2(0, x, 0, y)}
							BackgroundColor3={color}
							BorderSizePixel={1}
						>
							<textbutton
								Size={new UDim2(1, 0, 1, 0)}
								Text={text}
								TextScaled={true}
								BackgroundTransparency={1}
								Font={Enum.Font.Arcade}
								Event={{
									MouseButton1Click: () => {
										if (cellTaken(index)) return;
										if (evaluateWinner()) return;

										setCell(index, playerOption);
										setPlayerOption(playerOption === "X" ? "O" : "X");
									},
								}}
							/>
						</frame>
					);
				})}
			</frame>
			<textbutton
				Size={new UDim2(0, 250, 0, 50)}
				Position={new UDim2(0.5, 0, 0.5, 200)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={GREEN}
				Text={"Restart?"}
				TextScaled={true}
				Font={Enum.Font.Arcade}
				Event={{
					MouseButton1Click: () => {
						setPlayerOption("X");
						setBoard(ORIGINAL_BOARD);
						setWinner(undefined);
					},
				}}
			/>
		</>
	);
}
