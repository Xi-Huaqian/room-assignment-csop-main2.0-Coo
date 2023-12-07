import React from "react";

import {Centered} from "meteor/empirica:core";

export default class Thanks extends React.Component {
  static stepName = "Thanks";
  
  render() {
    const { player, game } = this.props;
    return (
      <Centered>
        <div className="game finished">
          <div className="pt-non-ideal-state">
            <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
              <span className="pt-icon pt-icon-thumbs-up" />
            </div>
            <h4 className="pt-non-ideal-state-title">任务完成！！！</h4>
            <hr />
            <h4 className="pt-non-ideal-state-title">
              提交代码: {player._id}
            </h4>
            <h4 className="pt-non-ideal-state-title">
              奖金: ￥{player.get("newBonus")}
            </h4>
            <hr />
            <div className="pt-non-ideal-state-description">
              感谢您的参与！！！
            </div>
          </div>
        </div>
      </Centered>
    );
  }
}
