import React from "react";

import { StageTimeWrapper } from "meteor/empirica:core";
import TimerUp from "./TimerUp.jsx";

//正计时
class timer extends React.Component {
  state = {
    minutes: 0,
    seconds: 0,
  };
  //组件挂载完毕之后调用
  componentDidMount() {
    this.timerID = setInterval(() => {
      let { minutes, seconds } = this.state;
      seconds += 1;
      if (seconds > 59) {
        seconds = 0;
        minutes += 1;
      }
      this.setState({ minutes, seconds });
    }, 1000);
  }
  //组件将要卸载的时候调用
  componentWillUnmount() {
    //清除定时器
    clearInterval(this.timerID);
  }
  render() {
    const { remainingSeconds, game } = this.props;
    let { minutes, seconds } = this.state;
    minutes = (
      "" + Math.floor((game.treatment.stageDuration - remainingSeconds) / 60)
    ).slice(-2);
    seconds = (
      "" +
      (game.treatment.stageDuration - remainingSeconds - minutes * 60)
    ).slice(-2);

    const classes = ["timer"];
    const { gameTime } = this.props;

    if (gameTime <= 5) {
      classes.push("lessThan5");
      alert("您所剩的时间还有5秒");
    } else if (gameTime <= 10) {
      classes.push("lessThan10");
      alert("您所剩的时间还有10秒");
    }
    return (
      <div className={classes.join(" ")}>
        <h5 className="bp3-heading">计时器</h5>
        <span className="seconds">
          {/* //Math.floors是向下取整 */}
          {Math.floor(minutes / 10) === 0 ? "0" + minutes : minutes}:
          {Math.floor(seconds / 10) === 0 ? "0" + seconds : seconds}
        </span>
      </div>
    );
  }
}

export default TimerUp = StageTimeWrapper(timer);

//倒计时
// class timer extends React.Component {
//   render() {
//     const { remainingSeconds } = this.props;
//     const minutes = ("0" + Math.floor(remainingSeconds / 60)).slice(-2);
//     const seconds = ("0" + (remainingSeconds - minutes * 60)).slice(-2);

//     const classes = ["timer"];
//     if (remainingSeconds <= 5) {
//       classes.push("lessThan5");
//     } else if (remainingSeconds <= 10) {
//       classes.push("lessThan10");
//     }

//     return (
//       <div className={classes.join(" ")}>
//         <h5 className='bp3-heading'>计时器</h5>
//         <span className="seconds">{minutes}:{seconds}</span>
//       </div>
//     );
//   }
// }

// export default (Timer = StageTimeWrapper(timer));
