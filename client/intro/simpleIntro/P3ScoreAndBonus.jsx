import React from "react";

import { Centered } from "meteor/empirica:core";
// //// Avatar stuff //////
// const names = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); //for the players names (we will call them A, B, C etc)
const names = ["Blue", "Green", "Pink", "Yellow"]; // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"]; // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"]; // similar to the color of the avatar

export default class P3ScoreAndBonus extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;

    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            分数和金币计算规则
          </h1>
          <div className="consent-con-score">
            <h5 className="bp3-heading">分数与金币计算：</h5>
            <p>
              &emsp;&emsp;根据每轮
              <strong style={{ color: "orange" }}>游戏分数</strong>
              以及耗费的
              <strong style={{ color: "orange" }}>时长</strong>
              计算，团队成员获得相同的游戏金币（如下图所示）
            </p>
            <div className="image" style={{ textAlign: "center" }}>
              <img
                style={{ width: "100%", height: "auto",border: "3.5px dashed #cdcdcd85" }}
                src="/experiment/分数排名展示截图.png"
              />
            </div>
            {/* <h5 className="bp3-heading">团队总奖金分配：</h5> */}
            {/* 竞合组： */}
            {/* <p>
              &emsp;&emsp;团队总奖金根据个人对团队总分的
              <strong style={{ color: "orange" }}>贡献占比</strong>
              以及<strong style={{ color: "orange" }}>沟通</strong>
              充分程度进行分配
            </p> */}
            {/* 合作组 */}
            {/* <p>&emsp;&emsp;团队总奖金<strong style={{ color: "orange" }}>平均分配</strong>给团队成员。</p> */}
            {/* <p>
              &emsp;&emsp;个人贡献通过后台记录的全部学生被分配房间后调整学生带来的团队总分
              <strong style={{ color: "orange" }}>增加分数</strong>、
              <strong style={{ color: "orange" }}>沟通积极性</strong>
              计算。
            </p> */}
            <hr />
            <h5 className="bp3-heading" style={{ color: "red" }}>注意：请不要划水！！！后台会记录大家的行动情况哦</h5>
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
