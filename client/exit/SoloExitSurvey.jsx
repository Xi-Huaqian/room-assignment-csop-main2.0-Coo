import React from "react";

import { Centered } from "meteor/empirica:core";
import Author from "../game/Author";

import {
  Button,
  Classes,
  FormGroup,
  RadioGroup,
  TextArea,
  Intent,
  Radio,
} from "@blueprintjs/core";

export default class SoloExitSurvey extends React.Component {
  static stepName = "ExitSurvey";
  state = {
    strategy: "",
    fair: "",
    feedback: "",
    satisfied: "",
    workedWell: "",
    perspective: "",
    chatComfort: "",
    chatUseful: "",
    events: "",
  };

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  // showBonus = (player, self) => {
  //   return (
  //     // <div className="exit-score">
  //         // <tr>
  //         //   <td><strong>{self ? "您" : player.id}</strong></td>
  //         //   <td>          <strong>
  //         //   <em style={{ color: player.get("nameColor") }}>
  //         //     {player.get("finalScore") || 0}
  //         //   </em>
  //         // </strong>{" "}</td>
  //         //   <td>          <strong>
  //         //   <em style={{ color: player.get("nameColor") }}>
  //         //     奖金是 ￥{player.get("newBonus") || 0}
  //         //   </em>
  //         // </strong>{" "}</td>
  //         // </tr>
  //         // <tr>
  //         //   <td>Mark</td>
  //         //   <td>Zuckerberg</td>
  //         //   <td>$250</td>
  //         // </tr>
  //       {/* <p>
  //         <span className="name" style={{ color: player.get("nameColor") }}>
  //           <strong>{self ? "您" : player.id}</strong>
  //         </span>{" "}
  //         的个人综合表现{" "}
  //         <strong>
  //           <em style={{ color: player.get("nameColor") }}>
  //             得分是 {player.get("finalScore") || 0}
  //           </em>
  //         </strong>{" "}
  //         ，最终可以获得的{" "}
  //         <strong>
  //           <em style={{ color: player.get("nameColor") }}>
  //             奖金是 ￥{player.get("newBonus") || 0}
  //           </em>
  //         </strong>{" "}
  //       </p> */}
  //     {/* </div> */}
  //   );
  // };

  exitMessage = (player, game) => {
    // const players = game.players;
    // const otherPlayers = _.reject(game.players, (p) => p._id === player._id);
    const players = game.players;
    const sortedPlayers = [...players].sort((a, b) => {
      // return b.get("finalScore").localeCompare(a.get("finalScore"));
      if (a.get("finalScore") < b.get("finalScore")) {
        return 1;
      }
      if (a.get("finalScore") > b.get("finalScore")) {
        return -1;
      }
      return 0;
    });
    return (
      <div>
        <h1 style={{ textAlign: "center" }}> 任务完成!</h1>
        <div className="consent-con">
          {" "}
          <h3 className="pt-non-ideal-state-title">
            感谢您的参与！！！ 你们团队的最终得分：{" "}
            <strong>
              <em> {player.get("cumulativeScore") || 0}</em>
            </strong>{" "}
          </h3>
          <hr />
          {/* 得分展示 */}
          <div className="exit-score">
            <table>
              <tr>
                <th>参与者</th>
                <th>个人贡献分</th>
                <th>金币</th>
                {/* <th>排名</th> */}
              </tr>
              {/* <tr>
                <td>
                  <strong style={{ color: player.get("nameColor") }}>
                    {"您"}
                  </strong>
                </td>
                <td>
                  {" "}
                  <strong>
                    <em style={{ color: player.get("nameColor") }}>
                      {player.get("finalScore") || 0}
                    </em>
                  </strong>{" "}
                </td>
                <td>
                  {" "}
                  <strong>
                    <em style={{ color: player.get("nameColor") }}>
                      ￥10
                    </em>
                  </strong>{" "}
                </td>
              </tr>
              {otherPlayers.map((player) => (
                <tr>
                  <td>
                    <strong style={{ color: player.get("nameColor") }}>
                      {player.id}
                    </strong>
                  </td>
                  <td>
                    {" "}
                    <strong>
                      <em style={{ color: player.get("nameColor") }}>
                        {player.get("finalScore") || 0}
                      </em>
                    </strong>{" "}
                  </td>
                  <td>
                    {" "}
                    <strong>
                      <em style={{ color: player.get("nameColor") }}>
                        ￥10
                      </em>
                    </strong>{" "}
                  </td>
                </tr>
              ))} */}
              {sortedPlayers.map((player, index) => (
                <tr>
                  <td>
                    <strong style={{ color: player.get("nameColor") }}>
                      {player.id}
                    </strong>
                  </td>
                  <td>
                    {" "}
                    <strong>
                      <em style={{ color: player.get("nameColor") }}>
                        {player.get("finalScore") || 0}
                      </em>
                    </strong>{" "}
                  </td>
                  <td>
                    {" "}
                    <strong>
                      <em style={{ color: player.get("nameColor") }}>
                        ￥{10 || 0}
                      </em>
                    </strong>{" "}
                  </td>
                  {/* <td>
                    {" "}
                    <strong>
                      <p style={{ color: "red" }}>
                        {index === 0 ? (
                          <div>
                            <svg
                              style={{ position: "relative", top: "4px" }}
                              t="1677505287669"
                              class="icon"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="15723"
                              width="30"
                              height="30"
                            >
                              <path
                                d="M261.6 208.5H94.7C42.4 208.5 0 251 0 303.2v115.9c0 115.3 93.5 208.2 208.2 208.2h53.4c52.2 0 94.7-42.5 94.7-94.7V303.2c0-52.2-42.5-94.7-94.7-94.7z m-16.1 323.6h-52.8c-56.2 0-101.5-45.3-101.5-101.5v-128h154.3v229.5z m422.2-228.9v229.5c0 52.2 42.5 94.7 94.7 94.7h53.4c115.3 0 208.2-93.5 208.2-208.2v-116c0-52.2-42.5-94.7-94.7-94.7H762.4c-52.2 0-94.7 42.5-94.7 94.7z m110.2-0.6h154.3v127.9c0 56.2-45.3 101.5-101.5 101.5h-52.8V302.6z m0 0"
                                fill="#FF9600"
                                p-id="15724"
                              ></path>
                              <path
                                d="M469.8 683.5H557v191.6h-87.2z"
                                fill="#FFC949"
                                p-id="15725"
                              ></path>
                              <path
                                d="M339 875.1h338.5v84.3H339z"
                                fill="#FF9B01"
                                p-id="15726"
                              ></path>
                              <path
                                d="M277.1 953.7h461.8v56.8H277.1z"
                                fill="#FF9B01"
                                p-id="15727"
                              ></path>
                              <path
                                d="M79.7 13.5h859.4v91.8H79.7z"
                                fill="#FFC714"
                                p-id="15728"
                              ></path>
                              <path
                                d="M118.82666667 55.46666666v306.56c0 222.72 174.4 402.66666667 389.76 402.66666667 215.36 0 389.76-180.48 389.76-402.66666667V55.46666666H118.82666667z m424.96 507.94666667h-51.62666667V287.46666666c-20.8 19.52-46.72 33.81333333-77.65333333 42.56v-51.09333333c15.14666667-3.73333333 31.25333333-10.45333333 48.32-19.84 17.06666667-10.77333333 30.93333333-21.97333333 41.6-33.6h39.25333333v337.92z"
                                fill="#FFB400"
                                p-id="15729"
                              ></path>
                            </svg>
                          </div>
                        ) : (
                          <div>&ensp;{index + 1}</div>
                        )}
                      </p>
                    </strong>{" "}
                  </td> */}
                </tr>
              ))}
            </table>
            {/* <table>
              <tr>
                <th>
                你们团队的最终得分：{" "}
                  <strong>
                    <em> {player.get("cumulativeScore") || 0}</em>
                  </strong>{" "}
                </th>
              </tr>
            </table> */}
          </div>
          {/* {this.showBonus(player, true)}
          {otherPlayers.map((player) => this.showBonus(player))} */}
          <hr />
          <h3>
            <strong style={{ color: "red" }}>请不要关闭当前页面！</strong>
            扫描下方的二维码填写问卷，预计耗时
            <strong style={{ color: "red" }}> 5分钟 </strong>。
          </h3>
          <h3>
            请将代码填写至问卷第一题: <em>{player.id + "-" + player.index}</em>.
            （请确保填写正确）
          </h3>
          {/* <h3>
            问卷链接：{" "}
            <a href="https://www.wjx.cn/vm/wEQfMk2.aspx">
              https://www.wjx.cn/vm/wEQfMk2.aspx
            </a>
          </h3> */}
          <div className="image" style={{ textAlign: "center" }}>
            <img
              style={{ width: "30%", height: "auto" }}
              src="/experiment/问卷二维码2.png"
            />
          </div>
        </div>
      </div>
    );
  };

  exitForm = () => {
    const {
      strategy,
      fair,
      feedback,
      satisfied,
      workedWell,
      perspective,
      chatComfort,
      events,
      chatUseful,
    } = this.state;

    return (
      <div>
        {" "}
        <p>请回答以下简短的调查。 您不必提供任何让您感到不舒服的信息。</p>
        <form onSubmit={this.handleSubmit}>
          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="satisfied"
                label="您对你们队在比赛中的表现满意吗?  "
                onChange={this.handleChange}
                selectedValue={satisfied}
              >
                <Radio
                  label="非常满意"
                  value="verySatisfied"
                  className={"pt-inline"}
                />
                <Radio
                  label="满意"
                  value="somewhatSatisfied"
                  className={"pt-inline"}
                />
                <Radio label="一般" value="neutral" className={"pt-inline"} />

                <Radio
                  label="不满意"
                  value="somewhatDissatisfied"
                  className={"pt-inline"}
                />
                <Radio
                  label="非常不满意"
                  value="veryDissatisfied"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="workedWell"
                label="您认为您的团队合作得好吗?"
                onChange={this.handleChange}
                selectedValue={workedWell}
              >
                <Radio
                  label="非常同意"
                  value="stronglyAgree"
                  className={"pt-inline"}
                />
                <Radio label="同意" value="agree" className={"pt-inline"} />
                <Radio label="一般" value="neutral" className={"pt-inline"} />

                <Radio
                  label="不同意"
                  value="disagree"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常不同意"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="perspective"
                label="您认为您的观点对最终结果有多大价值?  "
                onChange={this.handleChange}
                selectedValue={perspective}
              >
                <Radio
                  label="非常有价值"
                  value="extremelyValuable"
                  className={"pt-inline"}
                />
                <Radio
                  label="有价值"
                  value="valuable"
                  className={"pt-inline"}
                />
                <Radio label="一般" value="neutral" className={"pt-inline"} />
                <Radio
                  label="没有价值"
                  value="invaluable"
                  className={"pt-inline"}
                />
                <Radio
                  label="非常没有价值"
                  value="extremelyInvaluable"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="chatComfort"
                label="通过聊天与团队分享您的观点，您感觉如何?  "
                onChange={this.handleChange}
                selectedValue={chatComfort}
              >
                <Radio
                  label="非常舒适"
                  value="extremelyValuable"
                  className={"pt-inline"}
                />
                <Radio
                  label="舒适"
                  value="comfortable"
                  className={"pt-inline"}
                />
                <Radio label="一般" value="neutral" className={"pt-inline"} />

                <Radio
                  label="不舒适"
                  value="uncomfortable"
                  className={"pt-inline"}
                />

                <Radio
                  label="非常不舒适"
                  value="veryUncomfortable"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="form-line thirds">
            <FormGroup
              className={"form-group"}
              inline={false}
              label={"您会如何描述您在游戏中的策略?  "}
              labelFor={"strategy"}
              //className={"form-group"}
            >
              <TextArea
                id="strategy"
                large={true}
                intent={Intent.PRIMARY}
                onChange={this.handleChange}
                value={strategy}
                fill={true}
                name="strategy"
              />
            </FormGroup>

            <FormGroup
              className={"form-group"}
              inline={false}
              label={"您觉得奖金合理吗?"}
              labelFor={"fair"}
              //className={"form-group"}
            >
              <TextArea
                id="fair"
                name="fair"
                large={true}
                intent={Intent.PRIMARY}
                onChange={this.handleChange}
                value={fair}
                fill={true}
              />
            </FormGroup>

            <FormGroup
              className={"form-group"}
              inline={false}
              label={"反馈您所遇到的问题。"}
              labelFor={"feedback"}
              //className={"form-group"}
            >
              <TextArea
                id="feedback"
                name="feedback"
                large={true}
                intent={Intent.PRIMARY}
                onChange={this.handleChange}
                value={feedback}
                fill={true}
              />
            </FormGroup>
          </div>

          <div className="form-line thirds">
            <FormGroup
              className={"form-group"}
              inline={false}
              label={"游戏内部聊天功能有用吗?"}
              labelFor={"chatUseful"}
              //className={"form-group"}
            >
              <TextArea
                id="chatUseful"
                name="chatUseful"
                large={true}
                intent={Intent.PRIMARY}
                onChange={this.handleChange}
                value={chatUseful}
                fill={true}
              />
            </FormGroup>

            <FormGroup
              className={"form-group"}
              inline={false}
              label={"事件日志功能有用吗?"}
              labelFor={"events"}
              //className={"form-group"}
            >
              <TextArea
                id="events"
                name="events"
                large={true}
                intent={Intent.PRIMARY}
                onChange={this.handleChange}
                value={events}
                fill={true}
              />
            </FormGroup>
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

          {/* {this.exitForm()} */}
        </div>
      </Centered>
    );
  }
}
