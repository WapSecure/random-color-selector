import React, { createContext, useState, ReactNode } from "react";
import { Game, User, GameStatus } from "../types";

interface GameContextType {
  game: Game | null;
  createGame: (admin: string, maxPlayers: number) => void;
  joinGame: (user: User) => void;
  selectColor: (userId: string, color: string) => void;
  restartGame: () => void;
  isColorTaken: (color: string) => boolean;
  allPlayersSelected: () => boolean;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [game, setGame] = useState<Game | null>(null);

  // Generate a list of unique colors (modify as needed)
  const generateAvailableColors = (): string[] => {
    const baseColors = [
      "Red",
      "Green",
      "Blue",
      "Yellow",
      "Purple",
      "Orange",
      "Cyan",
      "Magenta",
      "Lime",
      "Pink",
      "Teal",
      "Lavender",
      "Brown",
      "Beige",
      "Maroon",
      "Mint",
      "Olive",
      "Coral",
      "Navy",
      "Grey",
      "White",
      "Black",
    ];
    return baseColors.map((color) => color.toLowerCase());
  };

  const createGame = (admin: string, maxPlayers: number) => {
    const adminUser: User = {
      id: "admin-" + Math.random().toString(36).substring(2),
      name: admin,
    };
    const newGame: Game = {
      id: Math.random().toString(36).substring(2),
      createdBy: admin,
      players: [adminUser],
      availableColors: generateAvailableColors(),
      gameStatus: "CREATED",
      maxPlayers,
      currentPlayerTurn: null,
    };
    setGame(newGame);
  };

  const joinGame = (user: User) => {
    if (
      !game ||
      (game.gameStatus !== "CREATED" && game.gameStatus !== "JOINED")
    )
      return;
    if (game.players.length >= game.maxPlayers) return;

    const updatedPlayers = [...game.players, user];
    let updatedStatus: GameStatus = game.gameStatus;
    let updatedCurrentPlayerTurn = game.currentPlayerTurn;

    if (updatedPlayers.length === game.maxPlayers) {
      updatedStatus = "SPINNING";
      updatedCurrentPlayerTurn = updatedPlayers[0].id;
    } else {
      updatedStatus = "JOINED";
    }

    setGame({
      ...game,
      players: updatedPlayers,
      gameStatus: updatedStatus,
      currentPlayerTurn: updatedCurrentPlayerTurn,
    });
  };

  const selectColor = (userId: string, color: string) => {
    if (
      !game ||
      game.gameStatus !== "SPINNING" ||
      game.currentPlayerTurn !== userId
    )
      return;
    const selectedColor = color.toLowerCase();

    if (!game.availableColors.includes(selectedColor)) return;

    // Assign color to the player
    const updatedPlayers = game.players.map((player) =>
      player.id === userId ? { ...player, color: selectedColor } : player
    );

    // Remove the selected color from available colors
    const updatedAvailableColors = game.availableColors.filter(
      (c) => c !== selectedColor
    );

    // Determine the next player's turn
    const currentIndex = game.players.findIndex(
      (player) => player.id === userId
    );
    let nextPlayerTurn: string | null = null;

    if (currentIndex < game.players.length - 1) {
      nextPlayerTurn = game.players[currentIndex + 1].id;
    }

    // Check if all players have selected colors
    const allSelected = updatedPlayers.every((player) => player.color);

    let updatedStatus: GameStatus = game.gameStatus;
    if (allSelected) {
      updatedStatus = "COMPLETED";
      nextPlayerTurn = null;
    }

    setGame({
      ...game,
      players: updatedPlayers,
      availableColors: updatedAvailableColors,
      gameStatus: updatedStatus,
      currentPlayerTurn: nextPlayerTurn,
    });
  };

  const restartGame = () => {
    if (!game) return;
    const resetPlayers = game.players.map((player) => ({
      ...player,
      color: undefined,
    }));
    setGame({
      ...game,
      players: resetPlayers,
      availableColors: generateAvailableColors(),
      gameStatus: "CREATED",
      currentPlayerTurn: null,
    });
  };

  // New function to check if a color is taken
  const isColorTaken = (color: string): boolean => {
    return (
      game?.players.some((player) => player.color === color.toLowerCase()) ??
      false
    );
  };

  // New function to check if all players have selected colors
  const allPlayersSelected = (): boolean => {
    return game?.players.every((player) => player.color) ?? false;
  };

  return (
    <GameContext.Provider
      value={{
        game,
        createGame,
        joinGame,
        selectColor,
        restartGame,
        isColorTaken,
        allPlayersSelected,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
