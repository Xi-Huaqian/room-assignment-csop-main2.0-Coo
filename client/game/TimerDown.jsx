import React from "react";

import { StageTimeWrapper } from "meteor/empirica:core";
import TimerDown from "./TimerDown.jsx";

// 倒计时
class timer extends React.Component {
  render() {
    const { remainingSeconds } = this.props;
    const minutes = ("0" + Math.floor(remainingSeconds / 60)).slice(-2);
    const seconds = ("0" + (remainingSeconds - minutes * 60)).slice(-2);

    const classes = ["timer"];
    if (remainingSeconds <= 5) {
      classes.push("lessThan5");
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10");
    }

    return (
      <div className={classes.join(" ")}>
        <h5 className='bp3-heading'>计时器</h5>
        <span className="seconds">{minutes}:{seconds}</span>
      </div>
    );
  }
}

export default (TimerDown = StageTimeWrapper(timer));
