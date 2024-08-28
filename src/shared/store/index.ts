import { CombineStates } from "@rbxts/reflex";
import { boardSlice } from "./board";
import { pageSlice } from "./page";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	board: boardSlice,
	page: pageSlice,
};
