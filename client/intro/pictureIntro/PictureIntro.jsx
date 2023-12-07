import React, { Component } from "react";
import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class PictureIntro extends Component {
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
    pictureNum: 13,
    correctNum:0,
    pageNum:0,
    topic1:true,
    topic2:true,
    topic3:true,
    topic4:true,
    topic5:true,
    topic6:true,
    topic7:true,
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

  handleSubmit = (event) => {
    event.preventDefault();

    //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
    if (
      this.state.nParticipants !== this.state.num_players.toString() ||
      this.state.scoreOption !== "all" ||
      this.state.idle !== "100" ||
      this.state.largeError !== "0" ||
      this.state.mc_1_101 ||
      !this.state.mc_1_102 || //only this one is correct
      this.state.mc_1_103 ||
      this.state.mc_1_104 ||
      this.state.mc_1_105 ||
      this.state.mc_2_101 ||
      !this.state.mc_2_102 || //this one is correct
      this.state.mc_2_103 ||
      !this.state.mc_2_104 || //this one is correct
      this.state.mc_2_105 ||
      this.state.emptyOption !== "yes" ||
      this.state.bonusOption !== "B"
    ) {
      AlertToaster.show({
        message:
          "对不起，您有一个或多个错误。请确保正确回答问题，或回到游戏说明仔细阅读",
      });
    } else {
      this.props.onNext();
    }
  };

  setCorrectNum(){
    const{corretNum}=this.state;
    this.setState({corretNum:corretNum+1});
  }

  handleSubmit1 = (event) => {
    event.preventDefault();
    const{corretNum}=this.state;
    this.setState({correctNum:0});
    if(this.state.nParticipants !== this.state.num_players.toString()){
      this.setState({topic1:false});
    }else{
      this.setState({topic1:true});
      this.setCorrectNum;
    }
    if(this.state.scoreOption !== "all"){
      this.setState({topic2:false});
    }else{
      this.setState({topic2:true});
      this.setCorrectNum;
    }
    if(this.state.emptyOption !== "yes"){
      this.setState({topic3:false});
    }else{
      this.setState({topic3:true});
      this.setCorrectNum;
    }
    if(this.state.bonusOption !== "B"){
      this.setState({topic4:false});
    }else{
      this.setState({topic4:true});
      this.setCorrectNum;
    }
    if(this.state.largeError !== "0"){
      this.setState({topic5:false});
    }else{
      this.setState({topic5:true});
      this.setCorrectNum;
    }
    if(this.state.idle !== "100"){
      this.setState({topic6:false});
    }else{
      this.setState({topic6:true});
      this.setCorrectNum;
    }
    if(this.state.mc_2_101 ||
      !this.state.mc_2_102 || //this one is correct
      this.state.mc_2_103 ||
      !this.state.mc_2_104 || //this one is correct
      this.state.mc_2_105){
      this.setState({topic7:false});
    }else{
      this.setState({topic7:true});
      this.setCorrectNum;
    }
    // console.log(this.state.correctNum);
    if(this.state.nParticipants !== this.state.num_players.toString() ||
      this.state.scoreOption !== "all" ||
      this.state.idle !== "100" ||
      this.state.largeError !== "0" ||
      this.state.mc_2_101 ||
      !this.state.mc_2_102 || //this one is correct
      this.state.mc_2_103 ||
      !this.state.mc_2_104 || //this one is correct
      this.state.mc_2_105 ||
      this.state.emptyOption !== "yes" ||
      this.state.bonusOption !== "B"){
        AlertToaster.show({
          message:
            "对不起，您有一个或多个错误。请确保正确回答问题，或回到游戏说明仔细阅读",
        });
    }else{
      this.props.onNext();
    }
  };

  add = () => {
    const { num } = this.state;
    this.setState({ num: num + 1 });
  };

  toGame = () => {
    this.setState({ num: 0 });
  };
  toTeam = () => {
    this.setState({ num: 5 });
  };

  toBonus = () => {
    this.setState({ num: 12 });
  };
  toQuiz = () => {
    this.setState({ num: 13 });
  };

  reduce = () => {
    const { num } = this.state;
    this.setState({ num: num - 1 });
  };

  toTips1 = () => {
    this.setState({ num: 5 });
  };
  toTips2 = () => {
    this.setState({ num: 8 });
  };
  toTips3 = () => {
    this.setState({ num: 0});
  };
  toTips4 = () => {
    this.setState({ num: 12 });
  };
  toTips5 = () => {
    this.setState({ num: 1 });
  };
  toTips6 = () => {
    this.setState({ num: 3 });
  };
  toTips7 = () => {
    this.setState({ num: 3 });
  };


  last(num, hasNext, onNext) {
    const { pictureNum } = this.state;
    if (num >= pictureNum - 1) {
      return (
        <button
          type="button"
          className="bp3-button bp3-intent-primary"
          onClick={this.toQuiz}
          // disabled={!hasNext}
        >
          测 试
          <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="bp3-button bp3-intent-primary"
          onClick={this.add}
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

  submit(num, hasPrev, onPrev) {
    const { pictureNum } = this.state;
    return (
      <div>
        <button
          type="button"
          className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
          onClick={this.reduce}
          // disabled={!hasPrev}
        >
          返回
        </button>
        <button type="submit" className="bp3-button bp3-intent-primary">
          提交
          <span className="bp3-icon-standard bp3-icon-key-enter bp3-align-right" />
        </button>
      </div>
    );
  }

  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const imagePath = [
      "experiment/content/img (1).JPG",
      "experiment/content/img (2).JPG",
      "experiment/content/img (3).JPG",
      "experiment/content/img (4).JPG",
      "experiment/content/img (5).JPG",
      "experiment/content/img (6).JPG",
      "experiment/content/img (7).JPG",
      "experiment/content/img (8).JPG",
      "experiment/content/img (9).JPG",
      "experiment/content/img (10).JPG",
      "experiment/content/img (11).JPG",
      "experiment/content/img (12).JPG",
      "experiment/content/img (13).JPG",
    ];
    // const imagePathTeam = [
    //   "experiment/content/img (6).JPG",
    //   "experiment/content/img (7).JPG",
    //   "experiment/content/img (8).JPG",
    //   "experiment/content/img (9).JPG",
    //   "experiment/content/img (10).JPG",
    //   "experiment/content/img (11).JPG",
    //   "experiment/content/img (12).JPG",
    // ];
    // const imagePathBonus = [
    //   "experiment/content/img (13).JPG",
    // ];
    const { num,topic1,topic2,topic3,topic4,topic5,topic6,topic7,correctNum } = this.state;
    // console.log("imagePath", imagePath[0]);

    return (
      <div>
        {num < 13 ? (
          <div className="instructions">
            <div className="navbar">
              <div className="forbutton">
                <button
                  onClick={this.toGame}
                  style={{ backgroundColor: num < 5 ? "#e4db5a" : "#81a0bd" }}
                >
                  游戏介绍
                </button>
                <button
                  onClick={this.toTeam}
                  style={{
                    backgroundColor:
                      num >= 5 && num < 12 ? "#e4db5a" : "#81a0bd",
                  }}
                >
                  团队规则
                </button>
                <button
                  onClick={this.toBonus}
                  style={{
                    backgroundColor: num === 12 ? "#e4db5a" : "#81a0bd",
                  }}
                >
                  奖金详情
                </button>
                {/* <button
                  onClick={this.toQuiz}
                  style={{
                    backgroundColor: num > 12 ? "#e4db5a" : "#81a0bd",
                  }}
                >
                  问卷测试
                </button> */}
              </div>
            </div>

            <div className="content">
              {/* <h2 className={"bp3-heading"} style={{ textAlign: "center" }}>
                {" "}
                游戏介绍{" "}
              </h2> */}
              <div className="image" style={{ textAlign: "center" }}>
                <img src={imagePath[num]} />
              </div>
              <div className="button1">
                {this.before(num, hasPrev, onPrev)}
                {this.last(num, hasNext, onNext)}
              </div>
            </div>
          </div>
        ) : (
          <Centered>
            <div className="quiz">
              <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
                {" "}
                游戏规则测验{" "}
              </h1>
              <form onSubmit={this.handleSubmit1}>
                <div className="bp3-form-group">
                  <label className="bp3-label" htmlFor="number-of-participants">
                    1. 包括自己一共多少人同时参加吗?
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
                    {topic1?"":<button style={{width:"70px"}} onClick={this.toTips1}>错误❌</button>}
                  </div>
                </div>
                <div className="bp3-form-group">
                  <div className="bp3-form-content">
                    <RadioGroup
                      label="2. 关于团队分数的真实表述:"
                      onChange={this.handleRadioChange}
                      selectedValue={this.state.scoreOption}
                      name="scoreOption"
                      required
                    >
                      <Radio
                        label="我只会根据我完成的内容来得分"
                        value="single"
                      />
                      <Radio
                        label="我们作为一个团队将只提交一个答案，因此我们都将得到相同的分数。"
                        value="all"
                      />
                    </RadioGroup>
                    {topic2?"":<button style={{width:"70px",float:'left'}} onClick={this.toTips2}>错误❌</button>}
                  </div>
                </div>
                <div className="bp3-form-group">
                  <div className="bp3-form-content">
                    <RadioGroup
                      name="emptyOption"
                      label="3. 有些房间空着可以吗?"
                      onChange={this.handleRadioChange}
                      selectedValue={this.state.emptyOption}
                      required
                    >
                      <Radio label="是" value="yes" />
                      <Radio label="否" value="no" />
                    </RadioGroup>
                    {topic3?"":<button style={{width:"70px",float:'left'}} onClick={this.toTips3}>错误❌</button>}
                  </div>
                </div>
                <div className="bp3-form-group">
                  <div className="bp3-form-content">
                    <RadioGroup
                      name="bonusOption"
                      label="4. 本次游戏中，团队报酬的分配形式是？"
                      onChange={this.handleRadioChange}
                      selectedValue={this.state.bonusOption}
                      required
                    >
                      <Radio label="A、团队成员间平均分配" value="A" />
                      <Radio
                        label="B、团队成员根据个人贡献占总分的比例分配。"
                        value="B"
                      />
                    </RadioGroup>
                    {topic4?"":<button style={{width:"70px",float:'left'}} onClick={this.toTips4}>错误❌</button>}
                  </div>
                </div>
                <div className="bp3-form-group">
                  <label className="bp3-label" htmlFor="number-of-participants">
                    5.如果您的团队最终没有分配所有学生的房间(例如，至少有一个学生留在甲板上)，那么您的分数在这项任务将是:
                    {topic5?"":<button style={{width:"70px"}} onClick={this.toTips5}>错误❌</button>}
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
                    {topic6?"":<button style={{width:"70px"}} onClick={this.toTips6}>错误❌</button>}
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
                    {topic7?"":<button style={{width:"70px"}} onClick={this.toTips7}>错误❌</button>}
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
                  {/* {this.before(num, hasPrev, onPrev)} */}
                  {this.submit(num, hasNext, onNext)}
                </div>
              </form>
            </div>
          </Centered>
        )}
      </div>
    );
  }
}
