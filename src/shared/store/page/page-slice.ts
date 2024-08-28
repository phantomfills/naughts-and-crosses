import { createProducer } from "@rbxts/reflex";

export type Page = "LOBBY" | "GAME";

interface PageState {
	page: Page;
}

const initialState: PageState = {
	page: "LOBBY",
};

export const pageSlice = createProducer(initialState, {
	setPage: (state, page: Page) => {
		return {
			...state,
			page,
		};
	},
});
