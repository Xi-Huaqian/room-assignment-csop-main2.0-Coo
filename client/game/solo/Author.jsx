import React from "react";

export default class Author extends React.Component {

  render() {
    const { player, self, index} = this.props;
    let isAI = false
    if(player.data.isAI) {
      isAI = player.data.isAI[index]
    }

    return (
      <div className="author" >
        <img src={isAI ? "/avatars/jdenticon/Aaron" : player.get("avatar")} />
        <span className={isAI ? "Green" : "name"} style={{ color: isAI ? "#70A945" : player.get("nameColor") }} >
        { isAI ? "AI" : "您"}
        </span>
      </div>
    );
  }
}
