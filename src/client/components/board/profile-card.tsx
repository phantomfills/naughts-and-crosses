import React, { useEffect, useState } from "@rbxts/react";
import { Players, UserService } from "@rbxts/services";
import { IMAGES, PlayerOption } from "shared/game/constants";
import { USER_ID } from "shared/game/constants";
import { BLUE, RED } from "shared/style/constants";

const THUMBNAIL_TYPE = Enum.ThumbnailType.HeadShot;
const THUMBNAIL_SIZE = Enum.ThumbnailSize.Size420x420;

export interface ProfileCardProps {
	userId: number;
	playerOption: PlayerOption;
}

export function ProfileCard({ userId, playerOption }: ProfileCardProps) {
	const [userThumbnail, setUserThumbnail] = useState<string | undefined>(undefined);
	const [username, setUsername] = useState<string | undefined>(undefined);

	useEffect(() => {
		try {
			const [thumbnail] = Players.GetUserThumbnailAsync(999999999999999, THUMBNAIL_TYPE, THUMBNAIL_SIZE);
			setUserThumbnail(thumbnail);

			const userInfos: (UserInfo | undefined)[] = UserService.GetUserInfosByUserIdsAsync([userId]);

			const firstUserInfo = userInfos[0];
			if (!firstUserInfo) return;
			setUsername(firstUserInfo.DisplayName);
		} catch (error) {
			warn(error);
			setUserThumbnail(IMAGES.ERROR);
			setUsername("Error");
		}
	}, []);

	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<imagelabel
				Size={new UDim2(1, -10, 0.75, -10)}
				Position={new UDim2(0, 5, 0, 10)}
				BackgroundTransparency={1}
				Image={userThumbnail}
			/>
			<textlabel
				Size={new UDim2(1, 0, 0.25, 0)}
				Position={new UDim2(0, 0, 0.75, 0)}
				BackgroundColor3={playerOption === "X" ? RED : BLUE}
				Text={userId === USER_ID ? "You" : (username ?? "Loading...") + `(${playerOption})`}
				Font={Enum.Font.Arcade}
				TextScaled
			/>
		</frame>
	);
}
