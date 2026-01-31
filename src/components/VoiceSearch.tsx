import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface VoiceSearchProps {
  onSearch: (query: string) => void;
}

export function VoiceSearch({ onSearch }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for speech recognition support across browsers
    const SpeechRecognition = (window as any).webkitSpeechRecognition || 
                              (window as any).SpeechRecognition ||
                              (window as any).mozSpeechRecognition ||
                              (window as any).msSpeechRecognition;
    
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || 
                              (window as any).SpeechRecognition ||
                              (window as any).mozSpeechRecognition ||
                              (window as any).msSpeechRecognition;

    if (!SpeechRecognition) {
      toast({
        title: 'Voice Search Not Supported',
        description: 'Your browser does not support voice search. Please try Chrome, Edge, or Safari.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript) {
          onSearch(transcript);
          toast({
            title: 'Searching for...',
            description: `"${transcript}"`,
          });
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        console.error('Speech recognition error:', event.error);
        
        if (event.error === 'not-allowed') {
          toast({
            title: 'Microphone Access Denied',
            description: 'Please allow microphone access in your browser settings to use voice search.',
            variant: 'destructive'
          });
        } else if (event.error === 'no-speech') {
          toast({
            title: 'No Speech Detected',
            description: 'Please try speaking again.',
          });
        } else {
          toast({
            title: 'Voice Search Error',
            description: 'Something went wrong. Please try again.',
            variant: 'destructive'
          });
        }
      };

      recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      toast({
        title: 'Voice Search Error',
        description: 'Failed to start voice recognition. Please try again.',
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

  // Always show the button - it will show error message if not supported
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
                {/* Sound wave animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-primary/30 animate-ping" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground">Listening...</h2>
                <p className="text-muted-foreground mt-2">Say the dish you're looking for</p>
              </div>

              {transcript && (
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-lg font-medium text-foreground">"{transcript}"</p>
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                Try saying "pizza", "waffle", or "mocktail"
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
