import { useState, useRef } from 'react';
import { Mic, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface VoiceSearchProps {
  onSearch: (query: string) => void;
  onChatMessage?: (message: string) => void;
}

// Menu-related keywords for routing
const MENU_KEYWORDS = [
  'pizza', 'margherita', 'paneer tikka', 'farm fresh', 'vegan supreme', 'truffle',
  'sandwich', 'grilled veg', 'pesto', 'club', 'cheese corn', 'mexican', 'caprese',
  'burger', 'vegan cheese',
  'fries', 'french fries', 'peri peri', 'churros',
  'nachos', 'salsa', 'loaded',
  'pasta', 'alfredo', 'arrabbiata', 'noodles', 'hakka', 'thai', 'lasagna',
  'waffle', 'chocolate waffle', 'strawberry', 'nutella', 'oreo', 'maple', 'blueberry', 'caramel', 'red velvet',
  'brownie', 'molten', 'banana nutella', 'triple chocolate',
  'dessert', 'lava cake', 'pastry', 'cheesecake',
  'ice cream', 'sundae', 'scoop',
  'shake', 'milkshake', 'mango shake', 'oreo shake',
  'mocktail', 'mojito', 'blue lagoon', 'watermelon', 'green apple', 'citrus',
  'coffee', 'espresso', 'latte', 'croissant',
  'cola', 'pepsi', 'mountain dew', 'soft drink',
  'frankie', 'schezwan',
  'combo', 'family combo', 'pizza combo', 'burger combo', 'dessert combo',
  'taco', 'wrap', 'burrito', 'falafel',
];

// Question/chat indicators
const CHAT_INDICATORS = [
  'what', 'how', 'when', 'where', 'why', 'which', 'can', 'do', 'does', 'is', 'are',
  'tell me', 'suggest', 'recommend', 'help', 'hi', 'hello', 'hey',
  'open', 'close', 'hours', 'time', 'delivery', 'order', 'price', 'cost',
  'vegan', 'vegetarian', 'allergi', 'ingredient',
];

function analyzeVoiceInput(text: string): { type: 'menu' | 'chat'; query: string } {
  const lower = text.toLowerCase().trim();

  // Check if it's a question or conversational query
  const isQuestion = CHAT_INDICATORS.some(indicator => lower.startsWith(indicator) || lower.includes('?'));
  
  // Check if it contains a specific menu item
  const matchedFood = MENU_KEYWORDS.find(keyword => lower.includes(keyword));

  // If it's a short food name (1-3 words, no question words), go to menu
  const wordCount = lower.split(/\s+/).length;
  if (matchedFood && !isQuestion && wordCount <= 4) {
    return { type: 'menu', query: matchedFood };
  }

  // If it's a question but mentions food, send to chat (AI can answer + we also filter menu)
  if (isQuestion) {
    return { type: 'chat', query: lower };
  }

  // Default: if food keyword found, go to menu; otherwise chat
  if (matchedFood) {
    return { type: 'menu', query: matchedFood };
  }

  return { type: 'chat', query: lower };
}

export function VoiceSearch({ onSearch, onChatMessage }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const transcriptRef = useRef('');
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition ||
                              (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      toast({
        title: 'Voice Search Not Supported',
        description: 'Please try Chrome or Edge browser for voice search.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en';
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        transcriptRef.current = '';
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        if (currentTranscript) {
          setTranscript(currentTranscript);
          transcriptRef.current = currentTranscript;
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        const finalText = transcriptRef.current.trim();
        if (finalText) {
          const analysis = analyzeVoiceInput(finalText);
          
          if (analysis.type === 'menu') {
            // Direct to menu with the food item as search query
            onSearch(analysis.query);
            toast({
              title: '🍕 Found it!',
              description: `Showing "${analysis.query}" in our menu`,
            });
          } else {
            // Send to chatbot for conversational response
            if (onChatMessage) {
              onChatMessage(finalText);
              toast({
                title: '💬 Asking Nova AI...',
                description: `"${finalText}"`,
              });
            } else {
              // Fallback: search menu anyway
              onSearch(finalText);
              toast({
                title: 'Searching for...',
                description: `"${finalText}"`,
              });
            }
          }
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          toast({
            title: 'Microphone Access Denied',
            description: 'Please allow microphone access in your browser settings.',
            variant: 'destructive'
          });
        } else if (event.error === 'no-speech') {
          toast({
            title: 'No Speech Detected',
            description: 'Please try speaking again clearly.',
          });
        } else if (event.error !== 'aborted') {
          toast({
            title: 'Voice Search Error',
            description: 'Something went wrong. Please try again.',
            variant: 'destructive'
          });
        }
      };

      recognition.start();
    } catch {
      toast({
        title: 'Voice Search Error',
        description: 'Failed to start voice recognition.',
        variant: 'destructive'
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <>
      {/* Floating Voice Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={startListening}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-elevated flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Voice search"
      >
        <Mic className="w-6 h-6" />
        <span className="sr-only">Talk to Nova</span>
      </motion.button>

      {/* Listening Modal */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl p-8 max-w-md w-full text-center space-y-6 relative"
            >
              <button
                onClick={stopListening}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative">
                <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-16 h-16 bg-primary/40 rounded-full flex items-center justify-center">
                    <Mic className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-primary/30 animate-ping" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground">Talk to Nova</h2>
                <p className="text-muted-foreground mt-2">Say a dish name or ask a question</p>
              </div>

              {transcript && (
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-lg font-medium text-foreground">"{transcript}"</p>
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                Try: "pizza" to browse, or "What pizzas do you have?" to ask Nova
              </p>

              <button
                onClick={stopListening}
                className="px-6 py-3 bg-destructive text-destructive-foreground rounded-full font-medium hover:bg-destructive/90 transition-colors"
              >
                Stop Listening
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
