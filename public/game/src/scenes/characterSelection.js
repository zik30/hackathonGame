export function characterSelection(k) {
 
  k.add([
    k.rect(k.width(), k.height()),
    k.pos(0, 0),
    k.color(0, 0, 20),
  ]);

  k.add([
    k.text("Выберите персонажа", { size: 24 }),
    k.pos(k.width() / 2, 50),
    k.anchor("center"),
  ]);

  const characters = [
    { name: "player", sprite: "player" },
    { name: "player2", sprite: "player2" },
    { name: "player3", sprite: "player3" },
  ];

  characters.forEach((character, index) => {
    const x = k.width() / 2 - 150 + index * 150;
    const y = k.height() / 2;

    const box = k.add([
      k.rect(100, 100),
      k.pos(x, y),
      k.color(255, 255, 0),
      k.anchor("center"),
      k.area(),
      k.outline(2, k.rgb(255, 255, 255)),
      "characterBox",
      { name: character.name },
    ]);

    k.add([
      k.sprite(character.sprite, { anim: "idle" }),
      k.pos(x, y - 20),
      k.anchor("center"),
      k.scale(2),
    ]);

    box.onClick(() => {
      k.go("room1", { selectedCharacter: character.name });
    });
  });

  
  k.onKeyPress("up", () => {
  });
}