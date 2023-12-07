import React, { Component } from "react";
import { Button, Classes, FormGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Centered } from "meteor/empirica:core";

export default class NewPlayer extends Component {
  state = { id: "" };

  handleUpdate = (event) => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { handleNewPlayer } = this.props;
    const { id } = this.state;
    handleNewPlayer(id);
  };

  render() {
    const { id } = this.state;

    return (
      <Centered>
        <div className="new-player">
          <form onSubmit={this.handleSubmit}>
            <h1 style={{ textAlign: "center" }}>您的姓名</h1>
            <div className="new-player-content" style={{ textAlign: "center" }}>
              <FormGroup
                // label="游戏名称（格式：地区+昵称）"
                labelFor="id"
                helperText={
                  <>
                    <span className="bp3-text-muted">
                    请输入您的<strong style={{color:"red"}}>真实姓名</strong>，以便您的队友联系到您
                    </span>
                  </>
                }
              >
                <input
                  className={Classes.INPUT}
                  dir="auto"
                  type="text"
                  name="id"
                  id="id"
                  value={id}
                  onChange={this.handleUpdate}
                  // placeholder="比如：长沙-吴彦祖"
                  required
                  autoComplete="off"
                />
              </FormGroup>
            </div>
            <div style={{ textAlign: "center" }}>
              <FormGroup>
                <Button type="submit" text="提交" icon={IconNames.KEY_ENTER} />
              </FormGroup>
            </div>
          </form>
        </div>
      </Centered>
    );
  }
}
