import React from "react";

import SocialInteractions from "./SocialInteractions.jsx";
import Task from "./Task.jsx";
import AIInteractions from "./solo/AIInteractions.jsx";

const roundSound = new Audio("experiment/round-sound.mp3");
const gameSound = new Audio("experiment/bell.mp3");

export default class Round extends React.Component {
  componentDidMount() {
    const { stage, game } = this.props;
    if (game.get("justStarted")) {
      //play the bell sound only once when the game starts
      gameSound.play();
      game.set("justStarted", false);
    } else {
      roundSound.play();
    }
    if (stage.name === "practice"){
      window.alert( "请您加入Zoom会议中的讨论组，组号为"+game.index);
    }
  }

  render() {
    const { stage, player, game } = this.props;

    return (
      <div className="round">
        <Task stage={stage} player={player} game={game} />
        {/*game.player.length is a better check for social interaction than 'game.treatment.playerCount > 1' because of the lobby --> ignor settings*/}
        {game.players.length > 1 ? (
          <SocialInteractions game={game} stage={stage} player={player} />
        ) : <AIInteractions game={game} stage={stage} player={player} />}
      </div>
    );
  }
}
