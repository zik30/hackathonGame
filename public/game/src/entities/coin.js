import { state, statePropsEnum } from "../state/globalStateManager.js";


export function makeCoin(k, pos) {
    const coin = k.make([
        k.sprite("coin", {anim: "default"}),
        k.pos(pos),
        k.area(),
        k.anchor("center"),
    ]);

    coin.onCollide( "player", (player) => {
        k.play( "health", {volume: 6.5} );
        state.set(statePropsEnum.coin, state.current().coin + 250);
        console.log("coin", state.current().coin);
        
        k.destroy(coin)

        
    });

    return coin;
}