import React from "react";

import { Centered } from "meteor/empirica:core";
export default class UIOverview extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const imagePath =
      treatment.playerCount > 1
        ? "experiment/groupUIExample.svg"
        : "experiment/indUIExample.svg";
    // 图片可以替换
    // console.log("imagePath", imagePath);

    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            {" "}
            游戏界面说明{" "}
          </h1>
          <p>
            游戏说明介绍就快结束了！请再多花一些时间熟悉一下
            游戏用户界面如下图所示:
          </p>

          <div className="image">
            <img src={imagePath} style={{ border: "2px solid" }} />
          </div>

          <p>
            如果超过10秒时，“满足”按钮还不可点击，请尝试刷新页面。否则，您将要等待时间耗尽，这将会影响您的奖金。
          </p>

          <p>现在您知道游戏的具体内容了吧，准备好做测试！祝君好运！</p>
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
