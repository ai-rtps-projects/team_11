import { useRef, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import InputBox from "./InputBox";
import QuickQuestions from "./QuickQuestions";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { GraduationCap, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import admissionData from "@/data/admissionData.json";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  onClose?: () => void;
}

interface AdmissionCourse {
  name: string;
  duration: string;
  eligibility: string;
  fees: string;
}

interface AdmissionDataset {
  university: string;
  courses: AdmissionCourse[];
  admission: {
    start_date: string;
    end_date: string;
    mode: string;
  };
  contact: {
    phone: string;
    email: string;
  };
}

const admissionInfo = admissionData as AdmissionDataset;

const getLocalAdmissionReply = (query: string): string | null => {
  const q = query.toLowerCase();
  const hasAny = (keywords: string[]) => keywords.some((k) => q.includes(k));

  const isProcedureQuery = hasAny(["procedure", "process", "how to apply", "application", "admission steps"]);
  if (isProcedureQuery) {
    return [
      `### Admission Procedure - ${admissionInfo.university}`,
      "",
      `- **Mode:** ${admissionInfo.admission.mode}`,
      `- **Application Window:** ${admissionInfo.admission.start_date} to ${admissionInfo.admission.end_date}`,
      "",
      "#### Step-by-step process",
      "1. Register on the admission portal.",
      "2. Fill academic and personal details.",
      "3. Upload required documents.",
      "4. Pay the application fee.",
      "5. Submit application and track status.",
      "6. Attend counseling/verification if shortlisted.",
      "",
      "#### Required documents",
      "- 10th and 12th marksheets",
      "- Transfer certificate",
      "- Government photo ID",
      "- Passport-size photographs",
      "- Category certificate (if applicable)",
      "- Entrance scorecard (if applicable)",
      "",
      `For help, contact **${admissionInfo.contact.email}** or **${admissionInfo.contact.phone}**.`,
    ].join("\n");
  }

  if (hasAny(["deadline", "last date", "admission date", "start date", "when do admissions start"])) {
    return [
      "### Admission Dates",
      "",
      `- **Start Date:** ${admissionInfo.admission.start_date}`,
      `- **End Date:** ${admissionInfo.admission.end_date}`,
      `- **Mode:** ${admissionInfo.admission.mode}`,
    ].join("\n");
  }

  if (hasAny(["documents", "document required", "certificates"])) {
    return [
      "### Required Documents",
      "",
      "- 10th and 12th marksheets",
      "- Transfer certificate",
      "- Government photo ID",
      "- Passport-size photographs",
      "- Category certificate (if applicable)",
      "- Entrance scorecard (if applicable)",
    ].join("\n");
  }

  if (hasAny(["course", "program", "programs available"])) {
    const courseLines = admissionInfo.courses.map(
      (course) => `- **${course.name}** (${course.duration})`
    );
    return ["### Available Courses", "", ...courseLines].join("\n");
  }

  if (hasAny(["fee", "fees", "cost", "tuition"])) {
    const feeLines = admissionInfo.courses.map(
      (course) => `- **${course.name}:** ${course.fees}`
    );
    return ["### Fee Structure", "", ...feeLines].join("\n");
  }

  if (hasAny(["eligibility", "eligible", "criteria"])) {
    const eligibilityLines = admissionInfo.courses.map(
      (course) => `- **${course.name}:** ${course.eligibility}`
    );
    return ["### Eligibility Criteria", "", ...eligibilityLines].join("\n");
  }

  if (hasAny(["contact", "phone", "email"])) {
    return [
      "### Admission Contact",
      "",
      `- **Email:** ${admissionInfo.contact.email}`,
      `- **Phone:** ${admissionInfo.contact.phone}`,
    ].join("\n");
  }

  return null;
};

const WELCOME_MESSAGE = `Hi! 👋 I'm the **Meow University Admission Enquiries Assistant**.\n\nI can instantly help with **admission procedure, eligibility, deadlines, fees, and required documents**.`;

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const activeRequestRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const saveToHistory = useCallback(async (userMessage: string, botReply: string) => {
    try {
      await supabase.from("chat_history").insert({
        user_message: userMessage,
        bot_reply: botReply,
      });
    } catch (err) {
      console.error("Failed to save chat:", err);
    }
  }, []);

  const sendMessage = async (content: string) => {
    if (isLoading) return;

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    const localReply = getLocalAdmissionReply(content);
    if (localReply) {
      const assistantMsg: Message = { role: "assistant", content: localReply };
      setMessages([...newMessages, assistantMsg]);
      saveToHistory(content, localReply);
      return;
    }

    const requestId = Date.now();
    activeRequestRef.current = requestId;
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: newMessages.filter(
            (m) => !(m.role === "assistant" && m.content === WELCOME_MESSAGE)
          ),
        },
      });

      if (error) throw error;
      if (activeRequestRef.current !== requestId) return;

      const botReply = data?.reply || "Sorry, I couldn't process that request.";
      const assistantMsg: Message = { role: "assistant", content: botReply };
      setMessages([...newMessages, assistantMsg]);
      saveToHistory(content, botReply);
    } catch (err: any) {
      if (activeRequestRef.current !== requestId) return;

      console.error("Chat error:", err);
      const errorMsg = err?.message?.includes("429")
        ? "Rate limit reached. Please wait a moment."
        : "Something went wrong. Please try again.";
      toast.error(errorMsg);
      setMessages([...newMessages, { role: "assistant", content: errorMsg }]);
    } finally {
      if (activeRequestRef.current === requestId) {
        activeRequestRef.current = null;
        setIsLoading(false);
      }
    }
  };

  const handleStop = () => {
    if (!isLoading) return;
    activeRequestRef.current = null;
    setIsLoading(false);
    toast.message("Response stopped");
  };

  const handleClear = () => {
    activeRequestRef.current = null;
    setIsLoading(false);
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
  };

  const hasConversation = messages.length > 1;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-semibold leading-tight">Meow University</h2>
            <p className="text-[11px] text-muted-foreground leading-tight">Admission Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {hasConversation && (
            <button
              onClick={handleClear}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Clear chat"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <ThemeToggle />
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll py-4 space-y-3">
        {!hasConversation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full gap-4 px-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-sm font-semibold">University Admission Enquiries</h3>
              <p className="text-xs text-muted-foreground">
                Ask about procedures, eligibility, deadlines, fees, and documents
              </p>
            </div>
            <QuickQuestions onSelect={sendMessage} />
          </motion.div>
        )}

        {hasConversation &&
          messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} content={msg.content} />
          ))}

        {isLoading && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="border-t border-border pt-2 bg-[var(--aui-surface)]">
        <InputBox onSend={sendMessage} onStop={handleStop} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
