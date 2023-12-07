import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class GroupQuiz extends React.Component {
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
    pageNum:0,
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
    console.log("el", el);
    console.log("ev", event);
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

  render() {
    const { hasPrev, onPrev } = this.props;
    const{pageNum}=this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            {" "}
            游戏规则测验{" "}
          </h1>
          <form onSubmit={this.handleSubmit}>
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
              </div>

            </div>
            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="2. 选择关于分数的真实表述:"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.scoreOption}
                  name="scoreOption"
                  required
                >
                 
                  <Radio label="我只会根据我完成的内容来得分" value="single" />
                  <Radio
                    label="我们作为一个团队将只提交一个答案，因此我们都将得到相同的分数。"
                    value="all"
                  />
                </RadioGroup>
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
                    label="B、团队成员根据个人得分占总分的比例分配。"
                    value="B"
                  />
                </RadioGroup>
              </div>
            </div>
            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="number-of-participants">
                5.如果您的团队最终没有分配所有学生的房间(例如，至少有一个学生留在甲板上)，那么您的分数在这项任务将是:
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
                7. 下面哪些房间是101房间的邻居？请选择所有适用的。
              </label>
              <div className="bp3-form-content ">
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_1_101"}
                    label="房间 101"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_1_102"}
                    label="房间 102"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_1_103"}
                    label="房间 103"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_1_104"}
                    label="房间 104"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_1_105"}
                    label="房间 105"
                    onChange={this.handleEnabledChange}
                  />
                </div>
              </div>
            </div>
            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="neighbor-of-room-101">
                8. 下面哪些房间是103房间的邻居？请选择所有适用的。{" "}
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
      </Centered>
    );
  }
}

// import React from "react";

// import { Centered, AlertToaster } from "meteor/empirica:core";

// import { Radio, RadioGroup } from "@blueprintjs/core";

// import { Checkbox } from "@blueprintjs/core";

// export default class GroupQuiz extends React.Component {
//   state = {
//     nParticipants: "",
//     scoreOption: "",
//     idle: "",
//     largeError: "",
//     mc_1_101: false,
//     mc_1_102: false,
//     mc_1_103: false,
//     mc_1_104: false,
//     mc_1_105: false,
//     mc_2_101: false,
//     mc_2_102: false,
//     mc_2_103: false,
//     mc_2_104: false,
//     mc_2_105: false,
//     emptyOption: "",
//     num_players: 0,
//   };

//   componentDidMount() {
//     const { game } = this.props;
//     this.state.num_players = game.treatment.playerCount;
//   }

//   handleChange = (event) => {
//     const el = event.currentTarget;
//     this.setState({ [el.name]: el.value.trim().toLowerCase() });
//   };

//   handleRadioChange = (event) => {
//     const el = event.currentTarget;
//     console.log("el", el);
//     console.log("ev", event);
//     this.setState({ [el.name]: el.value });
//   };

//   handleEnabledChange = (event) => {
//     const el = event.currentTarget;
//     this.setState({ [el.name]: !this.state[el.name] });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();

//     //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
//     if (
//       this.state.nParticipants !== this.state.num_players.toString() ||
//       this.state.scoreOption !== "all" ||
//       this.state.idle !== "100" ||
//       this.state.largeError !== "0" ||
//       this.state.mc_1_101 ||
//       !this.state.mc_1_102 || //only this one is correct
//       this.state.mc_1_103 ||
//       this.state.mc_1_104 ||
//       this.state.mc_1_105 ||
//       this.state.mc_2_101 ||
//       !this.state.mc_2_102 || //this one is correct
//       this.state.mc_2_103 ||
//       !this.state.mc_2_104 || //this one is correct
//       this.state.mc_2_105 ||
//       this.state.emptyOption !== "yes"
//     ) {
//       AlertToaster.show({
//         message:
//           "Sorry, you have one or more mistakes. Please ensure that you answer the questions correctly, or go back to the instructions",
//       });
//     } else {
//       this.props.onNext();
//     }
//   };

//   render() {
//     const { hasPrev, onPrev } = this.props;
//     return (
//       <Centered>
//         <div className="quiz">
//           <h1 className={"bp3-heading"}> Quiz </h1>
//           <form onSubmit={this.handleSubmit}>
//             <div className="bp3-form-group">
//               <label className="bp3-label" htmlFor="number-of-participants">
//                 How many participants will play at the same time, including
//                 yourself?
//               </label>
//               <div className="bp3-form-content">
//                 <input
//                   id="nParticipants"
//                   className="bp3-input"
//                   type="number"
//                   min="0"
//                   max="150"
//                   step="1"
//                   dir="auto"
//                   name="nParticipants"
//                   value={this.state.nParticipants}
//                   onChange={this.handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="bp3-form-group">
//               <div className="bp3-form-content">
//                 <RadioGroup
//                   label="Select the true statement about the score:"
//                   onChange={this.handleRadioChange}
//                   selectedValue={this.state.scoreOption}
//                   name="scoreOption"
//                   required
//                 >
//                   <Radio
//                     label="I will score points only based on the assignments that I make"
//                     value="single"
//                   />
//                   <Radio
//                     label="We will submit only one answer as a team and therefore we will all get the same score."
//                     value="all"
//                   />
//                 </RadioGroup>
//               </div>
//             </div>

//             <div className="bp3-form-group">
//               <div className="bp3-form-content">
//                 <RadioGroup
//                   name="emptyOption"
//                   label="is it ok to have some rooms empty? (the answer is 'Yes')"
//                   onChange={this.handleRadioChange}
//                   selectedValue={this.state.emptyOption}
//                   required
//                 >
//                   <Radio label="Yes!" value="yes" />
//                   <Radio label="No!" value="no" />
//                 </RadioGroup>
//               </div>
//             </div>

//             <div className="bp3-form-group">
//               <label className="bp3-label" htmlFor="number-of-participants">
//                 If your team ended up NOT assigning all students to room (i.e.,
//                 at least one student remained in the deck) then your score in
//                 that task will be:
//               </label>
//               <div className="bp3-form-content">
//                 <input
//                   id="nParticipants"
//                   className="bp3-input"
//                   type="number"
//                   min="-10"
//                   max="10"
//                   step="1"
//                   dir="auto"
//                   name="largeError"
//                   value={this.state.largeError}
//                   onChange={this.handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="bp3-form-group">
//               <label className="bp3-label" htmlFor="number-of-participants">
//                 For each unsatisfied (i.e., violated) constraint, how many
//                 points will be deducted from you?
//               </label>
//               <div className="bp3-form-content">
//                 <input
//                   id="nParticipants"
//                   className="bp3-input"
//                   type="number"
//                   min="0"
//                   max="1000"
//                   step="1"
//                   dir="auto"
//                   name="idle"
//                   value={this.state.idle}
//                   onChange={this.handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="bp3-form-group">
//               <label className="bp3-label" htmlFor="neighbor-of-room-101">
//                 Which of the following rooms is a neighbor of Room 101? Please
//                 select all that apply.
//               </label>
//               <div className="bp3-form-content ">
//                 <div className="bp3-control bp3-checkbox bp3-inline">
//                   <Checkbox
//                     name={"mc_1_101"}
//                     label="Room 101"
//                     onChange={this.handleEnabledChange}
//                   />
//                 </div>
//                 <div className="bp3-control bp3-checkbox bp3-inline">
//                   <Checkbox
//                     name={"mc_1_102"}
//                     label="Room 102"
//                     onChange={this.handleEnabledChange}
//                   />
//                 </div>
//                 <div className="bp3-control bp3-checkbox">
//                   <Checkbox
//                     name={"mc_1_103"}
//                     label="Room 103"
//                     onChange={this.handleEnabledChange}
//                   />
//                 </div>
//                 <div className="bp3-control bp3-checkbox bp3-inline">
//                   <Checkbox
//                     name={"mc_1_104"}
//                     label="Room 104"
//                     onChange={this.handleEnabledChange}
//                   />
//                 </div>
//                 <div className="bp3-control bp3-checkbox bp3-inline">
//                   <Checkbox
//                     name={"mc_1_105"}
//                     label="Room 105"
//                     onChange={this.handleEnabledChange}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="bp3-form-group">
//               <label className="bp3-label" htmlFor="neighbor-of-room-101">
//                 Which of the following rooms is a neighbor of Room 103? Please
//                 select all that apply.{" "}
//               </label>
//               <div className="bp3-form-content ">
//                 <div className="bp3-control bp3-checkbox">
//                   <Checkbox
//                     name={"mc_2_101"}
//                     label="Room 101"
//                     onChange={this.handleEnabledChange}
//                   />
//                 </div>
//                 <div className="bp3-control bp3-checkbox bp3-inline">
//                   <Checkbox
//                     name={"mc_2_102"}
//                     label="Room 102"
//                     onChange={this.handleEnabledChange}
//                   />
//                 </div>
//                 <div className="bp3-control bp3-checkbox bp3-inline">
//                   <Checkbox
//                     name={"mc_2_103"}
//                     label="Room 103"
//                     onChange={this.handleEnabledChange}
//                   />
//                 </div>
//                 <div className="bp3-control bp3-checkbox">
//                   <Checkbox
//                     name={"mc_2_104"}
//                     label="Room 104"
//                     onChange={this.handleEnabledChange}
//                   />
//                 </div>
//                 <div className="bp3-control bp3-checkbox">
//                   <Checkbox
//                     name={"mc_2_105"}
//                     label="Room 105"
//                     onChange={this.handleEnabledChange}
//                   />
//                 </div>
//               </div>
//             </div>

//             <button
//               type="button"
//               className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
//               onClick={onPrev}
//               disabled={!hasPrev}
//             >
//               Back to instructions
//             </button>
//             <button type="submit" className="bp3-button bp3-intent-primary">
//               Submit
//               <span className="bp3-icon-standard bp3-icon-key-enter bp3-align-right" />
//             </button>
//           </form>
//         </div>
//       </Centered>
//     );
//   }
// }
