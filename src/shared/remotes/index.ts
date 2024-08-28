import { BroadcastAction } from "@rbxts/reflex";
import { Client, createRemotes, remote, Server } from "@rbxts/remo";

export const remotes = createRemotes({
	start: remote<Server>(),
	setCell: remote<Server, [index: number]>(),

	dispatch: remote<Client, [actions: BroadcastAction[]]>(),
});
