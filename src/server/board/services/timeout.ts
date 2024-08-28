import { producer } from "server/store";
import { TIMEOUT_TIME } from "shared/game/constants";
import { selectStalemate, selectTimeoutTime, selectWinner } from "shared/store/board";
import { selectPage } from "shared/store/page";

export async function initTimeoutService() {
	producer.subscribe(selectTimeoutTime, (timeoutTime) => {
		if (timeoutTime > 0) return;
		producer.swapPlayerOption();
		producer.setTimeout(TIMEOUT_TIME);
	});

	for (;;) {
		task.wait(1);
		if (producer.getState(selectPage) !== "GAME") continue;
		if (producer.getState(selectWinner)) continue;
		if (producer.getState(selectStalemate)) continue;
		if (producer.getState(selectTimeoutTime) <= 0) continue;
		producer.decrementTimeout();
	}
}
