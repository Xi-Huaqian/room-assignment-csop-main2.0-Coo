import React, { Component } from "react";
import { Centered } from "meteor/empirica:core";
export default class PictureGoTeam extends Component {
  state = { num: 0, pictureNum:7};

  add = () => {
    const { num } = this.state;
    this.setState({ num: num + 1 });
  };

  reduce = () => {
    const { num } = this.state;
    this.setState({ num: num - 1 });
  };

  last(num, hasNext, onNext) {
    const { pictureNum } = this.state;
    if (num >= (pictureNum-1)) {
      return (
        <button
          type="button"
          className="bp3-button bp3-intent-primary"
          onClick={onNext}
          disabled={!hasNext}
        >
          下一页
          <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="bp3-button bp3-intent-primary"
          onClick={this.add}
          disabled={!hasNext}
        >
          下一页
          <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
        </button>
      );
    }
  }

  before(num, hasPrev, onPrev) {
    const { pictureNum } = this.state;
    if (num <= 0) {
      return (
        <button
          type="button"
          className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
          onClick={onPrev}
          disabled={!hasPrev}
        >
          上一页
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
          onClick={this.reduce}
        >
          上一页
        </button>
      );
    }
  }
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const imagePath = [
      "experiment/content/img (6).JPG",
      "experiment/content/img (7).JPG",
      "experiment/content/img (8).JPG",
      "experiment/content/img (9).JPG",
      "experiment/content/img (10).JPG",
      "experiment/content/img (11).JPG",
      "experiment/content/img (12).JPG",
    ];
    const { num } = this.state;
    // console.log("imagePath", imagePath[0]);

    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            {" "}
            团队合作介绍{" "}
          </h1>

          <div className="image" style={{ textAlign: "center" }}>
            <img
              src={imagePath[num]}
              style={{ border: "1px solid", borderColor: "#585858", borderRadius:"25px", maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="button1">
            {this.before(num, hasPrev, onPrev)}
            {this.last(num, hasNext, onNext)}
          </div>
        </div>
      </Centered>
    );
  }
}
