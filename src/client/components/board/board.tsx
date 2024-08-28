import React, { useEffect, useState } from "@rbxts/react";
import { Board, Cell, ORIGINAL_BOARD, PlayerOption } from "shared/game/constants";
import { RED, BLUE, WHITE, GREEN } from "shared/style/constants";
import { ProfileCard, ProfileCardProps } from "./profile-card";
import { useSelector } from "@rbxts/react-reflex";
import { selectBoard, selectCellTaken, selectPlayerOption, selectStalemate, selectWinner } from "shared/store/board";
import { producer } from "client/store";
import { remotes } from "shared/remotes";

const PLAYER_1_ID = 585267099;
const PLAYER_2_ID = 1620332636;

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
	const playerOption = useSelector(selectPlayerOption);
	const board = useSelector(selectBoard);
	const winner = useSelector(selectWinner);
	const stalemate = useSelector(selectStalemate);

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
										if (producer.getState(selectCellTaken(index))) return;
										if (producer.getState(selectWinner)) return;

										remotes.setCell.fire(index, playerOption);
									},
								}}
							/>
						</frame>
					);
				})}
			</frame>

			<BoardProfileCard userId={PLAYER_1_ID} playerOption="X" position={new UDim2(0, 0, 0.5, 0)} />
			<BoardProfileCard userId={PLAYER_2_ID} playerOption="O" position={new UDim2(1, -150, 0.5, 0)} />
		</>
	);
}
