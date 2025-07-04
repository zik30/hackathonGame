import { makeCartridge } from "../entities/healthCartridge.js";
import { makePlayer } from "../entities/player.js";
import { healthBar } from "../ui/healthBar.js";
import {
  setBackgroundColor,
  setMapColliders,
  setCameraZones,
  setExitZones,
  setCameraControls,
} from "./roomUtils.js";

export function room2(k, roomData, previousSceneData = { selectedCharacter: "player" }) {
  const { selectedCharacter } = previousSceneData;
  console.log("Selected Character in Room 2:", selectedCharacter);
  setBackgroundColor(k, "#a2aed5");
  k.camScale(4);
  k.camPos(170, 100);
  k.setGravity(1000);

  const roomLayers = roomData.layers;
  const map = k.add([k.pos(0, 0), k.sprite("room2")]);
  const colliders = roomLayers[4].objects;
  setMapColliders(k, map, colliders);

  const player = map.add(makePlayer(k, selectedCharacter));
  player.setEvents();
  setCameraControls(k, player, map, roomData);

  const positions = roomLayers[5].objects;
  for (const position of positions) {
    if (position.name === "entrance-1" && previousSceneData.exitName === "exit-1") {
      player.setPosition(position.x + map.pos.x, position.y + map.pos.y);
      player.setControls();
      player.enablePassthrough();
      player.setEvents();
      continue;
    }

    if (position.name === "entrance-2" && previousSceneData.exitName === "exit-2") {
      player.respawnIfOutOfBounds(1000, "room2", { exitName: "exit-2" });
      k.camPos(player.pos);
    }

    if (position.type === "cartridge") {
      map.add(makeCartridge(k, k.vec2(position.x, position.y)));
    }
  }

  const cameras = roomLayers[6].objects;
  setCameraZones(k, map, cameras);

  const exits = roomLayers[7].objects;
  setExitZones(k, map, exits, "room1", { selectedCharacter });

  healthBar.setEvents();
  healthBar.trigger("update");
  k.add(healthBar);
}