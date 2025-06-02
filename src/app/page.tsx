"use client";

import { generateResponse } from "@src/utils/gemini";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"knowledge" | "unknowledge">("knowledge");

  const geminiApiKey = "AIzaSyAKCXK-3KrJ7shrS3P0hKD_wjHUqM9qSTo"; // testing only

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    let context: string | undefined = undefined;

    if (mode === "knowledge") {
      try {
        const contextResponse = await fetch("/api/pinecone/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input }),
        });

        if (contextResponse.ok) {
          const data = await contextResponse.json();
          context = data.context;
        } else {
          console.error("Failed to fetch context");
        }
      } catch (err) {
        console.error("Error fetching context:", err);
      }
    }

    const botText = await generateResponse(
      [userMessage],
      geminiApiKey,
      context
    );
    const botMessage = { role: "bot" as const, content: botText };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e20] text-white">
      {/* Mode switcher */}
      <div className="p-4 border-b border-gray-700 bg-[#121212] flex gap-4">
        <div className="flex mx-auto w-fit px-3 py-2 bg-gray-800 rounded-full">
          <button
            className={`px-4 py-2 rounded-full ${
              mode === "knowledge" ? "bg-green-600" : "bg-transparent"
            }`}
            onClick={() => setMode("knowledge")}
          >
            Knowledge
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              mode === "unknowledge" ? "bg-green-600" : "bg-transparent"
            }`}
            onClick={() => setMode("unknowledge")}
          >
            Unknowledge
          </button>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex-1 overflow-y-auto py-4 px-4 md:px-12 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xl px-4 py-2 rounded-lg ${
                msg.role === "user" ? "bg-neutral-600" : "bg-gray-700"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-700 bg-[#121212]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-[#2b2b2d] border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
