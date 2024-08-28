import React from "@rbxts/react";
import { Board } from "client/components/board";

export function App() {
	return (
		<screengui IgnoreGuiInset={true} ResetOnSpawn={false}>
			<Board />
		</screengui>
	);
}
