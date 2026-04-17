import { Bot, User } from "lucide-react";
import { ChatMessage } from "@/lib/automations";

export function ChatView({ messages }: { messages: ChatMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
        <p className="text-sm text-zinc-500">
          Todavía no hay conversación con este lead.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => {
        const isHuman = m.message.type === "human";
        const isSystem = m.message.type === "system";
        if (isSystem) return null;
        return (
          <div
            key={m.id}
            className={`flex gap-3 ${isHuman ? "" : "flex-row-reverse"}`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                isHuman ? "bg-zinc-800" : "bg-amber-500/20"
              }`}
            >
              {isHuman ? (
                <User className="h-4 w-4 text-zinc-400" />
              ) : (
                <Bot className="h-4 w-4 text-amber-400" />
              )}
            </div>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                isHuman
                  ? "bg-zinc-800 text-zinc-100 rounded-tl-sm"
                  : "bg-gradient-to-br from-amber-500/15 to-amber-600/10 border border-amber-500/20 text-zinc-100 rounded-tr-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">{m.message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
