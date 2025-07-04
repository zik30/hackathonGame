import { k } from "./kaboomLoader.js";
import { room1 } from "./scenes/room1.js";
import { room2 } from "./scenes/room2.js";
import { setBackgroundColor } from "./scenes/roomUtils.js";
import { makeNotificationBox } from "./ui/notificationBox.js";
import { characterSelection } from "./scenes/characterSelection.js";

async function main() {
  const room1Data = await (await fetch("./maps/room1.json")).json();
  const room2Data = await (await fetch("./maps/room2.json")).json();

  k.scene("room1", (previousSceneData) => {
    room1(k, room1Data, previousSceneData);
  });
  k.scene("room2", (previousSceneData) => {
    room2(k, room2Data, previousSceneData);
  });

  k.scene("final-exit", () => {
    setBackgroundColor(k, "#20214a");
    k.add(
      makeNotificationBox(
        k,
        "You escaped the factory!\n The End. Thanks for playing!"
      )
    );
  });
}

k.scene("intro", () => {
  setBackgroundColor(k, "#20214a");
  k.add(
    makeNotificationBox(
      k,
      "Escape the factory!\nUse arrow keys to move, x to jump, z to attack.\nPress Enter to start!"
    )
  );
  k.onKeyPress("enter", () => {
    // makes audio will be enabled before the game starts
    const context = new AudioContext();
    context.resume();
    k.go("room1", { selectedCharacter: "player", exitName: null });
  });
});

k.scene("characterSelection", () => characterSelection(k));
k.scene("room1", (ctx) => room1(k, ctx));
k.scene("room2", (ctx) => room2(k, ctx));

k.scene("leaderBoard", () => {
  setBackgroundColor(k, "#000000");
  k.add([
    k.text("Game Over\nLeaderboard", { size: 32, align: "center" }),
    k.pos(k.width() / 2, k.height() / 2 - 50),
    k.anchor("center"),
  ]);

  k.add([
    k.text("Press Enter to Restart", { size: 16, align: "center" }),
    k.pos(k.width() / 2, k.height() / 2 + 50),
    k.anchor("center"),
  ]);

  k.onKeyPress("enter", () => {
    k.go("characterSelection");
  });
});

k.go("characterSelection");

main();
