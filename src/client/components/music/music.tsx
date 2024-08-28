import { useEventListener } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useState } from "@rbxts/react";
import { SoundService } from "@rbxts/services";

const MUSIC = [
	"rbxassetid://9046863253", // Poolside
	"rbxassetid://9046863960", // Beachwave
	"rbxassetid://9039767824", // Confession
	"rbxassetid://9039769202", // Santa Ervilio
	"rbxassetid://9039768724", // Friends
	"rbxassetid://9047050075", // Lo Fi Dreams Hip Hop
	"rbxassetid://9039771403", // Opportunity
	"rbxassetid://9039770227", // It s For Me
	"rbxassetid://9047105000", // I'll Show Ya
	"rbxassetid://9046863579", // City Lights
	"rbxassetid://9047105308", // Dusk To Dawn
	"rbxassetid://9047105702", // Light Dreamer
	"rbxassetid://9047105533", // No Smoking
	"rbxassetid://1848354536", // Relaxed Scene
	"rbxassetid://9043887091", // Lo-fi Chill A
	"rbxassetid://9044565954", // Smooth Vibes (c)
	"rbxassetid://1839841807", // Relax (c)
	"rbxassetid://1838979278", // Early Morning
	"rbxassetid://1841998846", // Lobby Soirée (c)
	"rbxassetid://9047104411", // Beach Cushions
];

export function shuffle<T extends defined>(array: T[]): T[] {
	const result = table.clone(array);
	const random = new Random();

	for (const index of $range(result.size() - 1, 1, -1)) {
		const randomIndex = random.NextInteger(0, index);
		const temp = result[index];
		result[index] = result[randomIndex];
		result[randomIndex] = temp;
	}

	return result;
}

interface SoundOptions {
	volume?: number;
	speed?: number;
	looped?: boolean;
	parent?: Instance;
}

function createSound(
	soundId: string,
	{ volume = 0.5, speed = 1, looped = false, parent = SoundService }: SoundOptions = {},
) {
	const sound = new Instance("Sound");

	sound.SoundId = soundId;
	sound.Volume = volume;
	sound.PlaybackSpeed = speed;
	sound.Looped = looped;
	sound.Parent = parent;

	return sound;
}

export function Music() {
	const [queue, setQueue] = useState(() => shuffle(MUSIC));
	const [index, setIndex] = useState(0);
	const [sound, setSound] = useState<Sound>();

	// Advance the queue when the song ends
	useEventListener(sound?.Ended, () => {
		setIndex(index + 1);
	});

	// Create the next song when the index changes
	useEffect(() => {
		if (index >= queue.size()) {
			// Shuffle the queue if we've reached the end
			setQueue(shuffle(MUSIC));
			setIndex(0);
			return;
		}

		const newSound = createSound(queue[index], { volume: 0.2 });
		newSound.Play();

		setSound(newSound);

		return () => {
			newSound.Destroy();
		};
	}, [index]);

	// Destroy sounds not in use
	useEffect(() => {
		return () => {
			sound?.Destroy();
		};
	}, [sound]);

	return <></>;
}
