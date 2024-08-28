import { useTimer } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";

export function Lobby() {
	const timer = useTimer();
	const rotation = timer.value.map((value) => math.sin(value * 10) * 3);
	const dots = timer.value.map((value) => {
		const effectiveValue = math.floor(value * 2);
		const numberOfDots = (effectiveValue + 1) % 4;
		return string.rep(".", numberOfDots);
	});

	return (
		<>
			<textlabel
				Size={new UDim2(0, 600, 0, 80)}
				Position={new UDim2(0.5, 0, 0.4, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Text="⭕ Naughts and Crosses ❌"
				TextColor3={Color3.fromRGB(255, 255, 255)}
				Font={Enum.Font.Arcade}
				Rotation={rotation}
				TextScaled
			>
				<uistroke Thickness={1} />
			</textlabel>

			<textlabel
				Size={new UDim2(0, 700, 0, 50)}
				Position={new UDim2(0.5, 0, 0.4, 100)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Text={dots.map((value) => `Starting soon${value}`)}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				Font={Enum.Font.Arcade}
				TextScaled
			>
				<uistroke Thickness={1} />
			</textlabel>
		</>
	);
}
