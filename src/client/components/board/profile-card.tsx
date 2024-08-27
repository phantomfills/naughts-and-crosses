import React, { useEffect, useState } from "@rbxts/react";
import { Players, UserService } from "@rbxts/services";
import { WHITE } from "shared/style/constants";

const THUMBNAIL_TYPE = Enum.ThumbnailType.HeadShot;
const THUMBNAIL_SIZE = Enum.ThumbnailSize.Size420x420;

interface ProfileCardProps {
	userId: number;
}

export function ProfileCard({ userId }: ProfileCardProps) {
	const [userThumbnail, setUserThumbnail] = useState<string | undefined>(undefined);
	const [username, setUsername] = useState<string | undefined>(undefined);

	useEffect(() => {
		const [thumbnail] = Players.GetUserThumbnailAsync(userId, THUMBNAIL_TYPE, THUMBNAIL_SIZE);
		setUserThumbnail(thumbnail);

		const userInfos: (UserInfo | undefined)[] = UserService.GetUserInfosByUserIdsAsync([userId]);

		const firstUserInfo = userInfos[0];
		if (!firstUserInfo) return;
		setUsername(firstUserInfo.DisplayName);
	}, []);

	return (
		<frame
			Size={new UDim2(0, 150, 0, 200)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<imagelabel Size={new UDim2(0, 150, 0, 150)} BackgroundTransparency={1} Image={userThumbnail} />
			<textlabel
				Size={new UDim2(0, 150, 0, 50)}
				Position={new UDim2(0, 0, 0, 150)}
				BackgroundColor3={WHITE}
				Text={username ?? "Loading..."}
				Font={Enum.Font.Arcade}
				TextScaled
			/>
		</frame>
	);
}
