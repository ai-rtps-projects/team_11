CREATE TABLE public.chat_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_message TEXT NOT NULL,
  bot_reply TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert chat history" ON public.chat_history FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read chat history" ON public.chat_history FOR SELECT USING (true);
CREATE POLICY "Anyone can delete chat history" ON public.chat_history FOR DELETE USING (true);