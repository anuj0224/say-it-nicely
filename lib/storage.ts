export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const STORAGE_KEY = 'sayitnicely_chat_web';

const isClient = () => typeof window !== 'undefined';

export const getMessages = (): Message[] => {
  if (!isClient()) return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Failed to load messages from localStorage', err);
    return [];
  }
};

export const saveMessage = (msg: Message) => {
  if (!isClient()) return;
  
  const messages = getMessages();
  messages.push(msg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

export const saveMessages = (msgs: Message[]) => {
  if (!isClient()) return;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
};

export const clearMessages = () => {
  if (!isClient()) return;
  
  localStorage.removeItem(STORAGE_KEY);
};

export const createMessage = (content: string, role: 'user' | 'assistant'): Message => ({
  id: Math.random().toString(36).substring(7),
  role,
  content,
  timestamp: Date.now()
});
