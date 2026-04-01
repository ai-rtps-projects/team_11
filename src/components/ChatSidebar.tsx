import { motion } from "framer-motion";
import { MessageSquare, Plus, Trash2, X, GraduationCap } from "lucide-react";

interface ChatSession {
  id: string;
  title: string;
  created_at: string;
}

interface ChatSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onClearChat: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ChatSidebar = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onClearChat,
  isOpen,
  onClose,
}: ChatSidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed lg:relative z-50 lg:z-auto top-0 left-0 h-full w-[280px] bg-sidebar border-r border-sidebar-border flex flex-col ${
          !isOpen ? "lg:hidden" : ""
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-sidebar-foreground" />
            <span className="font-semibold text-sm text-sidebar-foreground">Admissions AI</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-sidebar-border text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <Plus className="w-4 h-4" />
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto chat-scroll px-3 space-y-1">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left transition-colors truncate ${
                activeSessionId === session.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{session.title}</span>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={onClearChat}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear all chats
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default ChatSidebar;
