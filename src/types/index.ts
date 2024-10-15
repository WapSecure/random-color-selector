export interface User {
  id: string;
  name: string;
  color?: string;
}

export type GameStatus = 'CREATED' | 'JOINED' | 'SPINNING' | 'COMPLETED';

export interface Game {
  id: string;
  createdBy: string;
  players: User[];
  availableColors: string[];
  gameStatus: GameStatus;
  maxPlayers: number;
  currentPlayerTurn: string | null; // User ID
}

