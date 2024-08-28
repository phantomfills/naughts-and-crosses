import { Players } from "@rbxts/services";
import { producer } from "server/store";
import { TIMEOUT_TIME } from "shared/game/constants";
import { selectStalemate, selectWinner } from "shared/store/board";
import { selectPage } from "shared/store/page";

function getPlayersToStartGame(): [Player, Player] | undefined {
	const players = Players.GetPlayers();
	if (players.size() < 2) return;

	const player1Index = math.random(0, players.size() - 1);
	const player1 = players[player1Index];

	const playersWithoutPlayer1 = players.filter((_, index) => index !== player1Index);
	const player2Index = math.random(0, playersWithoutPlayer1.size() - 1);
	const player2 = playersWithoutPlayer1[player2Index];

	return [player1, player2];
}

function handleGameEnded() {
	task.wait(10);

	producer.setPage("LOBBY");
}

export async function initGameStarterService() {
	producer.subscribe(selectWinner, (winner) => {
		if (producer.getState(selectPage) !== "GAME") return;
		if (!winner) return;

		handleGameEnded();
	});

	producer.subscribe(selectStalemate, (stalemate) => {
		if (producer.getState(selectPage) !== "GAME") return;
		if (!stalemate) return;

		handleGameEnded();
	});

	for (;;) {
		task.wait(10);

		if (producer.getState(selectPage) !== "LOBBY") continue;

		const players = getPlayersToStartGame();
		if (!players) continue;

		const [player1, player2] = players;
		producer.resetBoard();
		producer.setPlayers(player1.UserId, player2.UserId);
		producer.setPage("GAME");
		producer.setTimeout(TIMEOUT_TIME);
	}
}
