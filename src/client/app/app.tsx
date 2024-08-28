import React from "@rbxts/react";
import { Board } from "client/components/board";
import { Lobby } from "client/components/lobby";
import { Music } from "client/components/music";
import { Page } from "client/components/ui/page";

export function App() {
	return (
		<screengui IgnoreGuiInset={true} ResetOnSpawn={false}>
			<Music />

			<Page page="LOBBY">
				<Lobby />
			</Page>

			<Page page="GAME">
				<Board />
			</Page>
		</screengui>
	);
}
