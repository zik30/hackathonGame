import { k } from "./kaboomLoader.js";
import { room1 } from "./scenes/room1.js";
import { room2 } from "./scenes/room2.js";
import { setBackgroundColor } from "./scenes/roomUtils.js";
import { makeNotificationBox } from "./ui/notificationBox.js";

async function main() {
  const room1Data = await (await fetch("./maps/room1.json")).json();
  const room2Data = await (await fetch("./maps/room2.json")).json();

  k.scene("room1", ({previousSceneData, hero}) => {
    room1(k, room1Data, previousSceneData, hero);
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

let selectedHero = null;

k.scene("intro", () => {
  setBackgroundColor(k, "#ffffff");

  // k.add(
  //   k.text("Выберите персонажа:", {
  //     size: 24,
  //   }),
  //   k.pos(80, 40)
  // );

  // const characters = [
  //   { name: "player", x: 100 },
  //   { name: "player", x: 250 },
  //   { name: "player", x: 400 },
  // ];

  // characters.forEach((char) => {
  //   const spriteObj = k.add([
  //     k.sprite(char.name),
  //     k.pos(char.x, 120),
  //     k.scale(2),
  //     k.area(), // делает кликабельным
  //     k.origin("center"),
  //     "characterOption",
  //     { charName: char.name },
  //   ]);

    // Обработка клика
    // spriteObj.onClick(() => {
    //   selectedHero = char.name;
    //   const context = new AudioContext();
    //   context.resume();
    //   k.go("room1", { exitName: null, hero: selectedHero });
    // });

    // Альтернатива — клавиши 1, 2, 3
    // k.onKeyPress(char.name.at(-1), () => {
    //   selectedHero = char.name;
    //   const context = new AudioContext();
    //   context.resume();
    //   k.go("room1", { exitName: null, hero: selectedHero });
    // });
  // });
});

k.go("intro");

main();
