import { hoarcekat } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { Board } from "client/components/board";
import { RootProvider } from "client/store";

export = hoarcekat(() => {
	return (
		<RootProvider>
			<Board />
		</RootProvider>
	);
});
