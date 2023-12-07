import React from "react";

import { Centered } from "meteor/empirica:core";

export default class MoreAboutBonus extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const social = treatment.playerCount > 1;
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            成绩和奖金计算
          </h1>

          <p>
            &emsp;&emsp;在每个任务中，我们用“得分”来评价分配房间的质量。根据
            {social ? "您团队" : "您"}选择的分配方案。
            {/* <strong style={{ color: "red" }}>
              只有当您完成所有学生分配时，您的分数才开始计算
            </strong>
            。 */}
          </p>

          <p>&emsp;&emsp;团队总分计算如下:</p>

          <div style={{ textAlign: "center" }}>
            <p>
              <strong style={{ color: "blue" }}>
                S = 学生对分配房间的满意度得分总和 - 100 * 违反约束的数量
              </strong>
            </p>
          </div>

          <p>
            &emsp;&emsp;这意味着,{" "}
            <strong>团队方案每违反一次限制，就会被扣掉100分。</strong>
          </p>

          {social ? (
            <p>
              &emsp;&emsp;作为一个团队,{" "}
              <strong>你们在每轮游戏任务中只提交一份最终分配方案</strong> 。
              但是 <strong>我们会依据您在团队中的表现计算个人贡献</strong>
              （比如，您所做操作对总分的影响）。
              团队绩效奖金根据团队总分计算，团队成员的个人奖金根据对团队总分的贡献程度分配。
            </p>
          ) : null}

          <p>
            &emsp;&emsp;因此，努力提高个人奖金，需要您和团队成员多进行沟通，确保您的团队在规定的时间内形成最佳房间分配方案
            以获得较高的团队绩效奖金，同时您自己也要积极行动，以确保能分配到团队绩效奖金中较大的比例。
            {/* <strong style={{ color: "red" }}>
              努力提高个人奖金，需要您和团队成员多进行沟通，确保您的团队在规定的时间内形成最佳房间分配方案
              以获得较高的团队绩效奖金，同时您自己也要积极行动，以确保能分配到团队绩效奖金中较大的比例。{" "}
            </strong>{" "} */}
          </p>

          {social ? (
            <div>
              <p>
                <strong></strong>
              </p>
            </div>
          ) : null}

          <p>
            &emsp;&emsp;
            <strong>
              {social ? "拒绝“划水”!!!" : ""}{" "}
              如果我们检测到您在任务期间处于非活动状态，您将不会收到该轮任务的奖金。
            </strong>
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

// import React from "react";

// import {Centered} from "meteor/empirica:core";

// export default class MoreAboutBonus extends React.Component {
//   render() {
//     const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
//     const social = treatment.playerCount > 1;
//     return (
//       <Centered>
//         <div className="instructions">
//           <h1 className={"bp3-heading"}> Scores and Bonuses</h1>

//           <p>
//             In each task, we use "score" to evaluate the quality of the room
//             assignment plan that {social ? "your team" : "you"} came up with.{" "}
//             <strong style={{ color: "red" }}>
//               {" "}
//               Your score starts counting only when you have a complete
//               assignment
//             </strong>{" "}
//             (that is, each student has been assigned to a room).
//           </p>

//           <p>The score of your assignment is calculated as:</p>

//           <div style={{ textAlign: "center" }}>
//             <p>
//               <strong style={{ color: "blue" }}>
//                 S = The sum of students' ratings of their assigned rooms - 100 *
//                 the number of violated constraints
//               </strong>
//             </p>
//           </div>

//           <p>
//             That means,{" "}
//             <strong>
//               for each constraint you violate, you get 100 points deducted.
//             </strong>
//           </p>

//           {social ? (
//             <p>
//               As a team, <strong>you will submit ONE answer per task</strong>{" "}
//               and therefore{" "}
//               <strong>
//                 all team members will have the same score on each task
//               </strong>.
//             </p>
//           ) : null}

//           <p>
//             There are two parts of the bonus that you will have opportunity to
//             earn in each task:
//           </p>

//           <p>
//             1. <strong>"performance-based bonus":</strong> When your score is
//             positive, no matter whether your answer is the BEST possible
//             assignment or not. The exchange rate is{" "}
//             <strong style={{ color: "red" }}>
//               {Math.round(1 / treatment.conversionRate)} game points = $1 bonus
//             </strong>.
//           </p>

//           <p>
//             2. <strong>"optimal assignment bonus" </strong>: When your answer is
//             the BEST possible assignment, you get{" "}
//             <strong style={{ color: "red" }}>
//               an additional bonus of ${treatment.optimalSolutionBonus} in that
//               task
//             </strong>.
//           </p>

//           <p>
//             Therefore,
//             <strong>
//               big part of the bonus is for finding the BEST possible
//               assignment{" "}
//             </strong>{" "}
//             (i.e., "optimal assignment bonus", which can be up to $5 total).
//             Also,
//             <strong>
//               you can earn more game points (i.e., more performance-based
//               bonuses) from the difficult tasks{" "}
//             </strong>{" "}
//             compared to the easier ones (more students/rooms means more possible
//             bonus).
//           </p>

//           {social ? (
//             <div style={{ textAlign: "center" }}>
//               <p>
//                 <strong>
//                   Together with your teammates, you should try to find a
//                   complete room assignment with a score that is as high as
//                   possible to earn more bonus in each task!
//                 </strong>
//               </p>
//             </div>
//           ) : null}

//           <p>
//             <strong>
//               {social ? "Remember, free riding is not permitted." : ""} If we
//               detect that you are inactive during a task, you will not receive a
//               bonus for that task.
//             </strong>
//           </p>

//           <button
//             type="button"
//             className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
//             onClick={onPrev}
//             disabled={!hasPrev}
//           >
//             Previous
//           </button>
//           <button
//             type="button"
//             className="bp3-button bp3-intent-primary"
//             onClick={onNext}
//             disabled={!hasNext}
//           >
//             Next
//             <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
//           </button>
//         </div>
//       </Centered>
//     );
//   }
// }
