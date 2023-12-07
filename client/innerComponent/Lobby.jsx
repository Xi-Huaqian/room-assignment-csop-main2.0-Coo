import React from "react";

import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default class Lobby extends React.Component {
  render() {
    const { player, gameLobby, stage } = this.props;
    return (
      <div className="game-waitting">
        <div className="animation">
          <div className="loader">
            <div class="lt">
              <div></div>
            </div>
            <div class="lb">
              <div></div>
            </div>
            <div class="rt">
              <div></div>
            </div>
            <div class="rb">
              <div></div>
            </div>
          </div>
        </div>

        <div className="text">
          <p>
            请您耐心等待，当前等待人数：
            <strong>
              {gameLobby.readyCount}/{gameLobby.treatment.playerCount}
            </strong>
          </p>
          <p>
            每间隔1分钟请<strong>刷新页面</strong>.
          </p>
        </div>
      </div>
      // <div className="game waiting">

      //   <NonIdealState
      //     // icon={IconNames.AUTOMATIC_UPDATES}
      //     title="请等待服务端的响应..."
      //     description={
      //       <>
      //         请您耐心等待，当前等待人数：
      //         <strong>
      //           {gameLobby.readyCount}/{gameLobby.treatment.playerCount}
      //         </strong>
      //         , 每间隔1分钟请<strong>刷新页面</strong>.
      //       </>
      //     }
      //   />
      //   {/* <ChatLog messages={messages} stage={stage} player={player} /> */}
      // </div>
    );
  }
}
