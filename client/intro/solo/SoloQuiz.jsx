import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class SoloQuiz extends React.Component {
  state = {
    nParticipants: "",
    scoreOption: "",
    idle: "",
    largeError: "",
    mc_1_101: false,
    mc_1_102: false,
    mc_1_103: false,
    mc_1_104: false,
    mc_1_105: false,
    mc_2_101: false,
    mc_2_102: false,
    mc_2_103: false,
    mc_2_104: false,
    mc_2_105: false,
    emptyOption: "",
    bonusOption: "",
    num_players: 0,
    num: 0,
    correctNum: 0,
    pageNum: 0,
    topic1: true,
    topic2: true,
    topic3: true,
    topic4: true,
    topic5: true,
    topic6: true,
    topic7: true,
  };

  componentDidMount() {
    const { game } = this.props;
    this.state.num_players = game.treatment.playerCount;
  }

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleRadioChange = (event) => {
    const el = event.currentTarget;
    // console.log("el", el);
    // console.log("ev", event);
    this.setState({ [el.name]: el.value });
  };

  handleEnabledChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: !this.state[el.name] });
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
  //   if (
  //     this.state.nParticipants !== this.state.num_players.toString() ||
  //     this.state.scoreOption !== "all" ||
  //     this.state.idle !== "100" ||
  //     this.state.largeError !== "0" ||
  //     this.state.mc_1_101 ||
  //     !this.state.mc_1_102 || //only this one is correct
  //     this.state.mc_1_103 ||
  //     this.state.mc_1_104 ||
  //     this.state.mc_1_105 ||
  //     this.state.mc_2_101 ||
  //     !this.state.mc_2_102 || //this one is correct
  //     this.state.mc_2_103 ||
  //     !this.state.mc_2_104 || //this one is correct
  //     this.state.mc_2_105 ||
  //     this.state.emptyOption !== "yes" ||
  //     this.state.bonusOption !== "B"
  //   ) {
  //     AlertToaster.show({
  //       message:
  //         "对不起，您有一个或多个错误。请确保正确回答问题，或回到游戏说明仔细阅读",
  //     });
  //   } else {
  //     this.props.onNext();
  //   }
  // };

  handleSubmit1 = (event) => {
    event.preventDefault();
    const { corretNum } = this.state;
    this.setState({ correctNum: 0 });
    if (this.state.nParticipants !== this.state.num_players.toString()) {
      this.setState({ topic1: false });
    } else {
      this.setState({ topic1: true });
      this.setCorrectNum;
    }
    if (this.state.scoreOption !== "all") {
      this.setState({ topic2: false });
    } else {
      this.setState({ topic2: true });
      this.setCorrectNum;
    }
    if (this.state.emptyOption !== "yes") {
      this.setState({ topic3: false });
    } else {
      this.setState({ topic3: true });
      this.setCorrectNum;
    }
    if (this.state.bonusOption !== "A") {
      this.setState({ topic4: false });
    } else {
      this.setState({ topic4: true });
      this.setCorrectNum;
    }
    if (this.state.largeError !== "0") {
      this.setState({ topic5: false });
    } else {
      this.setState({ topic5: true });
      this.setCorrectNum;
    }
    if (this.state.idle !== "100") {
      this.setState({ topic6: false });
    } else {
      this.setState({ topic6: true });
      this.setCorrectNum;
    }
    if (
      this.state.mc_2_101 ||
      !this.state.mc_2_102 || //this one is correct
      this.state.mc_2_103 ||
      !this.state.mc_2_104 || //this one is correct
      this.state.mc_2_105
    ) {
      this.setState({ topic7: false });
    } else {
      this.setState({ topic7: true });
      this.setCorrectNum;
    }
    // console.log(this.state.correctNum);
    if (
      this.state.nParticipants !== this.state.num_players.toString() ||
      this.state.scoreOption !== "all" ||
      this.state.idle !== "100" ||
      this.state.largeError !== "0" ||
      this.state.mc_2_101 ||
      !this.state.mc_2_102 || //this one is correct
      this.state.mc_2_103 ||
      !this.state.mc_2_104 || //this one is correct
      this.state.mc_2_105 ||
      this.state.emptyOption !== "yes" ||
      this.state.bonusOption !== "A"
    ) {
      // alert.apply("对不起，您有一个或多个错误。请确保正确回答问题，或回到游戏说明仔细阅读");
      AlertToaster.show({
        message:
          "对不起，您有一个或多个错误。请确保正确回答问题，或回到游戏说明仔细阅读",
      });
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, onPrev } = this.props;
    const {
      num,
      topic1,
      topic2,
      topic3,
      topic4,
      topic5,
      topic6,
      topic7,
      correctNum,
    } = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            {" "}
            游戏规则测验{" "}
          </h1>
          <div className="consent-con-quiz">
            <form onSubmit={this.handleSubmit1}>
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="number-of-participants">
                  1. 包括自己一共多少人同时参加吗?
                  {topic1 ? "" : <strong>&emsp;错误❌</strong>}
                </label>
                <div className="bp3-form-content">
                  <input
                    id="nParticipants"
                    className="bp3-input"
                    type="number"
                    min="0"
                    max="150"
                    step="1"
                    dir="auto"
                    name="nParticipants"
                    value={this.state.nParticipants}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="bp3-form-group">
                <div className="bp3-form-content">
                  <RadioGroup
                    name="emptyOption"
                    label="2. 有些房间空着可以吗?"
                    onChange={this.handleRadioChange}
                    selectedValue={this.state.emptyOption}
                    required
                  >
                    <Radio label="是" value="yes" />
                    <Radio label="否" value="no" />
                  </RadioGroup>
                  {topic3 ? (
                    ""
                  ) : (
                    <strong style={{ float: "left" }}>错误❌</strong>
                  )}
                </div>
              </div>
              <div className="bp3-form-group">
                <div className="bp3-form-content">
                  <RadioGroup
                    label="3. 团队总报酬的计算"
                    onChange={this.handleRadioChange}
                    selectedValue={this.state.scoreOption}
                    name="scoreOption"
                    required
                  >
                    <Radio label="只根据我的个人表现计算" value="single" />
                    <Radio
                      label="所有成员只提交一个方案，根据所有成员的表现计算"
                      value="all"
                    />
                  </RadioGroup>
                  {topic2 ? (
                    ""
                  ) : (
                    <strong style={{ float: "left" }}>错误❌</strong>
                  )}
                </div>
              </div>
              <div className="bp3-form-group">
                <div className="bp3-form-content">
                  <RadioGroup
                    name="bonusOption"
                    label="4. 个人报酬的计算？"
                    onChange={this.handleRadioChange}
                    selectedValue={this.state.bonusOption}
                    required
                  >
                    <Radio label="A、根据游戏得分和游戏时长计算，每个人获得相同给的金币数量" value="A" />
                    <Radio
                      label="B、根据游戏得分和游戏市场计算，个人金币各不相同，取决于对团队分数的贡献程度。"
                      value="B"
                    />
                  </RadioGroup>
                  {topic4 ? (
                    ""
                  ) : (
                    <strong style={{ float: "left" }}>错误❌</strong>
                  )}
                </div>
              </div>
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="number-of-participants">
                  5.如果您的团队最终没有分配所有学生的房间(例如，至少有一个学生留在甲板上)，那么您的分数在这项任务将是:
                  {topic5 ? "" : <strong>&emsp;错误❌</strong>}
                </label>
                <div className="bp3-form-content">
                  <input
                    id="nParticipants"
                    className="bp3-input"
                    type="number"
                    min="-10"
                    max="10"
                    step="1"
                    dir="auto"
                    name="largeError"
                    value={this.state.largeError}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="number-of-participants">
                  6. 对于每个未满足的(即违反的)约束，将从团队中扣除多少分数?
                  {topic6 ? "" : <strong>&emsp;错误❌</strong>}
                </label>
                <div className="bp3-form-content">
                  <input
                    id="nParticipants"
                    className="bp3-input"
                    type="number"
                    min="0"
                    max="1000"
                    step="1"
                    dir="auto"
                    name="idle"
                    value={this.state.idle}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="neighbor-of-room-101">
                  7. 下面哪些房间是103房间的邻居？请选择所有适用的。{" "}
                  {topic7 ? "" : <strong>&emsp;错误❌</strong>}
                </label>
                <div className="bp3-form-content ">
                  <div className="bp3-control bp3-checkbox bp3-inline">
                    <Checkbox
                      name={"mc_2_101"}
                      label="房间 101"
                      onChange={this.handleEnabledChange}
                    />
                  </div>
                  <div className="bp3-control bp3-checkbox bp3-inline">
                    <Checkbox
                      name={"mc_2_102"}
                      label="房间 102"
                      onChange={this.handleEnabledChange}
                    />
                  </div>
                  <div className="bp3-control bp3-checkbox bp3-inline">
                    <Checkbox
                      name={"mc_2_103"}
                      label="房间 103"
                      onChange={this.handleEnabledChange}
                    />
                  </div>
                  <div className="bp3-control bp3-checkbox bp3-inline">
                    <Checkbox
                      name={"mc_2_104"}
                      label="房间 104"
                      onChange={this.handleEnabledChange}
                    />
                  </div>
                  <div className="bp3-control bp3-checkbox bp3-inline">
                    <Checkbox
                      name={"mc_2_105"}
                      label="房间 105"
                      onChange={this.handleEnabledChange}
                    />
                  </div>
                </div>
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
                <button type="submit" className="bp3-button bp3-intent-primary">
                  提交
                  <span className="bp3-icon-standard bp3-icon-key-enter bp3-align-right" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </Centered>
    );
  }
}
