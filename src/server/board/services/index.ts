import { initGameStarterService } from "./game-starter";
import { initRemoteHandlerService } from "./remote-handler";
import { initTimeoutService } from "./timeout";

export function initBoardServices() {
	initRemoteHandlerService();
	initGameStarterService();
	initTimeoutService();
}
