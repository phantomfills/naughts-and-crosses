export const PLAYER_OPTIONS = ["X", "O"] as const;
export type PlayerOption = (typeof PLAYER_OPTIONS)[number];

export type Cell = PlayerOption | false;
export type Board = Array<Cell>;

export const TIMEOUT_TIME = 30;
