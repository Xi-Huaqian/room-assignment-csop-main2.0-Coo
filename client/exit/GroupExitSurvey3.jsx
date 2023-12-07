import React from "react";

import { Centered } from "meteor/empirica:core";

import {
  Button,
  Classes,
  FormGroup,
  RadioGroup,
  TextArea,
  Intent,
  Radio,
} from "@blueprintjs/core";

export default class GroupExitSurvey3 extends React.Component {
  static stepName = "ExitSurvey3";
  state = {
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
  };

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  exitMessage = (player, game) => {
    return (
      <div>
        {" "}
        <h1 style={{ textAlign: "center" }}> 游戏结束问卷调查 </h1>
        <br />
        <h3>
          请提交以下代码领取奖金: <em>{player._id}</em>.
        </h3>
        <p>
          你们团队的最终{" "}
          <strong>
            <em>得分是 {player.get("cumulativeScore") || 0}</em>
            {/* <em>得分是 {player.get("moveInforScore") || 0}</em> */}
          </strong>{" "}
          您个人综合表现的{" "}
          <strong>
            <em>得分是 {player.get("finalScore") || 0}</em>
          </strong>{" "}
        </p>
        <p>
          最终可以获得的{" "}
          <strong>
            <em>奖金是 ￥{player.get("newBonus") || 0}</em>
          </strong>{" "}
        </p>
      </div>
    );
  };

  exitForm = () => {
    const {
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
      question9,
      question10,
    } = this.state;

    return (
      <div>
        {" "}
        <p>请您根据游戏过程中的真实感受回答以下问题：</p>
        <form onSubmit={this.handleSubmit}>
          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question1"
                label="1. 我们团队是“一荣俱荣，一损俱损”"
                onChange={this.handleChange}
                selectedValue={question1}
              >
                <Radio
                  label="非常不符合"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不太符合"
                  value="agree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不确定"
                  value="neutral"
                  className={"pt-inline"}
                />
                <Radio
                  label="比较符合"
                  value="disagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="非常符合"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question2"
                label="2. 团队每个成员都希望其他成员获得成功"
                onChange={this.handleChange}
                selectedValue={question2}
              >
                <Radio
                  label="非常不符合"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不太符合"
                  value="agree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不确定"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="比较符合"
                  value="disagree"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常符合"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question3"
                label="3. 我们团队成员在团队合作时采取融洽的态度"
                onChange={this.handleChange}
                selectedValue={question3}
              >
                <Radio
                  label="非常不符合"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不太符合"
                  value="agree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不确定"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="比较符合"
                  value="disagree"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常符合"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question4"
                label="4. 我们团队合作顺利"
                onChange={this.handleChange}
                selectedValue={question4}
              >
                <Radio
                  label="非常不符合"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不太符合"
                  value="agree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不确定"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="比较符合"
                  value="disagree"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常符合"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question5"
                label="5. 在团队合作过程中，我们通常寻找有利于团队整体的解决办法"
                onChange={this.handleChange}
                selectedValue={question5}
              >
                <Radio
                  label="非常不符合"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不太符合"
                  value="agree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不确定"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="比较符合"
                  value="disagree"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常符合"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question6"
                label="6. 我们的团队成员以有利于自身利益而非其他团队成员利益的方式安排事情。"
                onChange={this.handleChange}
                selectedValue={question6}
              >
                <Radio
                  label="非常不符合"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不太符合"
                  value="agree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不确定"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="比较符合"
                  value="disagree"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常符合"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question7"
                label="7. 我们团队成员之间有一种“输-赢”关系"
                onChange={this.handleChange}
                selectedValue={question7}
              >
                <Radio
                  label="非常不符合"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不太符合"
                  value="agree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不确定"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="比较符合"
                  value="disagree"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常符合"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question8"
                label="8. 我们的团队成员喜欢表现出他们优于其他成员"
                onChange={this.handleChange}
                selectedValue={question8}
              >
                 <Radio
                  label="非常不符合"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不太符合"
                  value="agree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不确定"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="比较符合"
                  value="disagree"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常符合"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question9"
                label="9. 我们团队成员各自的工作态度合不来"
                onChange={this.handleChange}
                selectedValue={question9}
              >
                <Radio
                  label="非常不符合"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不太符合"
                  value="agree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不确定"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="比较符合"
                  value="disagree"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常符合"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question10"
                label="10. 我们团队成员会优先完成自己的任务，其次才是其他成员的"
                onChange={this.handleChange}
                selectedValue={question10}
              >
                <Radio
                  label="非常不符合"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不太符合"
                  value="agree"
                  className={"pt-inline"}
                />
                <Radio
                  label="不确定"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="比较符合"
                  value="disagree"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常符合"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <button type="submit" className="pt-button pt-intent-primary">
            提交
            <span className="pt-icon-standard pt-icon-key-enter pt-align-right" />
          </button>
        </form>{" "}
      </div>
    );
  };

  componentWillMount() {}

  render() {
    const { player, game } = this.props;
    return (
      <Centered>
        <div className="exit-survey">
          {this.exitMessage(player, game)}
          <hr />
          {this.exitForm()}
        </div>
      </Centered>
    );
  }
}
