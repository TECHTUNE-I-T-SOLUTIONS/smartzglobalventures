-- Create security_questions table
CREATE TABLE IF NOT EXISTS security_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  question_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_security_questions_user_id ON security_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_security_questions_user_order ON security_questions(user_id, question_order);

-- Enable RLS
ALTER TABLE security_questions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own security questions" ON security_questions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own security questions" ON security_questions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own security questions" ON security_questions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create chat_rooms table for business chat
CREATE TABLE IF NOT EXISTS chat_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'support' CHECK (type IN ('support', 'business')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  file_url TEXT,
  file_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for chat tables
CREATE INDEX IF NOT EXISTS idx_chat_rooms_user_id ON chat_rooms(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id ON chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Enable RLS for chat tables
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat_rooms
CREATE POLICY "Users can view their own chat rooms" ON chat_rooms
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat rooms" ON chat_rooms
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat rooms" ON chat_rooms
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for chat_messages
CREATE POLICY "Users can view messages in their chat rooms" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chat_rooms 
      WHERE chat_rooms.id = chat_messages.room_id 
      AND chat_rooms.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages in their chat rooms" ON chat_messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_rooms 
      WHERE chat_rooms.id = chat_messages.room_id 
      AND chat_rooms.user_id = auth.uid()
    )
  );

-- Create storage bucket for chat files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('business-files', 'business-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for business files
CREATE POLICY "Users can upload business files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'business-files' AND auth.role() = 'authenticated');

CREATE POLICY "Users can view business files" ON storage.objects
  FOR SELECT USING (bucket_id = 'business-files');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_security_questions_updated_at 
  BEFORE UPDATE ON security_questions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_rooms_updated_at 
  BEFORE UPDATE ON chat_rooms 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
