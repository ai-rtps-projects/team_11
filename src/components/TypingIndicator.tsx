import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-3 max-w-3xl mx-auto w-full px-4"
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center bg-muted text-muted-foreground">
      <GraduationCap className="w-4 h-4" />
    </div>
    <div className="bg-chat-bot rounded-2xl px-4 py-3 flex items-center gap-1">
      <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground inline-block" />
      <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground inline-block" />
      <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground inline-block" />
    </div>
  </motion.div>
);

export default TypingIndicator;
