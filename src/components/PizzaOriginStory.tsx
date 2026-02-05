 import { useState } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 import { BookOpen, Gift, ChevronRight, Star, Trophy, Sparkles } from 'lucide-react';
 import { AnimatedSection } from './AnimatedSection';
 import { toast } from '@/hooks/use-toast';
 
 interface StoryNode {
   id: string;
   title: string;
   content: string;
   image?: string;
   choices?: { text: string; nextId: string }[];
   quiz?: {
     question: string;
     options: { text: string; correct: boolean }[];
   };
   reward?: { code: string; discount: string };
   isEnd?: boolean;
 }
 
 const storyData: Record<string, StoryNode> = {
   start: {
     id: "start",
     title: "🍕 The Legend of Pizza Nova",
     content: "Welcome, brave food explorer! Long ago, in the ancient kitchens of Italy, a legendary chef discovered the secret to the perfect pizza. Your journey begins in 1889 Naples...",
     choices: [
       { text: "Travel to Naples 🇮🇹", nextId: "naples" },
       { text: "Learn about toppings first 🧀", nextId: "toppings-intro" }
     ]
   },
   naples: {
     id: "naples",
     title: "🏛️ Naples, 1889",
     content: "You arrive in Naples where Queen Margherita is visiting! The royal court is buzzing with excitement. A local pizzaiolo named Raffaele Esposito is about to make history...",
     quiz: {
       question: "What pizza did Raffaele create for Queen Margherita?",
       options: [
         { text: "Pizza with anchovies", correct: false },
         { text: "Pizza Margherita (tomato, mozzarella, basil)", correct: true },
         { text: "Pepperoni pizza", correct: false }
       ]
     }
   },
   "naples-correct": {
     id: "naples-correct",
     title: "🎉 Brilliant!",
     content: "Yes! The red tomatoes, white mozzarella, and green basil represented the Italian flag! This was the birth of the iconic Pizza Margherita. The Queen was so delighted, she sent a thank-you letter!",
     reward: { code: "MARGHERITA10", discount: "10% off" },
     choices: [
       { text: "Continue the journey 🚀", nextId: "america" }
     ]
   },
   "naples-wrong": {
     id: "naples-wrong",
     title: "🤔 Not quite!",
     content: "The answer was Pizza Margherita - topped with tomatoes, mozzarella, and basil to represent the colors of Italy's flag! Don't worry, you'll get the next one!",
     choices: [
       { text: "Continue learning 📚", nextId: "america" }
     ]
   },
   "toppings-intro": {
     id: "toppings-intro",
     title: "🧀 The World of Toppings",
     content: "Before we travel through time, let's explore the magical world of pizza toppings! Did you know that the first pizzas in ancient times were just flatbreads with olive oil and herbs?",
     quiz: {
       question: "Which country is credited with adding tomatoes to pizza?",
       options: [
         { text: "France", correct: false },
         { text: "Italy (after tomatoes came from Americas)", correct: true },
         { text: "Spain", correct: false }
       ]
     }
   },
   "toppings-intro-correct": {
     id: "toppings-intro-correct",
     title: "🍅 Excellent!",
     content: "Correct! Tomatoes came from the Americas and were initially thought to be poisonous in Europe. Italian peasants were the first brave souls to add them to pizza in the 18th century!",
     reward: { code: "TOMATO15", discount: "15% off" },
     choices: [
       { text: "Visit Naples next 🏛️", nextId: "naples" }
     ]
   },
   "toppings-intro-wrong": {
     id: "toppings-intro-wrong",
     title: "📚 Learning moment!",
     content: "It was Italy! Tomatoes traveled from the Americas, and though Europeans were initially suspicious of them, Italian peasants pioneered their use on pizza. What a delicious discovery!",
     choices: [
       { text: "Continue to Naples 🏛️", nextId: "naples" }
     ]
   },
   america: {
     id: "america",
     title: "🗽 Pizza Comes to America",
     content: "Fast forward to the late 1800s! Italian immigrants are bringing pizza to New York City. The first pizzeria in America is about to open its doors...",
     quiz: {
       question: "What year did America's first pizzeria (Lombardi's) open in NYC?",
       options: [
         { text: "1905", correct: true },
         { text: "1920", correct: false },
         { text: "1950", correct: false }
       ]
     }
   },
   "america-correct": {
     id: "america-correct",
     title: "🎯 Perfect!",
     content: "Lombardi's opened in 1905 on Spring Street in Manhattan! It's still operating today as America's oldest pizzeria. Pizza quickly became a beloved American staple!",
     reward: { code: "NYC1905", discount: "Free garlic bread" },
     choices: [
       { text: "Complete your journey 🏆", nextId: "finale" }
     ]
   },
   "america-wrong": {
     id: "america-wrong",
     title: "📖 History lesson!",
     content: "Lombardi's actually opened in 1905! It's still running today in NYC. After this, pizza spread across America, with each region developing its own unique style.",
     choices: [
       { text: "Finish the adventure 🏆", nextId: "finale" }
     ]
   },
   finale: {
     id: "finale",
     title: "🏆 You've Completed the Journey!",
     content: "From ancient Naples to modern Pizza Nova, you've traveled through the incredible history of pizza! You've earned your title as a true Pizza Scholar. Here's your final reward!",
     reward: { code: "PIZZAMASTER", discount: "20% off your next order" },
     isEnd: true
   }
 };
 
 export function PizzaOriginStory() {
   const [isStarted, setIsStarted] = useState(false);
   const [currentNodeId, setCurrentNodeId] = useState("start");
   const [earnedRewards, setEarnedRewards] = useState<{ code: string; discount: string }[]>([]);
   const [quizAnswered, setQuizAnswered] = useState(false);
 
   const currentNode = storyData[currentNodeId];
 
   const handleChoice = (nextId: string) => {
     setQuizAnswered(false);
     setCurrentNodeId(nextId);
   };
 
   const handleQuizAnswer = (correct: boolean) => {
     setQuizAnswered(true);
     const nextId = `${currentNodeId}-${correct ? 'correct' : 'wrong'}`;
     setTimeout(() => {
       setCurrentNodeId(nextId);
       setQuizAnswered(false);
     }, 1000);
   };
 
   const claimReward = (reward: { code: string; discount: string }) => {
     if (!earnedRewards.find(r => r.code === reward.code)) {
       setEarnedRewards([...earnedRewards, reward]);
       toast({
         title: "🎁 Reward Unlocked!",
         description: `Use code ${reward.code} for ${reward.discount}!`,
       });
     }
   };
 
   const resetGame = () => {
     setIsStarted(false);
     setCurrentNodeId("start");
     setEarnedRewards([]);
     setQuizAnswered(false);
   };
 
   return (
     <AnimatedSection className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10">
       <div className="container-main px-4">
         <div className="text-center mb-12">
           <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
             <BookOpen className="w-4 h-4" />
             Interactive Story
           </span>
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
             Pizza <span className="text-primary">Origin Story</span> Game
           </h2>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
             Embark on an interactive journey through pizza history! Answer quizzes to unlock exclusive discounts.
           </p>
         </div>
 
         {earnedRewards.length > 0 && (
           <div className="max-w-2xl mx-auto mb-8">
           <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4">
               <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Your Rewards ({earnedRewards.length})</span>
               </div>
               <div className="flex flex-wrap gap-2">
                 {earnedRewards.map((reward, idx) => (
                   <span key={idx} className="bg-white dark:bg-card px-3 py-1 rounded-full text-sm font-mono text-primary">
                     {reward.code}: {reward.discount}
                   </span>
                 ))}
               </div>
             </div>
           </div>
         )}
 
         <div className="max-w-2xl mx-auto">
           <AnimatePresence mode="wait">
             {!isStarted ? (
               <motion.div
                 key="intro"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="bg-card rounded-3xl shadow-elevated p-8 text-center"
               >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mb-6">
                   <BookOpen className="w-12 h-12 text-white" />
                 </div>
                 <h3 className="text-2xl font-serif font-bold mb-4">Begin Your Pizza Adventure!</h3>
                 <p className="text-muted-foreground mb-6">
                   Travel through time and discover the fascinating history of pizza. 
                   Answer quiz questions correctly to earn exclusive discount codes!
                 </p>
                 <div className="flex items-center justify-center gap-4 mb-8 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-primary" /> 5 min</span>
                   <span className="flex items-center gap-1"><Gift className="w-4 h-4 text-primary" /> 4 rewards</span>
                  <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-primary" /> Fun facts</span>
                 </div>
                 <button
                   onClick={() => setIsStarted(true)}
                   className="btn-hero-primary inline-flex items-center gap-2"
                 >
                   Start Adventure <ChevronRight className="w-5 h-5" />
                 </button>
               </motion.div>
             ) : (
               <motion.div
                 key={currentNodeId}
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -50 }}
                 className="bg-card rounded-3xl shadow-elevated overflow-hidden"
               >
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                   <h3 className="text-2xl font-serif font-bold">{currentNode.title}</h3>
                 </div>
 
                 <div className="p-8">
                   <p className="text-lg text-foreground mb-8 leading-relaxed">
                     {currentNode.content}
                   </p>
 
                   {currentNode.reward && (
                     <motion.div
                       initial={{ scale: 0.9, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 mb-6 text-center"
                     >
                       <Gift className="w-8 h-8 text-primary mx-auto mb-2" />
                       <p className="font-semibold text-foreground">🎁 Reward Unlocked!</p>
                       <p className="text-2xl font-mono font-bold text-primary my-2">{currentNode.reward.code}</p>
                       <p className="text-muted-foreground">{currentNode.reward.discount}</p>
                       <button
                         onClick={() => claimReward(currentNode.reward!)}
                         className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                       >
                         Claim Reward
                       </button>
                     </motion.div>
                   )}
 
                   {currentNode.quiz && !quizAnswered && (
                     <div className="mb-6">
                       <h4 className="font-semibold text-foreground mb-4 text-center">
                         📝 {currentNode.quiz.question}
                       </h4>
                       <div className="grid gap-3">
                         {currentNode.quiz.options.map((option, idx) => (
                           <motion.button
                             key={idx}
                             whileHover={{ scale: 1.02 }}
                             whileTap={{ scale: 0.98 }}
                             onClick={() => handleQuizAnswer(option.correct)}
                             className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
                           >
                             {option.text}
                           </motion.button>
                         ))}
                       </div>
                     </div>
                   )}
 
                   {quizAnswered && (
                     <div className="text-center py-4">
                       <motion.div
                         animate={{ rotate: 360 }}
                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                         className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"
                       />
                       <p className="mt-2 text-muted-foreground">Loading next chapter...</p>
                     </div>
                   )}
 
                   {currentNode.choices && !currentNode.quiz && (
                     <div className="grid gap-3">
                       {currentNode.choices.map((choice, idx) => (
                         <motion.button
                           key={idx}
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           onClick={() => handleChoice(choice.nextId)}
                          className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-between"
                         >
                           <span>{choice.text}</span>
                           <ChevronRight className="w-5 h-5 text-muted-foreground" />
                         </motion.button>
                       ))}
                     </div>
                   )}
 
                   {currentNode.isEnd && (
                     <div className="text-center">
                       <button
                         onClick={resetGame}
                         className="btn-hero-primary"
                       >
                         Play Again
                       </button>
                     </div>
                   )}
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
       </div>
     </AnimatedSection>
   );
 }