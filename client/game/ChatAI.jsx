import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import styles from './index.less';
import './chatui-theme.css';
import axios from 'axios';
import { useState } from 'react';
 
const initialMessages = [
  {
    type: 'text',
    content: { text: '您好，我是智能助理，您的贴心小助手~' },
    user: { avatar: '/logo.svg' },
  },
  {
    type: 'image',
    content: {
      picUrl: '//img.alicdn.com/tfs/TB1p_nirYr1gK0jSZR0XXbP8XXa-300-300.png',
    },
  },
];
 
// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    icon: 'message',
    name: '联系人工服务',
    isNew: true,
    isHighlight: true,
  },
  //   {
  //     name: '短语1',
  //     isNew: true,
  //   },
  //   {
  //     name: '短语2',
  //     isHighlight: true,
  //   },
  //   {
  //     name: '短语3',
  //   },
];
 
const ChatBot = () => {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  const [chatMessage, setChatMessage] = useState([]);
 
  // 发送回调
  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      // TODO: 发送请求
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });
      axios
        .post(
          'https://api.openai.com/v1/chat/completions',
          {
            messages: [...chatMessage, { content: val, role: 'user' }],
            max_tokens: 150,
            n: 1,
            temperature: 0.5,
            //   stop: ['\n'],
            model: 'gpt-3.5-turbo',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer 你的api-key',
            },
          },
        )
        .then((res) => {
          const response = res.data.choices[0].message.content.trim();
          const newMessages = [
            ...chatMessage,
            { content: val, role: 'user' },
            { content: response, role: 'system' },
          ];
          setChatMessage(newMessages as any);
          appendMsg({
            type: 'text',
            content: { text: response },
            user: { avatar: '/logo.svg' },
          });
        })
        .catch((err) => console.log(err));
 
      setTyping(true);
    }
  }
 
  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item) {
    handleSend('text', item.name);
  }
 
  function renderMessageContent(msg) {
    const { type, content } = msg;
    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }
 
  return (
    <div id={styles.chatBotContainer}>
      <Chat
        navbar={{ title: '小知了' }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        quickReplies={defaultQuickReplies}
        onQuickReplyClick={handleQuickReplyClick}
        onSend={handleSend}
      />
    </div>
  );
};
 
export default ChatBot;