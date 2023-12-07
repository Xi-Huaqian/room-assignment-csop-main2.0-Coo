import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Checkbox } from "@blueprintjs/core";

export default class IndividualQuiz extends React.Component {
  state = {
    violatedConstraints: "",
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
  };

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleEnabledChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: !this.state[el.name] });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
    if (
      this.state.violatedConstraints !== "100" ||
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
      this.state.mc_2_105
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
    const { violatedConstraints, largeError } = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            {" "}
            测验{" "}
          </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="number-of-participants">
                如果您最终没有给所有学生分配好房间，则该轮游戏的分数 将会是:
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
                  value={largeError}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="number-of-participants">
                对于每个未满足的(即违反的)约束，有多少 会从您身上扣分吗?
              </label>
              <div className="bp3-form-content">
                <input
                  id="violatedConstraints"
                  className="bp3-input"
                  type="number"
                  min="0"
                  max="1000"
                  step="1"
                  dir="auto"
                  name="violatedConstraints"
                  value={violatedConstraints}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="neighbor-of-room-101">
                下面哪些房间是101房间的邻居？请选择所有适用的。
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
                <div className="bp3-control bp3-checkbox">
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
                下面哪些房间是103房间的邻居?请 选择所有适用的。{" "}
              </label>
              <div className="bp3-form-content ">
                <div className="bp3-control bp3-checkbox">
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
                <div className="bp3-control bp3-checkbox">
                  <Checkbox
                    name={"mc_2_104"}
                    label="房间 104"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox">
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
                {/* Back to instructions */}
                上一页
              </button>
              <button type="submit" className="bp3-button bp3-intent-primary">
                {/* Submit */}
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

// import { Checkbox } from "@blueprintjs/core";

// export default class IndividualQuiz extends React.Component {
//   state = {
//     violatedConstraints: "",
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
//     mc_2_105: false
//   };

//   handleChange = event => {
//     const el = event.currentTarget;
//     this.setState({ [el.name]: el.value.trim().toLowerCase() });
//   };

//   handleEnabledChange = event => {
//     const el = event.currentTarget;
//     this.setState({ [el.name]: !this.state[el.name] });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
//     if (
//       this.state.violatedConstraints !== "100" ||
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
//       this.state.mc_2_105
//     ) {
//       AlertToaster.show({
//         message:
//           "Sorry, you have one or more mistakes. Please ensure that you answer the questions correctly, or go back to the insturctions"
//       });
//     } else {
//       this.props.onNext();
//     }
//   };

//   render() {
//     const { hasPrev, onPrev } = this.props;
//     const { violatedConstraints, largeError } = this.state;
//     return (
//       <Centered>
//         <div className="quiz">
//           <h1 className={"bp3-heading"}> Quiz </h1>
//           <form onSubmit={this.handleSubmit}>
//             <div className="bp3-form-group">
//               <label className="bp3-label" htmlFor="number-of-participants">
//                 If you end up NOT assigning all students to room (i.e., at least
//                 one student remained in the deck) then the score for that task
//                 will be:
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
//                   value={largeError}
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
//                   id="violatedConstraints"
//                   className="bp3-input"
//                   type="number"
//                   min="0"
//                   max="1000"
//                   step="1"
//                   dir="auto"
//                   name="violatedConstraints"
//                   value={violatedConstraints}
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
