import React from "@rbxts/react";
import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Lobby } from "client/components/lobby";
import { RootProvider } from "client/store";

export = hoarcekat(() => {
	return (
		<RootProvider>
			<Lobby />
		</RootProvider>
	);
});
