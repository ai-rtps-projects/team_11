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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"} px-3`}
    >
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        {isUser ? <User className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
      </div>

      <div
        className={`rounded-2xl px-3 py-2 max-w-[85%] ${
          isUser
            ? "bg-chat-user text-chat-user-foreground"
            : "bg-chat-bot text-chat-bot-foreground"
        }`}
      >
        <div className="prose prose-xs dark:prose-invert max-w-none text-xs leading-relaxed [&_p]:m-0 [&_ul]:my-1 [&_li]:my-0">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
