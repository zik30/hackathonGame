import { state, statePropsEnum } from "../state/globalStateManager.js";
import { healthBar } from "../ui/healthBar.js";
import { makeBlink } from "./entitySharedLogic.js";

export function makePlayer(k, spriteName = "player") {
  return k.make([
    k.pos(),
    k.sprite(spriteName, { anim: "idle" }),
    k.area({ shape: new k.Rect(k.vec2(0, 18), 12, 12) }),
    k.anchor("center"),
    k.body({ mass: 100, jumpForce: 320 }),
    k.opacity(),
    k.health(state.current().playerHp),
    "player",
    {
      speed: 150,
      isAttacking: false,
      numJumps: 1, 
      doubleJump() {
        if (this.numJumps > 0) {
          this.jump(500); 
          this.numJumps -= 1; 
        }
      },
      resetJumps() {
        this.numJumps = 1; 
      },
      setPosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
      },
      enablePassthrough() {
        this.onBeforePhysicsResolve((collision) => {
          if (collision.target.is("passthrough") && this.isJumping()) {
            collision.preventResolution();
          }
        });
      },
      setControls() {
        this.controlHandlers = [];

        this.controlHandlers.push(
          k.onKeyPress((key) => {
            if (key === "up") {
              if (this.curAnim() !== "jump") this.play("jump");
              this.doubleJump();
            }

            if (
              key === "space" &&
              this.curAnim() !== "attack" &&
              this.isGrounded()
            ) {
              this.isAttacking = true;
              this.add([
                k.pos(this.flipX ? -25 : 0, 10),
                k.area({ shape: new k.Rect(k.vec2(0), 25, 10) }),
                "sword-hitbox",
              ]);
              this.play("attack");

              this.onAnimEnd((anim) => {
                if (anim === "attack") {
                  const swordHitbox = k.get("sword-hitbox", {
                    recursive: true,
                  })[0];
                  if (swordHitbox) k.destroy(swordHitbox);
                  this.isAttacking = false;
                  this.play("idle");
                }
              });
            }
          })
        );

        this.controlHandlers.push(
          k.onKeyDown((key) => {
            if (key === "left" && !this.isAttacking) {
              if (this.curAnim() !== "run" && this.isGrounded()) {
                this.play("run");
              }
              this.flipX = true;
              this.move(-this.speed, 0);
              return;
            }

            if (key === "right" && !this.isAttacking) {
              if (this.curAnim() !== "run" && this.isGrounded()) {
                this.play("run");
              }
              this.flipX = false;
              this.move(this.speed, 0);
              return;
            }
          })
        );

        this.controlHandlers.push(
          k.onKeyRelease(() => {
            if (
              this.curAnim() !== "idle" &&
              this.curAnim() !== "jump" &&
              this.curAnim() !== "fall" &&
              this.curAnim() !== "attack"
            )
              this.play("idle");
          })
        );
      },

      disableControls() {
        for (const handler of this.controlHandlers) {
          handler.cancel();
        }
      },

      respawnIfOutOfBounds(
        boundValue,
        destinationName,
        previousSceneData = { exitName: null }
      ) {
        k.onUpdate(() => {
          if (this.pos.y > boundValue) {
            k.go(destinationName, previousSceneData);
          }
        });
      },

      setEvents() {
        // when player falls after jumping
        this.onFall(() => {
          this.play("fall");
        });

        // when player falls off a platform
        this.onFallOff(() => {
          this.play("fall");
        });
        this.onGround(() => {
          this.resetJumps();
          this.play("idle");
        });
        this.onHeadbutt(() => {
          this.play("fall");
        });

        this.on("heal", () => {
          state.set(statePropsEnum.playerHp, this.hp());
          healthBar.trigger("update");
        });

        this.on( "getCoin", (amount) =>{
          state.set(statePropsEnum.coin, state.current().coin + amount);
          counter.trigger("update"); 
        })

        this.on("hurt", () => {
          makeBlink(k, this);
          if (this.hp() > 0) {
            state.set(statePropsEnum.playerHp, this.hp());
            healthBar.trigger("update");
            return;
          }

          state.set(statePropsEnum.playerHp, state.current().maxPlayerHp);
          k.play("boom");
          this.play("explode");
        });

        this.onAnimEnd((anim) => {
          if (anim === "explode") {
            window.location.href = "/leader";
          }
        });
      },

      enableDoubleJump() {
        this.numJumps = 2;
      },
    },
  ]);
}
