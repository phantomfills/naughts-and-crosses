import { initGameStarterService } from "./game-starter";
import { initRemoteHandlerService } from "./remote-handler";

export function initBoardServices() {
	initRemoteHandlerService();
	initGameStarterService();
}
