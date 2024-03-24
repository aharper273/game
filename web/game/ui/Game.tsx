import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import { RoomGameState } from "game/models/multiplayer";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { Beam } from "../../../game/classes";
import { Relay } from "../../../game/classes/john/Relay";
import { Controller } from "../controller";
import { useStore } from "../store";
import { BottomPane } from "./BottomPane";
import { GameArea } from "./GameArea";
import { ModalContainer } from "./ModalContainer";
import { SidePane } from "./SidePane";
import styles from "./Game.module.scss";

export interface GameProps {
  className?: string;
  controller?: Controller;
}

export const Game: React.FC<GameProps> = observer(function Game(props) {
  const { controller } = props;

  const root = useStore();
  const { library } = root;

  useEffect(() => {
    library.load();
  }, [library]);

  useEffect(() => {
    if (controller) {
      action(() => {
        controller.setRoot(root);
        root.controller = controller;
      })();
      return action(() => {
        root.controller = null;
        controller.setRoot(null);
      });
    }
  }, [controller, root]);

  const [isFocusMode, setIsFocusMode] = useState(false);
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.target === root.game.stage?.__canvas.element) {
        if (e.nativeEvent.code === root.keybindings.focus) {
          setIsFocusMode((v) => !v);
        }
        if (e.nativeEvent.code === root.keybindings.beam) {
          Beam.isVisible = !Beam.isVisible;
        }
        if (e.nativeEvent.code === root.keybindings.restart) {
          const game = root.game.main?.multiplayer.game;
          switch (game?.mode) {
            case "MP":
              const multiplayerRoom = root.game.multiplayer?.room;
              if (multiplayerRoom != null && multiplayerRoom.id !== "lobby") {
                const gameState = multiplayerRoom.state as RoomGameState;
                const level =
                  gameState.nextLevelCode || String(gameState.nextLevel);
                root.game.multiplayer!.restartLevel(level);
              }
              break;

            case "SP":
              root.game.runInContext(() => game.exitOut());
              root.game.dispatchMainEvent(
                new Relay(Relay.GOTO, "SinglePlayerMenu", "Delete")
              );

              console.log(game?.mode);
              setTimeout(() => {
                root.game.dispatchMainEvent(
                  new Relay(Relay.GOTO, "SinglePlayerMenu", "StartGame")
                );
              }, 100);
              break;

            case "PRACTICE":
              root.game.runInContext(() => game.exitOut());

              console.log(game?.mode);
              setTimeout(() => {
                root.game.runInContext(() => {
                  root.game.main?.startPracticeLevel(game.levelNum);
                });
              }, 100);
              break;
          }
        }
      }
    },
    [root]
  );

  const [gameWrapper, setGameWrapper] = useState<HTMLElement | null>(null);
  const [gameStyles, setGameStyles] = useState<React.CSSProperties>({});
  useEffect(() => {
    if (!gameWrapper) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === gameWrapper) {
          const { width, height } = entry.contentRect;
          const aspectRatio = width / height;
          if (aspectRatio > 800 / 500) {
            setGameStyles({
              width: `${(height * 800) / 500}px`,
              height: `${height}px`,
            });
          } else {
            setGameStyles({
              width: `${width}px`,
              height: `${(width * 500) / 800}px`,
            });
          }
        }
      }
    });
    observer.observe(gameWrapper);
    return () => observer.disconnect();
  }, [gameWrapper]);

  let loader: JSX.Element | null = null;
  if (library.loadError) {
    loader = <p className={styles.error}>{library.loadError}</p>;
  } else if (!library.value) {
    const percentage = `${(library.loadProgress * 100).toFixed(0)}%`;
    loader = <p className={styles.loading}>Loading {percentage}...</p>;
  }
  if (loader) {
    return <div className={cn(styles.loader, props.className)}>{loader}</div>;
  }

  return (
    <div
      className={cn(
        styles.root,
        props.className,
        isFocusMode && styles.focusMode
      )}
      onKeyDown={onKeyDown}
    >
      <div ref={setGameWrapper} className={styles.game}>
        <div style={gameStyles}>
          <ModalContainer className={styles.gameContainer}>
            <GameArea />
          </ModalContainer>
        </div>
      </div>
      <SidePane className={styles.side} />
      <BottomPane className={styles.bottom} />
    </div>
  );
});
