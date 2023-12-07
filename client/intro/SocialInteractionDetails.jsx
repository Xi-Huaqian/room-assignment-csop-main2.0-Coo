import React from "react";

import { Centered } from "meteor/empirica:core";
// //// Avatar stuff //////
// const names = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); //for the players names (we will call them A, B, C etc)
const names = ["Blue", "Green", "Pink", "Yellow"]; // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"]; // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"]; // similar to the color of the avatar

export default class SocialInteractionDetails extends React.Component {
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
            {" "}
            事件日志和游戏聊天
          </h1>
          <p>
            &emsp;&emsp;在每一项任务中，我们会记录下您和您队友的每一个行动，这个事件日志也会在页面中显示，
            以帮助您跟踪所有到目前为止已经发生的行动。
            同时，您也可以在游戏中与您的队友交流聊天。
            这个聊天室是公开的，所以无论您写什么都会显示出来给其余
            {treatment.playerCount - 1}名队友。每轮游戏任务的时间限制在
            <strong> {Math.ceil(treatment.stageDuration / 60.0)} 分钟</strong>，
            时间结束就自动提交方案并开始下一轮游戏。
          </p>

          <p>
            &emsp;&emsp;此外，您总是可以在计时器结束前表明您是否对答案满意（注:角色上的勾号代表该角色对目前方案表示满意）。
            您可以点击下面例子中的“满意”按钮，看看会发生什么。
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
          <p>
            &emsp;&emsp;如果所有团队成员在计时前都对答案满意，答案将被提交，您的团队将继续下一个任务。
            如果无法点击“满意”按钮,请在10秒钟以后刷新页面。
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
              <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
            </button>
          </div>
        </div>
      </Centered>
    );
  }
}
