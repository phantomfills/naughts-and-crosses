import { BroadcastAction } from "@rbxts/reflex";
import { Client, createRemotes, remote, Server } from "@rbxts/remo";
import { PlayerOption } from "shared/game/constants";

export const remotes = createRemotes({
	start: remote<Server>(),
	setCell: remote<Server, [index: number, value: PlayerOption]>(),

	dispatch: remote<Client, [actions: BroadcastAction[]]>(),
});
