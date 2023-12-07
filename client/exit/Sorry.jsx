import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Sorry extends React.Component {
  static stepName = "很抱歉！！！";

  render() {
    const { player, hasNext, onSubmit } = this.props;
    let msg;
    switch (player.exitStatus) {
      case "gameFull":
        msg = "所有你能参加的游戏都已经满员了。";
        break;
      case "gameLobbyTimedOut":
        msg = "游戏开始时没有足够的玩家。";
        break;
      // case "playerLobbyTimedOut":
      //   msg = "???";
      //   break;
      case "playerEndedLobbyWait":
        msg = "你已决定停止等待，我们很抱歉让您等了太久。  ";
        break;
      default:
        msg = "游戏页面出现故障！";
        break;
    }

    return (
      <Centered>
        <div className="score">
          <h1>{msg}</h1>

          <p>目前您暂时玩不了该游戏</p>

          {/*{player.exitStatus !== "gameFull" ? (*/}

          {/*<p>*/}
          {/*Please return the HIT now so our platform does register your MTurk.*/}
          {/*Please come back for one of the next batches of Part 1. We will submit new*/}
          {/*batches on Monday the 6th of August and Tuesday the 7th of August*/}
          {/*(batches of 100 games every hour starting at 2PM ET until 5PM).*/}
          {/*</p>*/}
{/* 
          {player.exitStatus === "gameLobbyTimedOut" ? (
            <p>
              请提交 <em>{player._id}</em> 作为调查代码，以便
              今天收到￥5的基本报酬。我们还会添加 经本公司批准的出场奖金为￥1。
            </p>
          ) : null}

          {player.exitStatus === "gameFull" ? (
            <p>
              请提交 <em>FZgameFullCSOP213093</em> 作为调查代码
              以获得￥1的出场奖金。
            </p>
          ) : null} */}

          {/*) : (*/}
          {/*<p>*/}
          {/*Please click on: <strong>Reset current session</strong> from the*/}
          {/*top right side of the page (if it appears for you) to see if there*/}
          {/*are other games that you could join now. Note you will need to go*/}
          {/*over the instructions and quiz again (they might be different for*/}
          {/*different games). Otherwise, Please return the HIT now so our*/}
          {/*platform does not register your MTurk ID as someone who already*/}
          {/*participated.*/}
          {/*</p>*/}

          <p>
            <strong>请在群里联系工作人员，我们会尽快为您修复相关问题。</strong>{" "}
            {/*We will send an email notification once the next  HIT is scheduled.*/}
          </p>

          {/*This is not really needed .. all of these people failed to start the game .. if we allow them to submit, then their data will be deleted, we don't want that*/}
          <p>
            {hasNext ? (
              <button
                className="pt-button pt-intent-primary"
                type="button"
                onClick={() => onSubmit()}
              >
                完成
              </button>
            ) : (
              ""
            )}
          </p>
        </div>
      </Centered>
    );
  }
}
