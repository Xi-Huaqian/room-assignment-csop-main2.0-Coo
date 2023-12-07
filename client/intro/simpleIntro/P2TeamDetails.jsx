import React from "react";

import { Centered } from "meteor/empirica:core";
// //// Avatar stuff //////
// const names = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); //for the players names (we will call them A, B, C etc)
const names = ["Blue", "Green", "Pink", "Yellow"]; // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"]; // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"]; // similar to the color of the avatar

export default class P2TeamDetails extends React.Component {
  state = {
    satisfied: false,
  };

  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <span
            className={`satisfied bp3-tag bp3-round ${
              player.satisfied ? "bp3-intent-success" : "bp3-intent-danger"
            }`}
          >
            <span
              className={`bp3-icon-standard ${
                player.satisfied ? "bp3-icon-tick" : "bp3-icon-cross"
              }`}
            />
          </span>
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

  handleSatisfaction = (satisfied, event) => {
    event.preventDefault();
    this.setState({ satisfied: satisfied });
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const player = {
      _id: 0,
      name: names[0],
      nameColor: nameColor[0],
      avatar: `/avatars/jdenticon/${avatarNames[0]}`,
      satisfied: this.state.satisfied,
    };

    const otherPlayers = [
      {
        _id: 1,
        name: names[1],
        nameColor: nameColor[1],
        avatar: `/avatars/jdenticon/${avatarNames[1]}`,
        satisfied: false,
      },
      {
        _id: 2,
        name: names[2],
        nameColor: nameColor[2],
        avatar: `/avatars/jdenticon/${avatarNames[2]}`,
        satisfied: true,
      },
    ];
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            团队合作介绍
          </h1>
          <div className="consent-con">
            <p>
              &emsp;&emsp;本次实验，您将与另外
              <em style={{ color: "orange" }}>
                <strong> 2 </strong>
              </em>
              名队友一起进行。{" "}
            </p>
            <h5 className="bp3-heading">关于方案提交：</h5>

            <p>
              &emsp;&emsp;<strong className="bp3-heading">强制提交：</strong>
              每轮实验任务都有
              <strong style={{ color: "orange" }}> 时间限制 </strong>和
              <strong style={{ color: "orange" }}> 团队总移动次数限制 </strong>
              ， 每轮
              <strong style={{ color: "red" }}>
                 {" "}{Math.ceil(treatment.stageDuration / 60.0)}{" "}
              </strong>
              分钟结束后或剩余移动次数归
              <strong style={{ color: "red" }}> 0 </strong>后方案会被自动提交；
            </p>

            <p>
              &emsp;&emsp;
              <strong className="bp3-heading">满意提交：</strong>
              <strong style={{ color: "orange" }}>所有成员</strong>
              都对目前的方案
              <strong style={{ color: "orange" }}>满意</strong>，
              则该方案将被提交，可以尝试点击下面的“满意”按钮。
            </p>
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
            <div className="task">
              <div className="board">
                <div className="response">
                  <button
                    type="button"
                    className={`bp3-button bp3-icon-cross bp3-intent-danger bp3-large ${
                      this.state.satisfied ? "bp3-minimal" : ""
                    }`}
                    onClick={this.handleSatisfaction.bind(this, false)}
                  >
                    不满意
                  </button>
                  <button
                    type="button"
                    className={`bp3-button bp3-icon-tick bp3-intent-success bp3-large ${
                      this.state.satisfied ? "" : "bp3-minimal"
                    }`}
                    onClick={this.handleSatisfaction.bind(this, true)}
                  >
                    满意
                  </button>
                </div>
              </div>
            </div>
            <h5 className="bp3-heading">关于同步操作：</h5>
            <p>
              &emsp;&emsp;游戏允许同步操作，即当您拖拽某个学生的过程中，其他队友也可拖拽其他学生，
              <strong>但不允许同时拖拽一个学生</strong>。
            </p>
            <h5 className="bp3-heading">关于行动记录与操作聊天：</h5>
            <p>
              &emsp;&emsp;每轮任务中，会记录并公开所有成员的行动，
              请您在
              <strong style={{ color: "orange" }}>zoom讨论组</strong>
              中与另外两名队友进行沟通讨论；
            </p>
            <p>
              &emsp;&emsp;任务难度会不断升级，<strong style={{ color: "red" }}>积极和队友沟通</strong>才能拿到更高的分数和金币哦~
            </p>
          </div>

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
