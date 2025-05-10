import { state } from "../state/globalStateManager.js";
import { k } from "../kaboomLoader.js";

function makeCounter(k) {
  const counter = k.make([
    k.sprite("counter", { anim: "default" }),
    k.fixed(),
    k.pos(10, 85),
    k.scale(4),
    {
      textObj: null,

      setEvents() {
        this.textObj = k.add([
          k.text(state.current().coin.toString(), { size: 40 }),
          k.pos(this.pos.x + 100, this.pos.y + 10), // adjust to align next to the counter
          k.fixed(),
          "coinText"
        ]);

        this.on("update", () => {
          const currentCoin = state.current().coin;

          // Remove if game over
          if (state.current().playerHp === 0) {
            k.destroy(this);
            if (this.textObj) k.destroy(this.textObj);
            return;
          }

          // Update coin text every frame
          if (this.textObj) {
            this.textObj.text = currentCoin.toString();
          }
        });
      },
    },
  ]);

  return counter;
}

export const counter = makeCounter(k);
