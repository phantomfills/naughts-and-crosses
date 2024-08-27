import { hoarcekat } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { ProfileCard } from "client/components/board/profile-card";

export = hoarcekat(() => {
	return (
		<frame
			Size={new UDim2(0, 150, 0, 200)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<ProfileCard userId={1} playerOption={"X"} />
		</frame>
	);
});
