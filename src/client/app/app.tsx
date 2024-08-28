import React from "@rbxts/react";
import { Board } from "client/components/board";
import { Lobby } from "client/components/lobby";
import { Page } from "client/components/ui/page";

export function App() {
	return (
		<screengui IgnoreGuiInset={true} ResetOnSpawn={false}>
			<Page page="LOBBY">
				<Lobby />
			</Page>

			<Page page="GAME">
				<Board />
			</Page>
		</screengui>
	);
}
