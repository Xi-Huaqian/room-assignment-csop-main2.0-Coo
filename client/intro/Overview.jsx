import React from "react";

import { Centered } from "meteor/empirica:core";
import { Button } from "@blueprintjs/core";

export default class Overview extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    const social = treatment.playerCount > 1;
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"} style={{ textAlign: "center" }}>
            {" "}
            游戏简介{" "}
          </h1>
          <p>
            &emsp;&emsp;在这个游戏中，您需要完成6轮房间分配任务（1次练习和5次正式游戏）。在每轮任务中，您需要给一组学生分配房间，
            <strong>您的目标主要是在满足给定约束条件</strong>
            （例如：学生A和学生B不能住在同一个房间）
            <strong>的同时，尽可能的获得最高的分数。</strong>
            {""}
          </p>
          <p>
            &emsp;&emsp;每轮任务您最多只有{" "}
            <strong>{Math.ceil(treatment.stageDuration / 60.0)} 分钟</strong>{" "}，完成整个游戏预计耗时
            {Math.ceil((treatment.stageDuration / 60.0) * 6.0)} 分钟，{" "}
            <strong>
              如果您现在没有充足的空余时间用来完成本次实验，您可以现在关闭页面并在下次参与。
            </strong>
          </p>
          {social ? (
            <div>
              <p>
                &emsp;&emsp;在本次游戏中，将有另外
                <strong> {treatment.playerCount - 1} 名</strong>
                小伙伴和您组成团队与您一起完成<strong> 6 轮</strong>游戏任务。
                在每轮游戏中，您和其他团队成员将完成一份房间分配计划。具体操作我们稍后会详细介绍。
              </p>
              <p>
                &emsp;&emsp;游戏结束时，您将有机会获得一定数额的奖金，奖金的金额取决于您在所有
                {treatment.nRounds}任务中的表现。{" "}
                <strong> 注意，请不要“划水”，我们将根据您所在的团队的分配方案得分、方案提交时间以及您为最终方案所做的贡献计算，
                和队友进行充分沟通、努力提高团队总分的个人，将会得到更多的奖励。</strong>

                {/* <em style={{ color: "red" }}>
                  我们将根据您所在的团队的分配方案得分、方案提交时间以及您为最终方案所做的贡献计算，
                  和队友进行充分沟通、努力提高团队总分的个人，将会得到更多的奖励。
                </em> */}
              </p>
            </div>
          ) : (
            // 单人的
            <p>
              在每个任务中，您将提交一份单独的房间分配计划。我们
              将通过在每项任务中打分来评估您的计划的质量。
              在游戏结束时，您将有机会获得一个 奖金和金额取决于您的积累
              分数在所有 {treatment.nRounds} 任务。{" "}
              <em style={{ color: "red" }}>
                如果我们检测到您在一个任务期间不活动，您就不会
                因为那项任务而获得奖金
              </em>
            </p>
          )}
          <p>
            &emsp;&emsp;<strong>Notice：</strong>
            为了更好的游戏体验，我们建议您在{""}
            <strong>电脑</strong>上运行本游戏。
          </p>
          <p>
            &emsp;&emsp;
            <strong>请通过“ctrl+滚轮”尽可能的调整好网页的大小，可以提升游戏的体验。</strong>
          </p>
          <div className="button1">
            {/* style={{ textAlign: "center" }} */}
            <button
              type="button"
              className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
              onClick={onPrev}
              disabled={!hasPrev}
              // style={{ position: "absolute", left: "400px", bottom: "100px" }}
            >
              上一页
            </button>
            <button
              type="button"
              className="bp3-button bp3-intent-primary"
              onClick={onNext}
              disabled={!hasNext}
              // style={{ position: "absolute", left: "500px", bottom: "50px" }}
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
