import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //   useEffect(() => {
  //     scrollToBottom();
  //   }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputMessage,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://agni-drishti.vercel.app/",
            "X-Title": "AgniDrishti Fire Safety",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [
              {
                role: "system",
                content:
                  "You are AgniDrishti, a crisis-response chatbot specializing in fire safety and emergency guidance. ",
              },
              { role: "user", content: inputMessage },
            ],
            temperature: 0.3,
          }),
        }
      );

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const botContent =
        data.choices[0]?.message?.content ||
        "I couldn't process that request. Please try again.";

      const botMessage: Message = {
        id: Date.now(),
        content: botContent,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now(),
        content:
          "⚠️ Emergency connection failure. Please contact authorities directly if urgent.\n" +
          "Fire Brigade: 101 | Police: 100 | Ambulance: 102",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[95vh] w-[90vw] max-w-xl mx-auto m-5 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="border-b border-red-500/30 p-4 bg-gray-900/50">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
          <h1 className="text-lg font-bold">
            <span className="text-red-500">Agni</span>Drishti
            <span className="ml-2 text-xs font-medium text-red-400/80">
              Emergency Response System
            </span>
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isBot ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xl p-4 rounded-2xl ${
                message.isBot
                  ? "bg-gray-800/80 rounded-bl-none border border-gray-700/50"
                  : "bg-red-600/90 rounded-br-none border border-red-700/50"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.isBot ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
                {message.isBot && (
                  <span className="ml-2 text-xs text-gray-400/60 float-right mt-2">
                    🔥 AgniDrishti
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/80 rounded-2xl p-4 border border-gray-700/50">
              <div className="flex space-x-2 text-red-400">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-700/50 bg-gray-900/30"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Describe your emergency situation..."
            className="flex-1 bg-gray-800/70 rounded-xl px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 border border-gray-700/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-600/90 hover:bg-red-700/90 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-red-700/50"
          >
            Send 🚒
          </button>
        </div>
        <p className="mt-2 text-xs text-red-400/60 text-center">
          In real emergencies, always contact local authorities first!
        </p>
      </form>
    </div>
  );
};

export default Chatbot;
