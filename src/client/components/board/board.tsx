import React from "@rbxts/react";
import { Board } from "shared/game/constants";
import { RED, BLUE, WHITE } from "shared/style/constants";
import { ProfileCard, ProfileCardProps } from "./profile-card";
import { useSelector } from "@rbxts/react-reflex";
import {
	selectBoard,
	selectCellTaken,
	selectPlayer1,
	selectPlayer2,
	selectPlayerOption,
	selectStalemate,
	selectTimeoutTime,
	selectWinner,
} from "shared/store/board";
import { producer } from "client/store";
import { remotes } from "shared/remotes";

interface BoardProfileCardProps extends ProfileCardProps {
	position: UDim2;
}

function BoardProfileCard({ userId, playerOption, position }: BoardProfileCardProps) {
	return (
		<frame Size={new UDim2(0, 150, 0, 200)} Position={position} BackgroundTransparency={1}>
			<ProfileCard userId={userId} playerOption={playerOption} />
		</frame>
	);
}

export function Board() {
	const board = useSelector(selectBoard);
	const winner = useSelector(selectWinner);
	const stalemate = useSelector(selectStalemate);
	const player1 = useSelector(selectPlayer1);
	const player2 = useSelector(selectPlayer2);
	const playerOption = useSelector(selectPlayerOption);
	const timeoutTime = useSelector(selectTimeoutTime);

	return (
		<>
			<textlabel
				Size={new UDim2(0, 300, 0, 50)}
				Position={new UDim2(0.5, 0, 0.5, -250)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Text={`${tostring(timeoutTime)}s left!`}
				TextScaled={true}
				Font={Enum.Font.Arcade}
			/>

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
										if (producer.getState(selectCellTaken(index))) return;
										if (producer.getState(selectWinner)) return;

										remotes.setCell.fire(index);
									},
								}}
							/>
						</frame>
					);
				})}
			</frame>

			<BoardProfileCard userId={player1} playerOption="X" position={new UDim2(0, 0, 0.5, 0)} />
			<BoardProfileCard userId={player2} playerOption="O" position={new UDim2(1, -150, 0.5, 0)} />
		</>
	);
}
