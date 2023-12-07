import React from "react";
import Author from "./Author";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";

var Filter = require("bad-words"),
  filter = new Filter();

export default class ChatLog extends React.Component {
  // date=new Date();
  state = { comment: "", time: 0 };
  // state = { comment: "", query: "", time: 0, context: [], chatGPTMessages: [] };

  handleChange = (e) => {
    const el = e.currentTarget;
    // console.log("el", el.value);
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // const text = filter.clean(this.state.comment.trim());    //加入了脏话屏蔽器，不能输入全中文
    const text = this.state.comment.trim();

    // console.log(new Date(Date.now() + TimeSync.serverOffset()));

    if (text !== "") {
      const { stage, player } = this.props;
      
      stage.append("chat", {
        text,
        playerId: player._id,
        createdAt : moment(TimeSync.serverTime(null, 1000)).format('YYYY-MM-DD:HH:mm:ss'),
      });
      this.setState({ comment: "" });
      this.setState({ time: 0 });
    }

  };

  render() {
    const { comment } = this.state;
    const { messages, player, stage } = this.props;

    // console.log("message", messages);
    // console.log("comment", comment);
    return (
      <div className="chat bp3-card">
        <Messages messages={messages} player={player} stage={stage} />
        <form onSubmit={this.handleSubmit}>
          <div className="bp3-control-group">
            <input
              name="comment"
              type="text"
              className="bp3-input bp3-fill"
              placeholder="输入聊天信息"
              value={comment}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <button type="submit" className="bp3-button bp3-intent-primary">
              发送
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const chatSound = new Audio("experiment/unsure.mp3");
class Messages extends React.Component {
  componentDidMount() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
      chatSound.play();
    }
  }
  render() {
    const { messages, player, stage } = this.props;

    return (
      <div className="messages" ref={(el) => (this.messagesEl = el)}>
        {stage.name === "practice" ? (
          <div style={{ color: "red" }}>
            温馨提示：由于游戏时间有限，随后游戏难度将逐渐升级，
            大家需要积极相互沟通，才能更好地合作提高团队成绩
          </div>
        ) : null}
        {messages.length === 0 ? (
          <div className="empty">还未输入信息......</div>
        ) : null}

        {messages.map((message, i) => (
          <Message
            key={i}
            message={message}
            self={message.subject ? player._id === message.subject._id : null}
          />
        ))}
      </div>
    );
  }
}

class Message extends React.Component {
  render() {
    const { text, subject, createdAt  } = this.props.message;
    const { self } = this.props;
    return (
      <div className="message">
        <div className="timestamp">{moment(createdAt).format("HH:mm:ss")}</div>
        <Author player={subject} self={self} /><strong>：</strong>
        {text}
      </div>
    );
  }
}
