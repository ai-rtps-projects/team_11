import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { GraduationCap, User } from "lucide-react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} max-w-3xl mx-auto w-full px-4`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
      </div>

      <div
        className={`rounded-2xl px-4 py-3 max-w-[80%] ${
          isUser
            ? "bg-chat-user text-chat-user-foreground"
            : "bg-chat-bot text-chat-bot-foreground"
        }`}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
