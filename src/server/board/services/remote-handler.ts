import { producer } from "server/store";
import { remotes } from "shared/remotes";

export function initRemoteHandlerService() {
	remotes.setCell.connect((_, index, value) => {
		producer.setCell(index, value);
		producer.swapPlayerOption();
	});
}
