import { CombineStates } from "@rbxts/reflex";
import { boardSlice } from "./board";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	board: boardSlice,
};
