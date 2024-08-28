import { producer } from "server/store";
import { remotes } from "shared/remotes";
import { selectPlayer1, selectPlayer2, selectPlayerOption } from "shared/store/board";

export function initRemoteHandlerService() {
	remotes.setCell.connect((player, index) => {
		const userId = player.UserId;
		const currentOption = producer.getState(selectPlayerOption);

		if (currentOption === "X") {
			const player1 = producer.getState(selectPlayer1);
			if (player1 !== userId) return;
		}

		if (currentOption === "O") {
			const player2 = producer.getState(selectPlayer2);
			if (player2 !== userId) return;
		}

		producer.setCell(index, currentOption);
		producer.swapPlayerOption();
	});
}
