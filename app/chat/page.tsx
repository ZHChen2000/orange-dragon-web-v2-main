"use client";
import React, { useRef, useState } from "react";
import Navigation from '../../components/Navigation';

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: number;
}

const welcome = "您好，我是AI客服，有什么可以帮您？";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: welcome, timestamp: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // State for FAQ visibility
  const [faqOpen, setFaqOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // State for typing indicator
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for emoji picker visibility

  // 简单AI自动回复逻辑
  function aiReply(userMsg: string): string {
    if (userMsg.includes("出版")) return "我们可为您提供专业的图书出版服务，欢迎详细咨询！";
    if (userMsg.includes("专利")) return "专利转让、申请、运营等服务都可办理。";
    if (userMsg.includes("大模型")) return "我们有大模型开发相关书籍、视频和配套产品。";
    if (userMsg.includes("嵌入式")) return "嵌入式开发教学是我们的特色业务之一。";
    if (userMsg.includes("你好") || userMsg.includes("您好")) return "您好！请问有什么可以帮您？";
    return "感谢您的咨询，我们会尽快安排专员与您联系。";
  }

  function handleSend(suggestedMessage?: string) {
    const userMsg = suggestedMessage || input.trim();
    if (!userMsg) return;

    setMessages((msgs) => [...msgs, { role: "user", content: userMsg, timestamp: Date.now() }]);
    if (!suggestedMessage) {
      setInput("");
    }

    // Scroll to bottom after sending user message
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    setIsTyping(true);

    setTimeout(() => {
      setMessages((msgs) => [...msgs, { role: "ai", content: aiReply(userMsg), timestamp: Date.now() }]);
      setIsTyping(false);
      // Scroll to bottom after AI reply
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  }

  // Helper to format timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Function to handle emoji selection (placeholder)
  const handleEmojiSelect = (emoji: string) => {
    setInput(prevInput => prevInput + emoji);
  };

  // Function to clear chat history
  const handleClearChat = () => {
    setMessages([{ role: "ai", content: welcome, timestamp: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navigation />
      <main className="flex flex-col items-center py-8">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col h-[70vh] border border-orange-100">
        <div className="flex-shrink-0 px-6 py-4 border-b text-xl font-bold text-orange-600 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-2xl">🤖</span>
            AI在线客服
          </div>
          {/* Clear Chat Button */}
          <button
            className="text-sm text-gray-500 hover:text-gray-700 transition"
            onClick={handleClearChat}
          >
            清除聊天
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-br from-white to-orange-50">
          {/* Suggested Questions */}
          {messages.length === 1 && messages[0].role === "ai" && (
            <div className="text-center mb-4">
              <p className="text-gray-600 mb-3">您可以尝试问这些问题：</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  className="px-4 py-2 border border-orange-300 rounded-full text-sm text-orange-700 bg-orange-100 hover:bg-orange-200 transition"
                  onClick={() => handleSend("关于出版")}
                >
                  关于出版
                </button>
                <button
                  className="px-4 py-2 border border-orange-300 rounded-full text-sm text-orange-700 bg-orange-100 hover:bg-orange-200 transition"
                  onClick={() => handleSend("关于专利")}
                >
                  关于专利
                </button>
                <button
                  className="px-4 py-2 border border-orange-300 rounded-full text-sm text-orange-700 bg-orange-100 hover:bg-orange-200 transition"
                  onClick={() => handleSend("关于大模型")}
                >
                  关于大模型
                </button>
                <button
                  className="px-4 py-2 border border-orange-300 rounded-full text-sm text-orange-700 bg-orange-100 hover:bg-orange-200 transition"
                  onClick={() => handleSend("关于嵌入式")}
                >
                  关于嵌入式
                </button>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          <div className="bg-orange-50 rounded-lg p-4 mb-4 border border-orange-100">
            <button
              className="w-full text-left font-semibold text-orange-700 flex justify-between items-center"
              onClick={() => setFaqOpen(!faqOpen)}
            >
              常见问题解答 (FAQ)
              <span>{faqOpen ? '▲' : '▼'}</span>
            </button>
            {faqOpen && (
              <div className="mt-3 space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold mb-1">Q: 如何购买你们的书籍？</p>
                  <p>A: 您可以在我们的官方网站在线商店购买，或通过合作电商平台（如京东、淘宝）搜索书名。</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Q: 你们提供哪些专利服务？</p>
                  <p>A: 我们提供专利申请、专利转让、专利运营及相关咨询服务。</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Q: 大模型开发教学适合哪些人群？</p>
                  <p>A: 适合有一定编程基础的在校学生、工程师以及希望转型进入AI领域的专业人士。</p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Messages */}
          {messages.map((msg, idx) => (
            <div key={idx}>
              <div className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" ? (
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">🤖</span>
                ) : (
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm text-white font-semibold">👤</span>
                )}
                <div
                  className={`px-4 py-2 rounded-xl max-w-[70%] text-base shadow-md ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white rounded-br-none rounded-tl-xl rounded-tr-xl rounded-bl-xl"
                      : "bg-white text-gray-800 rounded-bl-none rounded-tl-xl rounded-tr-xl rounded-br-xl border border-orange-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
              {/* Timestamp */}
              <div className={`text-xs text-gray-500 mt-1 ${msg.role === "user" ? "text-right mr-14" : "text-left ml-14"}`}>
                {formatTimestamp(msg.timestamp)}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3 justify-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">🤖</span>
              <div className="px-4 py-2 rounded-2xl max-w-[70%] text-base bg-white text-gray-800 rounded-bl-none border border-orange-100">
                AI 正在输入...
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex items-center gap-2 bg-white rounded-b-3xl">
          {/* Emoji Button */}
          <button
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl hover:bg-gray-300 transition"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-label="Toggle emoji picker"
          >
            😊
          </button>
          {/* Placeholder for Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 left-0 w-64 bg-white border rounded-lg shadow-lg p-2">
              <p className="text-center text-gray-600">表情选择器 (待实现)</p>
              {/* Example Emojis */}
              <div className="flex flex-wrap gap-1 mt-2">
                <button onClick={() => handleEmojiSelect('😀')} className="text-xl hover:bg-gray-200 rounded p-1">😀</button>
                <button onClick={() => handleEmojiSelect('😂')} className="text-xl hover:bg-gray-200 rounded p-1">😂</button>
                <button onClick={() => handleEmojiSelect('😍')} className="text-xl hover:bg-gray-200 rounded p-1">😍</button>
                <button onClick={() => handleEmojiSelect('👍')} className="text-xl hover:bg-gray-200 rounded p-1">👍</button>
                <button onClick={() => handleEmojiSelect('😊')} className="text-xl hover:bg-gray-200 rounded p-1">😊</button>
              </div>
            </div>
          )}
          <input
            className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            placeholder="请输入您的问题..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition font-semibold shadow-md flex-shrink-0"
            onClick={() => handleSend()}
          >发送</button>
        </div>
      </div>
      </main>
    </div>
  );
} 