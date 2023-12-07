import React from "react";

import { Centered } from "meteor/empirica:core";
// //// Avatar stuff //////
// const names = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); //for the players names (we will call them A, B, C etc)
const names = ["Blue", "Green", "Pink", "Yellow"]; // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"]; // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"]; // similar to the color of the avatar

export default class TeamDetails extends React.Component {
  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <img src={player.avatar} />
        </span>
        {/* <span className="name" style={{ color: player.get("nameColor") }}> */}
        <span className="name" style={{ color: player.nameColor }}>
          {player.name}
          {self ? " (You)" : ""}
        </span>
      </div>
    );
  }

  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const player = {
      _id: 0,
      name: names[0],
      nameColor: nameColor[0],
      avatar: `/avatars/jdenticon/${avatarNames[0]}`,
    };

    const otherPlayers = [
      {
        _id: 1,
        name: names[1],
        nameColor: nameColor[1],
        avatar: `/avatars/jdenticon/${avatarNames[1]}`,
      },
      {
        _id: 2,
        name: names[2],
        nameColor: nameColor[2],
        avatar: `/avatars/jdenticon/${avatarNames[2]}`,
      },
    ];
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            团队合作介绍
          </h1>
          <p>
            &emsp;&emsp;在这场游戏中，您将与另外{" "}
            <strong>{treatment.playerCount - 1} 名</strong>队友一起完成任务。{" "}
            <strong>
              在所有的任务中，团队将只提交一份最终的房间分配方案。
            </strong>
          </p>
          <br />
          <div className="social-interactions" style={{ margin: "auto" }}>
            <div className="status">
              <div className="players bp3-card">
                {this.renderPlayer(player, true)}
                {otherPlayers.map((p) => this.renderPlayer(p))}
              </div>
              <div className="total-score bp3-card">
                <h6 className={"bp3-heading"}>总分</h6>

                <h2 className={"bp3-heading"}>{3400}</h2>
              </div>
            </div>
          </div>

          <br />
          <p>
            &emsp;&emsp;<strong>提示：</strong>游戏允许同步和实时操作，
            这意味着当您拖拽某个学生时，那个学生就会被锁定(也就是说，其他队友将无法移动它)，
            <strong>被移动的学生将被标记为您角色的颜色</strong>（您当前颜色为蓝色），直到它被分配到房间里。{" "}
          </p>
          <div className="button1">
            <button
              type="button"
              className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
              onClick={onPrev}
              disabled={!hasPrev}
            >
              上一页
            </button>
            <button
              type="button"
              className="bp3-button bp3-intent-primary"
              onClick={onNext}
              disabled={!hasNext}
            >
              下一页
              {/* <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-icon-align-right" /> */}
              <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
            </button>
          </div>
        </div>
      </Centered>
    );
  }
}
