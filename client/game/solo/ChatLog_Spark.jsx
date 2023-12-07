// import React, { useState, useEffect } from "react";
// import Author from "./Author";
// import { TimeSync } from "meteor/mizzao:timesync";
// import moment from "moment";
// import * as CryptoJS from "crypto-js";
// // import WebSocket from 'ws'; // 引入ws库

// // 调用科大讯飞大模型
// //APPID，APISecret，APIKey在https://console.xfyun.cn/services/cbm这里获取
// // const APPID = "b54e44da"
// // const API_SECRET = "OGM5Yjc5ODhkYTM3OThmZWFkYTg2OGYx"
// // const API_KEY = "cc921cf6f9641910ebc29f639c400f4e"

// //test
// const APPID = "b54e44da"
// const API_SECRET = "OGM5Yjc5ODhkYTM3OThmZWFkYTg2OGYx"
// const API_KEY = "cc921cf6f9641910ebc29f639c400f4e"


// var total_res = "";

// function getWebsocketUrl() {
//     return new Promise((resolve, reject) => {
//         var apiKey = API_KEY
//         var apiSecret = API_SECRET
//         var url = 'wss://spark-api.xf-yun.com/v1.1/chat'
//         var host = location.host
//         var date = new Date().toGMTString()
//         var algorithm = 'hmac-sha256'
//         var headers = 'host date request-line'
//         var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`
//         var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
//         var signature = CryptoJS.enc.Base64.stringify(signatureSha)
//         var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
//         var authorization = btoa(authorizationOrigin)
//         url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
//         resolve(url)
//     })
// }

// class TTSRecorder {
//     constructor({
//                     appId = APPID
//                 } = {}) {
//         this.appId = appId
//         this.status = 'init'
//     }

//     // 修改状态
//     setStatus(status) {
//         this.onWillStatusChange && this.onWillStatusChange(this.status, status)
//         this.status = status
//     }

//     // 连接websocket
//     connectWebSocket() {
//         this.setStatus('ttsing')
//         return getWebsocketUrl().then(url => {
//             let ttsWS
//             if ('WebSocket' in window) {
//                 ttsWS = new WebSocket(url)
//             } else if ('MozWebSocket' in window) {
//                 ttsWS = new MozWebSocket(url)
//             } else {
//                 alert('浏览器不支持WebSocket')
//                 return
//             }
//             this.ttsWS = ttsWS
//             ttsWS.onopen = e => {
//                 this.webSocketSend()
//             }
//             ttsWS.onmessage = e => {
//                 this.result(e.data)
//             }
//             ttsWS.onerror = e => {
//                 clearTimeout(this.playTimeout)
//                 this.setStatus('error')
//                 alert('WebSocket报错，请f12查看详情')
//                 console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
//             }
//             ttsWS.onclose = e => {
//                 console.log(e)
//             }
//         })
//     }


//     // websocket发送数据
//     webSocketSend() {
//         var params = {
//             "header": {
//                 "app_id": this.appId,
//                 "uid": "fd3f47e4-d"
//             },
//             "parameter": {
//                 "chat": {
//                     "domain": "general",
//                     "temperature": 0.5,
//                     "max_tokens": 1024
//                 }
//             },
//             "payload": {
//                 "message": {
//                     "text": [
//                         {
//                             "role": "user",
//                             "content": $('#input_text').text()
//                         }
//                     ]
//                 }
//             }
//         }
//         console.log(JSON.stringify(params))
//         this.ttsWS.send(JSON.stringify(params))
//     }

//     start() {
//         total_res = ""; // 清空回答历史
//         this.connectWebSocket()
//     }

//     // websocket接收数据的处理
//     result(resultData) {
//         let jsonData = JSON.parse(resultData)
//         total_res = total_res + resultData
//         $('#output_text').val(total_res)
//         // console.log(resultData)
//         // 提问失败
//         if (jsonData.header.code !== 0) {
//             alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
//             console.error(`${jsonData.header.code}:${jsonData.header.message}`)
//             return
//         }
//         if (jsonData.header.code === 0 && jsonData.header.status === 2) {
//             this.ttsWS.close()
//             bigModel.setStatus("init")
//         }
//     }
// }

// export default class ChatLog extends React.Component {
//   state = { comment: "", time: 0 };

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
//     // const [status, setStatus] = useState('init');
//     let bigModel = new TTSRecorder()
//     bigModel.start()
//     console.log("response", result);
//     stage.append("chat", {
//       total_res,
//       playerId: "AI",
//       createdAt: moment(TimeSync.serverTime(null, 1000)).format(
//         "YYYY-MM-DD:HH:mm:ss"
//       ),
//     });
//   };

//   render() {
//     const { comment } = this.state;
//     const { messages, player, stage } = this.props;

//     // console.log("message", messages);
//     // console.log("comment", comment);
//     return (
//       <div className="chat bp3-card">
//         <Messages messages={messages} player={player} stage={stage} />
//         <form onSubmit={this.handleSubmit}>
//           <div className="bp3-control-group">
//             <input
//               name="comment"
//               type="text"
//               className="bp3-input bp3-fill"
//               placeholder="输入聊天信息"
//               value={comment}
//               onChange={this.handleChange}
//               autoComplete="off"
//             />
//             <button type="submit" className="bp3-button bp3-intent-primary">
//               发送
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// const chatSound = new Audio("experiment/unsure.mp3");
// class Messages extends React.Component {
//   componentDidMount() {
//     this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.messages.length < this.props.messages.length) {
//       this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
//       chatSound.play();
//     }
//   }
//   render() {
//     const { messages, player, stage } = this.props;

//     return (
//       <div className="messages" ref={(el) => (this.messagesEl = el)}>
//         {stage.name === "practice" ? (
//           <div style={{ color: "red" }}>
//             温馨提示：由于游戏时间有限，随后游戏难度将逐渐升级，
//             大家需要积极相互沟通，才能更好地合作提高团队成绩
//           </div>
//         ) : null}
//         {messages.length === 0 ? (
//           <div className="empty">还未输入信息......</div>
//         ) : null}
//         {messages.map((message, i) => (
//           <Message
//             key={i}
//             message={message}
//             self={message.subject ? player._id === message.subject._id : null}
//           />
//         ))}
//       </div>
//     );
//   }
// }

// class Message extends React.Component {
//   render() {
//     const { text, subject, createdAt } = this.props.message;
//     const { self } = this.props;
//     return (
//       <div className="message">
//         <div className="timestamp">{moment(createdAt).format("HH:mm:ss")}</div>
//         <Author player={subject} self={self} />
//         <strong>：</strong>
//         hello
//       </div>
//     );
//   }
// }
