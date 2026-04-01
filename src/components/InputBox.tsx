import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface InputBoxProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const InputBox = ({ onSend, disabled }: InputBoxProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4">
      <div className="relative flex items-end bg-chat-input-bg border border-border rounded-2xl shadow-sm transition-shadow focus-within:shadow-md focus-within:border-muted-foreground/30">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about admissions, courses, fees..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 max-h-32 min-h-[44px]"
          style={{ fieldSizing: "content" } as React.CSSProperties}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="flex-shrink-0 m-1.5 p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        ABC University Admission Assistant · Powered by AI
      </p>
    </div>
  );
};

export default InputBox;
