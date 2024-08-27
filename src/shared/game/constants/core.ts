import { Players } from "@rbxts/services";

export const USER_ID = Players.LocalPlayer ? Players.LocalPlayer.UserId : 0;
