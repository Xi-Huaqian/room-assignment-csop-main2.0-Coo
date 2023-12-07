import React from "react";

import { Button, HTMLTable } from "@blueprintjs/core";
import { Centered } from "meteor/empirica:core";

// student names
const studentNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// room numbers
const roomNumbers = _.range(101, 111);

// constraint types
const constraintTypes = {
  0: "必须住在同一房间",
  1: "不能住在同一房间",
  2: "必须为邻居",
  3: "不能住在相邻和相同的房间",
};

export const exampleTaskData = {
  _id: 0,
  optimal: 220,
  difficulty: "easy",
  students: studentNames.slice(0, 4), // how many students
  rooms: roomNumbers.slice(0, 3), // how many rooms
  constraints: [
    {
      _id: 0, // i.e., A and B can't live in the same room or be neighbors.
      pair: ["A", "B"],
      type: 3,
      text: constraintTypes[3],
    },
    {
      _id: 1, // i.e., B and C must live in the same room.
      pair: ["B", "C"],
      type: 0,
      text: constraintTypes[0],
    },
  ],
  payoff: {
    // the payoff of placing Student i in Room j (e.g., `payoff[i][j]`)
    A: { 101: 20, 102: 80, 103: 65 },
    B: { 101: 67, 102: 90, 103: 76 },
    C: { 101: 85, 102: 82, 103: 79 },
    D: { 101: 20, 102: 75, 103: 78 },
  },
};

export default class P1GameDetails extends React.Component {
  handleSatisfaction = (satisfied, event) => {
    event.preventDefault();
    this.setState({ satisfied: satisfied });
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    this.violatedConstraints();
    this.updateScore();
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            {" "}
            任务详情{" "}
          </h1>
          <div className="consent-con">
            <p>
              <strong>目标：</strong>在每一轮任务中，您需要与另外
              <em style={{ color: "orange" }}>
                <strong> 2 </strong>
              </em>
              名队友一起。 将一些学生（如右图，学生ABCD）分配到不同的房间里。
            </p>
            <p>
              <strong>满意度：</strong>
              学生对居住房间的
              <strong style={{ color: "orange" }}>满意度</strong>
              分数在0到100之间（见左下方），
              总得分越高，即意味着学生的满意度越高。{" "}
            </p>
            <p>
              <strong>约束条件：</strong>在给学生分配房间时您需要考虑一些{" "}
              <strong style={{ color: "orange" }}>约束条件</strong>。
              比如：有的学生不能住在同一个房间，有的学生必须是邻居。
              <strong style={{ color: "orange" }}>邻居</strong>
              是指拥有连续数字的房间，如102的邻居是101和103，101的邻居是102
              。约束条件、学生数量和房间数量因任务难度而异，
              <strong>您可以尝试下面的例子：</strong>
            </p>
          </div>
          <div className="task">
            <div className="left">
              <div className="info">
                <div className="score">
                  <p>
                    <strong>得分</strong>
                  </p>
                  {/* <h2>{gameLevel}</h2> */}
                  <h2>{this.state.score}</h2>
                </div>
              </div>
              <div className="constraints">
                <h5 className={"bp3-heading"}>&emsp;约束条件</h5>
                <ul>
                  {exampleTaskData.constraints.map((constraint) => {
                    const failed = this.state.violatedConstraintsIds.includes(
                      constraint._id
                    );
                    return (
                      <li
                        key={constraint._id}
                        className={failed ? "failed" : ""}
                      >
                        {failed ? (
                          <span className="bp3-icon-standard bp3-icon-cross" />
                        ) : (
                          <span className="bp3-icon-standard bp3-icon-dot" />
                        )}
                        {constraint.pair.join(" 和 ")} {constraint.text}.
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="payoff">
                {/* <h3>满意度</h3> */}
                <h5 className="bp3-heading">&emsp;满意度</h5>
                <HTMLTable className="bp3-table">
                  <thead>
                    <tr>
                      <th>房间</th>
                      {exampleTaskData.rooms.map((room) => (
                        <th key={room}>{room}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {exampleTaskData.students.map((student) => (
                      <tr key={student}>
                        <th>学生 {student}</th>
                        {exampleTaskData.rooms.map((room) => (
                          <td
                            key={room}
                            className={
                              this.state[`student${student}Room`] === room
                                ? "active"
                                : null
                            }
                          >
                            {exampleTaskData.payoff[student][room]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </HTMLTable>
              </div>
            </div>

            <div className="board">
              <div className="all-rooms">
                {this.renderRoom("deck", true)}
                <div className="rooms">
                  {exampleTaskData.rooms.map((room) =>
                    this.renderRoom(room, false)
                  )}
                </div>
              </div>
              {/* <div style={{ textAlign: "center" }}> */}
              <div>
                <h3 style={{ color: "red" }}>
                  温馨提示1：只有当所有学生都被分配了房间，才会显示得分。(可以有空房间)
                </h3>
                <h3 style={{ color: "red" }}>
                  温馨提示2：每违反一个约束条件将会从团队得分中扣除
                  <strong style={{ color: "red" }}>100</strong>分！
                </h3>
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

  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      studentARoom: "deck",
      studentBRoom: "deck",
      studentCRoom: "deck",
      studentDRoom: "deck",
      studentERoom: "deck",
      studentFRoom: "deck",
      studentHRoom: "deck",
      studentIRoom: "deck",
      studentJRoom: "deck",
      studentKRoom: "deck",
      score: 0,
      violatedConstraintsIds: [],
    };
  }

  updateScore() {
    this.state.score = 0;
    exampleTaskData.students.forEach((student) => {
      exampleTaskData.rooms.forEach((room) => {
        if (this.state[`student${student}Room`] === room) {
          this.state.score += exampleTaskData.payoff[student][room];
        }
      });
    });
    this.state.score -= 100 * this.state.violatedConstraintsIds.length;
    //if anyone in the deck, then score is 0
    exampleTaskData.students.forEach((student) => {
      if (this.state[`student${student}Room`] === "deck") {
        //if anyone in the deck, score is 0
        this.state.score = "N/A";
      }
    });
  }

  violatedConstraints() {
    this.state.violatedConstraintsIds = [];
    exampleTaskData.constraints.forEach((constraint) => {
      const firstStudentRoom = this.state[`student${constraint.pair[0]}Room`];
      const secondStudentRoom = this.state[`student${constraint.pair[1]}Room`];

      if (firstStudentRoom !== "deck" && secondStudentRoom !== "deck") {
        switch (constraint.type) {
          case 0:
            //they are not in the same room, when they should've
            if (firstStudentRoom !== secondStudentRoom) {
              console.debug(
                constraint.pair.join(" and "),
                "they are not in the same room, when they should've"
              );
              this.state.violatedConstraintsIds.push(constraint._id);
            }
            break;
          case 1:
            //they are in the same room, when they shouldn't
            if (firstStudentRoom === secondStudentRoom) {
              console.debug(
                constraint.pair.join(" and "),
                "they are in the same room, when they shouldn't"
              );
              this.state.violatedConstraintsIds.push(constraint._id);
            }

            break;
          case 2:
            //if they are not neighbors, when they should've been
            if (Math.abs(firstStudentRoom - secondStudentRoom) !== 1) {
              console.debug(
                constraint.pair.join(" and "),
                "they are not neighbors, when they should've been"
              );
              this.state.violatedConstraintsIds.push(constraint._id);
            }

            break;
          case 3:
            if (Math.abs(firstStudentRoom - secondStudentRoom) < 2) {
              console.debug(
                constraint.pair.join(" and "),
                "can't live in the same room or be neighbors, so why are they?"
              );
              this.state.violatedConstraintsIds.push(constraint._id);
            }
            break;
        }
      }
    });
  }

  handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    this.setState({ hovered: true });
  };

  handleDragLeave = (e) => {
    this.setState({ hovered: false });
  };

  handleDrop = (room, e) => {
    const student = e.dataTransfer.getData("text/plain");
    this.setState({ hovered: false });
    let obj = {};
    obj[`student${student}Room`] = room;
    this.setState(obj);
  };

  renderRoom(room, isDeck) {
    const { hovered } = this.state;
    const students = [];
    exampleTaskData.students.forEach((student) => {
      if (this.state[`student${student}Room`] === room) {
        students.push(student);
      }
    });

    const classNameRoom = isDeck ? "deck bp3-elevation-1" : "room";
    const classNameHovered = hovered ? "bp3-elevation-3" : "";
    return (
      <div
        key={room}
        onDrop={this.handleDrop.bind(this, room)}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        className={`bp3-card ${classNameRoom} ${classNameHovered}`}
      >
        {isDeck ? null : <h6 className={"bp3-heading"}>Room {room}</h6>}
        {students.map((student) => this.renderStudent(student))}
      </div>
    );
  }

  studentHandleDragStart = (student, e) => {
    e.dataTransfer.setData("text/plain", student);
  };

  studentHandleDragOver = (e) => {
    e.preventDefault();
  };

  studentHandleDragEnd = (e) => {};

  renderStudent(student) {
    const style = {};
    const cursorStyle = { cursor: "move" };

    return (
      <div
        key={student}
        draggable={true}
        onDragStart={this.studentHandleDragStart.bind(this, student)}
        onDragOver={this.studentHandleDragOver}
        onDragEnd={this.studentHandleDragEnd}
        className="student"
        style={cursorStyle}
      >
        {/* <span className="icon bp3-icon-standard bp3-icon-person" /> */}
        <span className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
            <path
              style={style}
              d="M96 0c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64S60.654 0 96 0m48 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H48c-26.51 0-48 21.49-48 48v136c0 13.255 10.745 24 24 24h16v136c0 13.255 10.745 24 24 24h64c13.255 0 24-10.745 24-24V352h16c13.255 0 24-10.745 24-24V192c0-26.51-21.49-48-48-48z"
            />
          </svg>
        </span>
        <span className="letter">{student}</span>
      </div>
    );
  }
}
