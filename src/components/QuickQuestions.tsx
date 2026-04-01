import { motion } from "framer-motion";

interface QuickQuestionsProps {
  onSelect: (question: string) => void;
}

const questions = [
  "What courses are available?",
  "What is the fee structure?",
  "Eligibility for B.Tech?",
  "When do admissions start?",
  "How can I contact the university?",
];

const QuickQuestions = ({ onSelect }: QuickQuestionsProps) => (
  <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto px-4">
    {questions.map((q, i) => (
      <motion.button
        key={q}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * i, duration: 0.3 }}
        onClick={() => onSelect(q)}
        className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-muted transition-all"
      >
        {q}
      </motion.button>
    ))}
  </div>
);

export default QuickQuestions;
