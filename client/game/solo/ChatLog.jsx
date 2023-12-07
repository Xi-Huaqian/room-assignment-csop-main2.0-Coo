import React, { useState, useEffect } from "react";
import Author from "./Author";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import * as CryptoJS from "crypto-js";
import { isAxiosError } from "axios";

import { Meteor } from 'meteor/meteor';
// import WebSocket from 'ws'; // 引入ws库

// 调用科大讯飞大模型
//APPID，APISecret，APIKey在https://console.xfyun.cn/services/cbm这里获取
// const APPID = "b54e44da"
// const API_SECRET = "OGM5Yjc5ODhkYTM3OThmZWFkYTg2OGYx"
// const API_KEY = "cc921cf6f9641910ebc29f639c400f4e"

// 测试用token
const APPID = "a98b7196"
const API_SECRET = "MWM4YjZhZGVjNjRlNDYyY2VhZDU5NWIw"
const API_KEY = "7ca52c728f4e167e0e80996240acac68"

var total_res = "";
//记录问题
let str = ""
let flag = false
//禁用表单提交
let disabled = false

function getWebsocketUrl() {
    return new Promise((resolve, reject) => {
        var apiKey = API_KEY
        var apiSecret = API_SECRET
        var url = 'wss://spark-api.xf-yun.com/v1.1/chat'
        var host = location.host
        var date = new Date().toGMTString()
        var algorithm = 'hmac-sha256'
        var headers = 'host date request-line'
        var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`
        var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
        var signature = CryptoJS.enc.Base64.stringify(signatureSha)
        var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
        var authorization = btoa(authorizationOrigin)
        url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
        resolve(url)
    })
}

class TTSRecorder extends React.Component {
    constructor({
                    appId = APPID
                } = {}, props) {
                  super(props)
        this.appId = appId
        this.status = 'init'
    }

    // 修改状态
    setStatus(status) {
        this.onWillStatusChange && this.onWillStatusChange(this.status, status)
        this.status = status
    }

    // 连接websocket!!!!!!
    connectWebSocket(QAndA) {
        this.setStatus('ttsing')
        return getWebsocketUrl().then(url => {
            let ttsWS
            if ('WebSocket' in window) {
                ttsWS = new WebSocket(url)
            } else if ('MozWebSocket' in window) {
                ttsWS = new MozWebSocket(url)
            } else {
                alert('浏览器不支持WebSocket')
                return
            }
            this.ttsWS = ttsWS
            ttsWS.onopen = e => {
                this.webSocketSend(QAndA)
            }
            ttsWS.onmessage = e => {
                this.result(e.data)
            }
            ttsWS.onerror = e => {
                clearTimeout(this.playTimeout)
                this.setStatus('error')
                alert('WebSocket报错，请f12查看详情')
                console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
            }
            ttsWS.onclose = e => {
                console.log(e)
            }
        })
    }


    // websocket发送数据
    webSocketSend(QAndA) {
        var params = {
            "header": {
                "app_id": this.appId,
                "uid": "fd3f47e4-d"
            },
            "parameter": {
                "chat": {
                    "domain": "general",
                    "temperature": 0.5,
                    "max_tokens": 1024
                }
            },
            "payload": {
                "message": {
                    "text": [
                        // {
                        //     "role": "user",
                        //     // "content": $('#input_text').text()
                        //     "content": str
                        // },
                        ...QAndA
                    ]
                }
            }
        }
        console.log(JSON.stringify(params))
        this.ttsWS.send(JSON.stringify(params))
    }

    start(QAndA) {
        total_res = ""; // 清空回答历史
        this.connectWebSocket(QAndA)
    }

    // websocket接收数据的处理
    result(resultData) {
        let jsonData = JSON.parse(resultData)
        total_res += jsonData.payload.choices.text[0].content
        // total_res += jsonData
        // $('#output_text').val (total_res)
        // $(count).val(total_res)
        // console.log(resultData)
        // console.log(jsonData.payload.choices.text[0].content)
        // console.log(total_res)
        // 提问失败
        if (jsonData.header.code !== 0) {
            alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
            console.error(`${jsonData.header.code}:${jsonData.header.message}`)
            return
        }
        if (jsonData.header.code === 0 && jsonData.header.status === 2) {
          flag = true
            this.ttsWS.close()
            bigModel.setStatus("init")
            return total_res
        }
    }
}

let bigModel = new TTSRecorder()
export default class ChatLog extends React.Component {
  state = { comment: "", time: 0, isTrue: false };
  
  handleChange = (e) => {
    const el = e.currentTarget;
    // console.log("el", el.value);
    str = el.value
    document.querySelector("#use_test").value = str
    this.setState({ [el.name]: el.value });
  };

  textareaHide = () => {
    const { isTrue } = this.state
    if(isTrue) {
      document.querySelector("#test_use").style.display = "none"
    }else {
      document.querySelector("#test_use").style.display = "block"
    }
    this.setState({isTrue: !isTrue})
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // const text = filter.clean(this.state.comment.trim());    //加入了脏话屏蔽器，不能输入全中文

    //禁用提交
    if(disabled) {
      alert("请等待AI回答")
      return
    }
    
    const text = this.state.comment.trim();
    if(text === '') {
      alert("请输入内容")
      return
    }

    const { stage, player } = this.props;

    stage.get("QAndA") ? null : stage.set("QAndA", [])

    disabled = true
    player.append("isAI", false)

    stage.append("chat", {
      text,
      playerId: player._id,
      createdAt: moment(TimeSync.serverTime(null, 1000)).format(
        "YYYY-MM-DD:HH:mm:ss"
      ),
    });
    stage.append("QAndA", {
      role: "user",
      content: text,
    })

    this.setState({ comment: "" });
    this.setState({ time: 0 });
  
    // console.log("执行了");
    const QAndA = stage.data.QAndA
    bigModel.start(QAndA)
    const timer = setInterval(() => {
      if(flag) {
        flag = false

        const { stage, player } = this.props
        player.append("isAI", true)

        stage.append("chat", {
          text: total_res,
          playerId: player._id,
          createdAt: moment(TimeSync.serverTime(null, 1000)).format(
            "YYYY-MM-DD:HH:mm:ss"
          ),
        });
        stage.append("QAndA", {
          role: "assistant",
          content: total_res,
        })

        // stage.chat["answer"][total_res]
        // stage.chat.answer ? stage.chat.append("answer", {total_res}) : stage.chat.set("answer", {total_res})

        this.setState({ comment: "" });
        this.setState({ time: 0 });
    
        disabled = false
        clearInterval(timer)
      }
    }, 1000)
  };
  
  render() {
    const { comment } = this.state;
    const { messages, player, stage } = this.props;

    // console.log("message", messages);
    // console.log("comment", comment);
    return (
      <div className="chat bp3-card">
        <Messages messages={messages} player={player} stage={stage} />
        <form onSubmit={this.handleSubmit} >
          <div className="bp3-control-group" style={{marginBottom: ''}}>
            <textarea
              name="comment"
              id="input_text"
              type="textarea"
              rows="1"
              style={{resize: 'none'}}
              className="bp3-input bp3-fill"  
              placeholder="输入聊天信息"
              value={comment}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <button type="submit" className="bp3-button bp3-intent-primary" onMouseEnter={this.textareaHide}>
              发送
            </button>
          </div>
        </form>
        <div id="test_use" style={{display: "none"}}>
        <textarea id="use_test" cols="30" rows="10" style={{ left: '350px', position: 'relative' }}></textarea>
        </div>
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
    // console.log(stage);
    // console.log(messages);
    // console.log(player);

    return (
      <div className="messages" ref={(el) => (this.messagesEl = el)}>
        {stage.name === "practice" ? (
          <div style={{ color: "red" }}>
            温馨提示：在聊天框输入内容，与ai进行对话，由于时间有限，后续游戏难度将持续升级，请大家把握好时间。
          </div>
        ) : null}
        <button className="bp3-button bp3-intent-primary">示例</button>
        {messages.length === 0 ? (
          <div className="empty">还未输入信息......</div>
        ) : null}
        {messages.map((message, i) => (
          <Message
            index={i}
            key={i}
            message={message}
            self={message.subject ? player._id === message.subject._id : null}
            player={player}
          />
        ))}
      </div>
    );
  }
}

class Message extends React.Component {
  render() {
    const { text, subject, createdAt } = this.props.message;
    const { self, index } = this.props;

    return (
      <div className="message">
        <div className="timestamp">{moment(createdAt).format("HH:mm:ss")}</div>
        <Author player={subject} self={self} index={index} />
        <strong>：</strong>
        {text}
      </div>
    );
  }

  // componentDidUpdate() {
  //   const { text, subject, createdAt } = this.props.message;
  //   const { self } = this.props;
  //   return (
  //         <div className="message">
  //           <div className="timestamp">{moment(createdAt).format("HH:mm:ss")}</div>
  //           <Author player={subject} self={self} />
  //           <strong>：</strong>
  //           {text}
  //         </div>
      // )
  // }
}


// import React, { useState, useEffect } from "react";
// import Author from "./Author";
// import { TimeSync } from "meteor/mizzao:timesync";
// import moment from "moment";
// import * as CryptoJS from 'crypto-js';
// // import WebSocket from 'ws'; // 引入ws库

// // 调用科大讯飞大模型
// const callAPI = async (question) => {
//   // 替换为你自己的密钥参数
//   const APPID = 'b54e44da';
//   const APIKey = 'cc921cf6f9641910ebc29f639c400f4e';
//   const APISecret = 'OGM5Yjc5ODhkYTM3OThmZWFkYTg2OGYx';
//   // const gpt_url = 'wss://spark-api.xf-yun.com/v1.1/chat';
//   const gpt_url = 'spark-api.xf-yun.com';

//   // 生成RFC1123格式的时间戳
//   const date = new Date().toUTCString();

//   // 拼接字符串
//   let signature_origin = "host: " + gpt_url + "\n";
//   signature_origin += "date: " + date + "\n";
//   signature_origin += "POST /v1.1/chat HTTP/1.1";

//   // 进行hmac-sha256进行加密
//   const signature_sha = CryptoJS.HmacSHA256(signature_origin, APISecret);
//   const signature_sha_base64 = CryptoJS.enc.Base64.stringify(signature_sha);
//   const authorization_origin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature_sha_base64}"`;
//   const authorization = btoa(authorization_origin);

//   // 将请求的鉴权参数组合为字典
//   const v = {
//     authorization,
//     date,
//     host: gpt_url
//   };

//   // 拼接鉴权参数，生成url
//   const url = gpt_url + '?' + new URLSearchParams(v).toString();

//   // 创建WebSocket实例，并传入完整的请求地址
//   const ws = new WebSocket('wss://' + url); // 修改了这里

//   // 定义请求参数
//   const headers = {
//     app_id: APPID,
//     uid: '1234'
//   };

//   const parameters = {
//     chat: {
//       domain: 'general',
//       random_threshold: 0.5,
//       max_tokens: 2048,
//       auditing: 'default'
//     }
//   };

//   const data = {
//     message: {
//       text: [
//         { role: 'user', content: question }
//       ]
//     }
//   };

//   // 监听WebSocket实例的open事件，并在事件回调中发送请求参数
//   ws.addEventListener('open', function() { // 修改了这里
//     ws.send(JSON.stringify({ headers, parameters, data })); // 修改了这里
//   });

//   // 监听WebSocket实例的message事件，并在事件回调中处理服务器返回的数据
//   ws.addEventListener('message', function(data) { // 修改了这里
//     console.log(data); // 修改了这里
//     return data; // 修改了这里
//   });

//   // 监听WebSocket实例的error事件，并在事件回调中处理可能发生的错误
//   ws.addEventListener('error', function(error) { // 修改了这里
//     console.error(error); // 修改了这里
//     return null; // 修改了这里
//   });

//   // 监听WebSocket实例的close事件，并在事件回调中关闭连接
//   ws.addEventListener('close', function() { // 修改了这里
//     ws.close(); // 修改了这里
//   });
// };

// var Filter = require("bad-words"),
//   filter = new Filter();

// export default class ChatLog extends React.Component {
//   // date=new Date();
//   state = { comment: "", time: 0 };
//   // state = { comment: "", query: "", time: 0, context: [], chatGPTMessages: [] };

//   handleChange = (e) => {
//     const el = e.currentTarget;
//     // console.log("el", el.value);
//     this.setState({ [el.name]: el.value });
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     // const text = filter.clean(this.state.comment.trim());    //加入了脏话屏蔽器，不能输入全中文
//     const text = this.state.comment.trim();

//     if (text !== "") {
//       const { stage, player } = this.props;

//       stage.append("chat", {
//         text,
//         playerId: player._id,
//         createdAt: moment(TimeSync.serverTime(null, 1000)).format(
//           "YYYY-MM-DD:HH:mm:ss"
//         ),
//       });
//       this.setState({ comment: "" });
//       this.setState({ time: 0 });
//     }

//     //将文本传递给科大讯飞的api中
//     // 调用摘要函数并更新输出的摘要
//     const response = await callAPI(text);
//     const result=JSON.stringify(response, null, 2)
//     console.log("response", result);
//     stage.append("chat", {
//       result,
//       playerId: "AI",
//       createdAt: moment(TimeSync.serverTime(null, 1000)).format(
//         "YYYY-MM-DD:HH:mm:ss"
//       ),
//     });
//   };
