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

export default class GroupExitSurvey2 extends React.Component {
  static stepName = "ExitSurvey2";
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
        <p>在刚才游戏任务的讨论过程中，请您回答以下问题：</p>
        <form onSubmit={this.handleSubmit}>
          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="question1"
                label="1. 我感到与团队其他成员存在跨时空联系"
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
                label="2. 我感到与团队其他成员同时存在于线上"
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
                label="3. 我感到仿佛置身于面对面讨论现场"
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
                label="4. 我在游戏过程中有社交的感觉"
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
                label="5. 我可以与团队其他成员持续的交流看法"
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
                label="6. 我可以与团队其他成员顺利地交换观点"
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
                label="7. 我的疑问可以得到团队其他成员的回应"
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
                label="8. 团队其他成员给我带来热情的感觉"
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
                label="9. 团队其他成员使我变得敏感"
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
                label="10. 团队其他成员的喜怒一定程度影响到我的情绪"
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
