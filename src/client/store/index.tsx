import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { combineProducers, InferState } from "@rbxts/reflex";
import { slices } from "shared/store";

export type RootState = InferState<typeof producer>;

export const producer = combineProducers({
	...slices,
});

export function RootProvider(props: React.PropsWithChildren) {
	return <ReflexProvider producer={producer}>{props.children}</ReflexProvider>;
}
