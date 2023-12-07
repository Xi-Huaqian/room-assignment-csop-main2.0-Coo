import React from "react";

import { Centered } from "meteor/empirica:core";
export default class RoomArrangements extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            {" "}
            房间安排说明
          </h1>
          <p>
            &emsp;&emsp;房间的布置可能由于房间的数量、学生的数量、屏幕/浏览器的大小和分辨率等原因，在屏幕上“看起来”不同。
          </p>

          <div className="image">
            <img src="/experiment/instruction-room-arrangements.svg" />
          </div>

          <p>
            &emsp;&emsp;因此，{" "}
            <strong>
              无论房间如何展示，在处理任务中的约束条件时，
              您只需要考虑这些房间上的数字
            </strong>
            。{""}其中，
            <strong>“邻居”</strong>
            被定义为拥有连续数字的房间。例如，不管您在屏幕上看到的房间排列方式如何，
            102房间的邻居是101房间和103房间，而101房间的邻居只有102房间。
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
