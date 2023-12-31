import React from "react";
import EventLog from "./EventLog";
import ChatLog from "./ChatLog";

export default class SocialInteractions extends React.Component {
  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <span
            className={`satisfied bp3-tag bp3-round ${
              player.get("satisfied") ? "bp3-intent-success" : "bp3-intent-danger"
            }`}
          >
            <span
              className={`bp3-icon-standard ${
                player.get("satisfied") ? "bp3-icon-tick" : "bp3-icon-cross"
              }`}
            />
          </span>

          <img src={player.get("avatar")} />
        </span>
        {/* <span className="name" style={{ color: player.get("nameColor") }}> */}
        <span className="name" style={{ color: player.get("nameColor"), fontSize:"0.7em"}}>
          {/* {player.get("name")} */}
          {player.id}
          {self ? "（您）" : ""}
        </span>
      </div>
    );
  }

  render() {
    const { game, stage, player,round } = this.props;

    const otherPlayers = _.reject(game.players, p => p._id === player._id);
    // console.log("otherPlayers", otherPlayers);
    // console.log("chat", stage.get("chat"));
    // console.log("log", stage.get("log"));
    // console.log("game-round", game.rounds[0]);
    // console.log("satisfiedTime",player.get("satisfiedTime"))
    const messages1 = game.rounds[0].get("chat").map(({ text, playerId, createdAt }) => ({
      text,
      subject: game.players.find(p => p._id === playerId),
      createdAt
    }));
    //stage message的输出
    const messages2 = stage.get("chat").map(({ text, playerId, createdAt }) => ({
      text,
      subject: game.players.find(p => p._id === playerId),
      createdAt
    }));

    const messages=[...messages1,...messages2];
    // console.log("messages", messages);

    const events = stage.get("log").map(({ subjectId, ...rest }) => ({
      subject: subjectId && game.players.find(p => p._id === subjectId),
      ...rest
    }));

    return (
      <div className="social-interactions">
        <div className="status">
          <div className="players bp3-card">
            {this.renderPlayer(player, true)}
            {otherPlayers.map(p => this.renderPlayer(p))}
          </div>
          <div className="total-score bp3-card">
            <h6 className='bp3-heading'>总分</h6>
            <h2 className='bp3-heading'>{game.get("cumulativeScore") || 0}</h2>
          </div>
        </div>
        <ChatLog messages={messages} stage={stage} player={player} />
        <EventLog events={events} stage={stage} player={player} />
      </div>
    );
  }
}
