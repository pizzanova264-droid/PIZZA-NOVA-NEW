import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Gift, ChevronRight, Star, Trophy, Sparkles, CheckSquare, XSquare, Award, MapPin } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';

// ── Types ──────────────────────────────────────────────────────
interface TaskOption {
  text: string;
  correct: boolean;
}

interface QuizQuestion {
  question: string;
  options: { text: string; correct: boolean }[];
}

interface Level {
  id: number;
  title: string;
  location: string;
  emoji: string;
  scene: string;
  learningObjective: string;
  task: { instruction: string; options: TaskOption[] };
  quizzes: QuizQuestion[];
  feedback: string;
  maxScore: number;
}

type Rank = { title: string; emoji: string; coupon: string; discount: string };

// ── Scoring & Ranking ──────────────────────────────────────────
const RANKS: Rank[] = [
  { title: 'Beginner Explorer', emoji: '🌱', coupon: '', discount: '' },
  { title: 'Pizza Scholar', emoji: '📚', coupon: 'SCHOLAR15', discount: '15% off' },
  { title: 'Flavor Master', emoji: '🎖️', coupon: 'MASTER20', discount: '20% off' },
  { title: 'Nova Historian', emoji: '🏆', coupon: 'HISTORIAN25', discount: '25% off + Secret Menu Access' },
];

function getRank(score: number): Rank {
  if (score >= 71) return RANKS[3];
  if (score >= 56) return RANKS[2];
  if (score >= 31) return RANKS[1];
  return RANKS[0];
}

// ── Level Data ─────────────────────────────────────────────────
const levels: Level[] = [
  {
    id: 1,
    title: 'Italy — Birth of Pizza',
    location: 'Naples, Italy – 1889',
    emoji: '🇮🇹',
    scene:
      'Pizza began as simple flatbread for common people in Italy. When Queen Margherita visited Naples, a chef named Raffaele Esposito was asked to prepare a special dish for her. He created a pizza using ingredients that represented the Italian flag.\n\nYou will help choose the ingredients and understand why this pizza became famous worldwide.',
    learningObjective:
      'Understand the historical origin of pizza and the creation of Margherita pizza.',
    task: {
      instruction: 'Select the ingredients used in the original Margherita pizza:',
      options: [
        { text: '🍅 Tomato Sauce', correct: true },
        { text: '🧀 Mozzarella Cheese', correct: true },
        { text: '🌿 Basil Leaves', correct: true },
        { text: '🍄 Mushrooms', correct: false },
      ],
    },
    quizzes: [
      {
        question: 'Who created the Margherita pizza?',
        options: [
          { text: 'Marco Polo', correct: false },
          { text: 'Raffaele Esposito', correct: true },
          { text: 'Leonardo da Vinci', correct: false },
        ],
      },
      {
        question: 'Which country is the origin of pizza?',
        options: [
          { text: 'France', correct: false },
          { text: 'Italy', correct: true },
          { text: 'Spain', correct: false },
        ],
      },
      {
        question: 'What do the Margherita pizza colors represent?',
        options: [
          { text: 'The French flag', correct: false },
          { text: 'The Italian flag', correct: true },
          { text: 'A rainbow', correct: false },
        ],
      },
      {
        question: 'When was the Margherita pizza first created?',
        options: [
          { text: '1789', correct: false },
          { text: '1889', correct: true },
          { text: '1989', correct: false },
        ],
      },
      {
        question: 'What was pizza originally made for?',
        options: [
          { text: 'Royalty only', correct: false },
          { text: 'Common people as simple flatbread', correct: true },
          { text: 'Military rations', correct: false },
        ],
      },
    ],
    feedback:
      'The Margherita pizza uses tomato (red), mozzarella (white), and basil (green), representing the Italian national flag. This dish was created to honor Queen Margherita of Italy!',
    maxScore: 20,
  },
  {
    id: 2,
    title: 'USA — Global Expansion',
    location: 'New York, USA – 1905',
    emoji: '🇺🇸',
    scene:
      "Italian immigrants brought pizza to the United States. The first American pizzeria opened in New York. Over time, pizza became larger, cheesier, and popular across the country.\n\nNow, you explore how pizza changed in America.",
    learningObjective:
      'Learn how pizza evolved after reaching the United States.',
    task: {
      instruction: 'Choose what changed in American-style pizza:',
      options: [
        { text: '🍞 Bigger crust', correct: true },
        { text: '🧀 Extra cheese', correct: true },
        { text: '🍫 Sweet chocolate topping', correct: false },
        { text: '🍕 Slice serving style', correct: true },
      ],
    },
    quizzes: [
      {
        question: "Where did the first U.S. pizzeria open?",
        options: [
          { text: 'Chicago', correct: false },
          { text: 'New York', correct: true },
          { text: 'Texas', correct: false },
        ],
      },
      {
        question: 'Why did pizza become popular in the USA?',
        options: [
          { text: 'Easy to share and affordable', correct: true },
          { text: 'Very expensive', correct: false },
          { text: 'Only for kings', correct: false },
        ],
      },
      {
        question: "What was America's first pizzeria called?",
        options: [
          { text: "Papa John's", correct: false },
          { text: "Lombardi's", correct: true },
          { text: "Domino's", correct: false },
        ],
      },
      {
        question: 'What year did the first US pizzeria open?',
        options: [
          { text: '1905', correct: true },
          { text: '1920', correct: false },
          { text: '1950', correct: false },
        ],
      },
      {
        question: 'Which pizza style originated in the USA?',
        options: [
          { text: 'Neapolitan thin crust', correct: false },
          { text: 'Deep-dish pizza', correct: true },
          { text: 'Tandoori pizza', correct: false },
        ],
      },
    ],
    feedback:
      'American pizza introduced large slices, heavy cheese, and street-style serving, making it affordable and popular. The deep-dish style from Chicago became an American icon!',
    maxScore: 20,
  },
  {
    id: 3,
    title: 'India — Localization & Fusion',
    location: 'India – Modern Era',
    emoji: '🇮🇳',
    scene:
      'Pizza arrived in India and adapted to local tastes. Ingredients like paneer, capsicum, corn, and spicy sauces were added to match Indian flavor preferences.\n\nNow you will localize pizza for Indian customers.',
    learningObjective:
      'Understand how global food adapts to regional culture.',
    task: {
      instruction: 'Select Indian fusion toppings:',
      options: [
        { text: '🧀 Paneer', correct: true },
        { text: '🫑 Capsicum', correct: true },
        { text: '🌽 Sweet corn', correct: true },
        { text: '🥓 Pepperoni', correct: false },
      ],
    },
    quizzes: [
      {
        question: 'Which ingredient is commonly used in Indian pizza?',
        options: [
          { text: 'Paneer', correct: true },
          { text: 'Fish oil', correct: false },
          { text: 'Blue cheese', correct: false },
        ],
      },
      {
        question: 'What does food localization mean?',
        options: [
          { text: 'Copy food exactly', correct: false },
          { text: 'Adapt food to local taste', correct: true },
          { text: 'Remove all flavor', correct: false },
        ],
      },
      {
        question: 'Which spice blend is popular on Indian pizzas?',
        options: [
          { text: 'Oregano only', correct: false },
          { text: 'Tandoori masala', correct: true },
          { text: 'Cinnamon sugar', correct: false },
        ],
      },
      {
        question: 'What year did major pizza chains enter India?',
        options: [
          { text: '1976', correct: false },
          { text: '1996', correct: true },
          { text: '2010', correct: false },
        ],
      },
      {
        question: 'Why do Indian pizzas often skip beef/pork?',
        options: [
          { text: 'Cost reasons', correct: false },
          { text: 'Cultural & religious preferences', correct: true },
          { text: 'Taste preference only', correct: false },
        ],
      },
    ],
    feedback:
      'Indian pizzas mix international recipes with local spices and vegetables to suit regional taste. Paneer tikka, tandoori flavors, and desi sauces created a whole new pizza culture!',
    maxScore: 20,
  },
  {
    id: 4,
    title: 'Future — AI Pizza Era',
    location: 'Future – Pizza Nova Lab',
    emoji: '🚀',
    scene:
      'In the future, pizza is designed using artificial intelligence. Pizza Nova uses smart systems to analyze mood, health, and personality to create personalized pizzas.\n\nNow you enter the future kitchen.',
    learningObjective:
      'Understand the role of technology in modern food systems.',
    task: {
      instruction: 'Select features of AI pizza:',
      options: [
        { text: '🧠 Mood-based recipes', correct: true },
        { text: '📊 Nutrition tracking', correct: true },
        { text: '✨ Personality matching', correct: true },
        { text: '📝 Manual paper ordering', correct: false },
      ],
    },
    quizzes: [
      {
        question: 'What does AI help with in food systems?',
        options: [
          { text: 'Guess randomly', correct: false },
          { text: 'Personalize experience', correct: true },
          { text: 'Ignore customers', correct: false },
        ],
      },
      {
        question: 'What is smart pizza?',
        options: [
          { text: 'Fixed menu', correct: false },
          { text: 'Personalized pizza using data', correct: true },
          { text: 'Only cheese', correct: false },
        ],
      },
      {
        question: 'Which technology helps track nutrition in real time?',
        options: [
          { text: 'Pen and paper', correct: false },
          { text: 'AI & machine learning', correct: true },
          { text: 'Guesswork', correct: false },
        ],
      },
      {
        question: 'How can AI improve customer satisfaction?',
        options: [
          { text: 'Slower service', correct: false },
          { text: 'Personalized recommendations', correct: true },
          { text: 'Removing menu options', correct: false },
        ],
      },
      {
        question: 'What does Pizza Nova use AI for?',
        options: [
          { text: 'Replacing chefs', correct: false },
          { text: 'Matching pizzas to personality & mood', correct: true },
          { text: 'Making pizza more expensive', correct: false },
        ],
      },
    ],
    feedback:
      'AI allows users to receive pizzas based on lifestyle, health, and taste using technology. Pizza Nova is at the forefront of this delicious revolution!',
    maxScore: 20,
  },
];

// ── Subcomponents ──────────────────────────────────────────────
function LevelProgressBar({ currentLevel, totalLevels }: { currentLevel: number; totalLevels: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: totalLevels }).map((_, i) => (
        <div key={i} className="flex items-center gap-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              i < currentLevel
                ? 'bg-primary text-primary-foreground'
                : i === currentLevel
                ? 'bg-primary/20 text-primary border-2 border-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {i < currentLevel ? '✓' : i + 1}
          </div>
          {i < totalLevels - 1 && (
            <div className={`w-8 h-1 rounded ${i < currentLevel ? 'bg-primary' : 'bg-muted'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export function PizzaOriginStory() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [phase, setPhase] = useState<'scene' | 'task' | 'quiz' | 'feedback' | 'result'>('scene');
  const [taskSelections, setTaskSelections] = useState<boolean[]>([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [levelScores, setLevelScores] = useState<number[]>([]);
  const [currentLevelScore, setCurrentLevelScore] = useState(0);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);

  const level = levels[currentLevelIdx];
  const isLastLevel = currentLevelIdx === levels.length - 1;
  const overallProgress = ((currentLevelIdx) / levels.length) * 100;

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pizza-origin-progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.completed) {
          // Don't auto-resume if completed, let them start fresh
        }
      } catch { /* ignore */ }
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (isStarted) {
      localStorage.setItem('pizza-origin-progress', JSON.stringify({
        currentLevel: currentLevelIdx,
        score,
        levelScores,
      }));
    }
  }, [currentLevelIdx, score, levelScores, isStarted]);

  const startGame = () => {
    setIsStarted(true);
    setPhase('scene');
    setCurrentLevelIdx(0);
    setScore(0);
    setLevelScores([]);
    setCurrentLevelScore(0);
  };

  const startTask = () => {
    setPhase('task');
    setTaskSelections(new Array(level.task.options.length).fill(false));
  };

  const toggleTask = (idx: number) => {
    setTaskSelections(prev => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const submitTask = () => {
    let pts = 0;
    level.task.options.forEach((opt, i) => {
      if (taskSelections[i] === opt.correct) pts += 2.5; // 10 points total for correct task
    });
    const taskScore = Math.round(pts);
    setCurrentLevelScore(taskScore);
    setScore(s => s + taskScore);
    setPhase('quiz');
    setCurrentQuizIdx(0);
    setQuizAnswer(null);
    setShowQuizFeedback(false);
  };

  const answerQuiz = (optionIdx: number) => {
    if (showQuizFeedback) return;
    setQuizAnswer(optionIdx);
    setShowQuizFeedback(true);

    const isCorrect = level.quizzes[currentQuizIdx].options[optionIdx].correct;
    if (isCorrect) {
      const pts = 2; // 5 quizzes × 2 = 10 points
      setCurrentLevelScore(s => s + pts);
      setScore(s => s + pts);
    }

    setTimeout(() => {
      if (currentQuizIdx < level.quizzes.length - 1) {
        setCurrentQuizIdx(q => q + 1);
        setQuizAnswer(null);
        setShowQuizFeedback(false);
      } else {
        setPhase('feedback');
      }
    }, 1200);
  };

  const nextLevel = () => {
    setLevelScores(prev => [...prev, currentLevelScore]);
    setCurrentLevelScore(0);

    if (isLastLevel) {
      setPhase('result');
      localStorage.setItem('pizza-origin-progress', JSON.stringify({ completed: true, score }));
    } else {
      setCurrentLevelIdx(i => i + 1);
      setPhase('scene');
      setCurrentQuizIdx(0);
      setQuizAnswer(null);
      setShowQuizFeedback(false);
    }
  };

  const rank = getRank(score);

  return (
    <AnimatedSection className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="container-main px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            Interactive Learning Module
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Pizza <span className="text-primary">Origin Story</span> Game
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Travel through 4 eras of pizza history. Answer quizzes, earn points, and unlock exclusive rewards!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* ─── Intro Screen ─── */}
            {!isStarted && phase !== 'result' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card rounded-3xl shadow-elevated p-8 text-center"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Begin Your Pizza Adventure!</h3>
                <p className="text-muted-foreground mb-6">
                  Journey through 4 levels — Italy, USA, India, and the Future — answering quizzes and completing interactive tasks to earn up to 80 points.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {levels.map(l => (
                    <div key={l.id} className="bg-muted rounded-xl p-3 text-center">
                      <span className="text-2xl">{l.emoji}</span>
                      <p className="text-xs font-medium text-foreground mt-1">{l.title.split(' — ')[0]}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-primary" /> 80 max points</span>
                  <span className="flex items-center gap-1"><Gift className="w-4 h-4 text-primary" /> Unlock coupons</span>
                  <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-primary" /> 4 levels</span>
                </div>

                <button onClick={startGame} className="btn-hero-primary inline-flex items-center gap-2">
                  Start Adventure <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* ─── Scene Phase ─── */}
            {isStarted && phase === 'scene' && (
              <motion.div
                key={`scene-${level.id}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-card rounded-3xl shadow-elevated overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                  <LevelProgressBar currentLevel={currentLevelIdx} totalLevels={levels.length} />
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{level.emoji}</span>
                    <div>
                      <h3 className="text-2xl font-serif font-bold">Level {level.id}: {level.title}</h3>
                      <p className="text-primary-foreground/80 flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3" /> {level.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-4">
                    <span className="text-xs font-semibold uppercase text-primary tracking-wider">Learning Objective</span>
                    <p className="text-sm text-muted-foreground mt-1">{level.learningObjective}</p>
                  </div>

                  <p className="text-lg text-foreground mb-8 leading-relaxed whitespace-pre-line">{level.scene}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Score: {score}/80</span>
                    <button onClick={startTask} className="btn-hero-primary inline-flex items-center gap-2">
                      Start Task <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── Task Phase ─── */}
            {isStarted && phase === 'task' && (
              <motion.div
                key={`task-${level.id}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-card rounded-3xl shadow-elevated overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5" />
                    <h3 className="text-xl font-serif font-bold">Interactive Task — Level {level.id}</h3>
                  </div>
                </div>

                <div className="p-8">
                  <h4 className="font-semibold text-foreground mb-6 text-lg">{level.task.instruction}</h4>
                  <div className="grid gap-3 mb-8">
                    {level.task.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleTask(idx)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                          taskSelections[idx]
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Checkbox checked={taskSelections[idx]} />
                        <span className="text-lg">{opt.text}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={submitTask}
                    disabled={!taskSelections.some(Boolean)}
                    className="btn-hero-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    👉 Confirm Selection <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── Quiz Phase ─── */}
            {isStarted && phase === 'quiz' && (
              <motion.div
                key={`quiz-${level.id}-${currentQuizIdx}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-card rounded-3xl shadow-elevated overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif font-bold">📝 Quiz — Level {level.id}</h3>
                    <span className="text-sm bg-primary-foreground/20 px-3 py-1 rounded-full">
                      {currentQuizIdx + 1} / {level.quizzes.length}
                    </span>
                  </div>
                  <Progress
                    value={((currentQuizIdx + 1) / level.quizzes.length) * 100}
                    className="mt-3 h-2 bg-primary-foreground/20"
                  />
                </div>

                <div className="p-8">
                  <h4 className="font-semibold text-foreground mb-6 text-lg text-center">
                    {level.quizzes[currentQuizIdx].question}
                  </h4>

                  <div className="grid gap-3">
                    {level.quizzes[currentQuizIdx].options.map((opt, idx) => {
                      let borderColor = 'border-border hover:border-primary/50';
                      if (showQuizFeedback && quizAnswer === idx) {
                        borderColor = opt.correct
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-destructive bg-destructive/10';
                      }
                      if (showQuizFeedback && opt.correct && quizAnswer !== idx) {
                        borderColor = 'border-green-500/50 bg-green-500/5';
                      }

                      return (
                        <motion.button
                          key={idx}
                          whileHover={!showQuizFeedback ? { scale: 1.02 } : {}}
                          whileTap={!showQuizFeedback ? { scale: 0.98 } : {}}
                          onClick={() => answerQuiz(idx)}
                          disabled={showQuizFeedback}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${borderColor} disabled:cursor-default`}
                        >
                          {showQuizFeedback && quizAnswer === idx && (
                            opt.correct
                              ? <CheckSquare className="w-5 h-5 text-green-500 shrink-0" />
                              : <XSquare className="w-5 h-5 text-destructive shrink-0" />
                          )}
                          {showQuizFeedback && opt.correct && quizAnswer !== idx && (
                            <CheckSquare className="w-5 h-5 text-green-500/50 shrink-0" />
                          )}
                          <span>{opt.text}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    Score: {score}/80
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── Feedback Phase ─── */}
            {isStarted && phase === 'feedback' && (
              <motion.div
                key={`feedback-${level.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-card rounded-3xl shadow-elevated overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground text-center">
                  <h3 className="text-2xl font-serif font-bold">✅ Level {level.id} Complete!</h3>
                  <p className="text-primary-foreground/80">{level.title}</p>
                </div>

                <div className="p-8">
                  <div className="bg-primary/5 rounded-2xl p-6 mb-6">
                    <h4 className="font-semibold text-foreground mb-2">📖 What You Learned:</h4>
                    <p className="text-muted-foreground leading-relaxed">{level.feedback}</p>
                  </div>

                  <div className="bg-muted rounded-2xl p-4 mb-6 text-center">
                    <p className="text-sm text-muted-foreground">Level Score</p>
                    <p className="text-3xl font-bold text-primary">{currentLevelScore}/{level.maxScore}</p>
                    <p className="text-sm text-muted-foreground mt-1">Total: {score}/80</p>
                  </div>

                  <div className="text-center">
                    <button onClick={nextLevel} className="btn-hero-primary inline-flex items-center gap-2">
                      {isLastLevel ? '🏆 See Final Results' : 'Next Level →'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── Final Result Screen ─── */}
            {phase === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-3xl shadow-elevated overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary to-accent p-8 text-primary-foreground text-center">
                  <span className="text-6xl block mb-4">{rank.emoji}</span>
                  <h3 className="text-3xl font-serif font-bold mb-2">{rank.title}</h3>
                  <p className="text-primary-foreground/80">You scored {score} out of 80 points!</p>
                </div>

                <div className="p-8">
                  {/* Level Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {levels.map((l, i) => (
                      <div key={l.id} className="bg-muted rounded-xl p-3 text-center">
                        <span className="text-xl">{l.emoji}</span>
                        <p className="text-xs text-muted-foreground mt-1">{l.title.split(' — ')[0]}</p>
                        <p className="text-lg font-bold text-primary">{levelScores[i] ?? 0}/{l.maxScore}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span>100% Complete</span>
                    </div>
                    <Progress value={100} className="h-3" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                      <span>🇮🇹 Italy ✅</span>
                      <span>🇺🇸 USA ✅</span>
                      <span>🇮🇳 India ✅</span>
                      <span>🚀 Future ✅</span>
                    </div>
                  </div>

                  {/* Reward */}
                  {rank.coupon && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-6 text-center"
                    >
                      <Gift className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-foreground">🎁 Reward Unlocked!</p>
                      <p className="text-2xl font-mono font-bold text-primary my-2">{rank.coupon}</p>
                      <p className="text-muted-foreground">{rank.discount}</p>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(rank.coupon);
                          toast({
                            title: '🎁 Coupon Copied!',
                            description: `Use code ${rank.coupon} for ${rank.discount}!`,
                          });
                        }}
                        className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Copy Coupon Code
                      </button>
                    </motion.div>
                  )}

                  {/* Unlocks */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-muted rounded-xl p-3 text-center">
                      <Award className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium">🏅 Badge</p>
                      <p className="text-xs text-muted-foreground">{rank.title}</p>
                    </div>
                    <div className="bg-muted rounded-xl p-3 text-center">
                      <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium">🍕 Secret Menu</p>
                      <p className="text-xs text-muted-foreground">{score >= 56 ? 'Unlocked!' : 'Score 56+'}</p>
                    </div>
                    <div className="bg-muted rounded-xl p-3 text-center">
                      <Gift className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium">🎁 Discount</p>
                      <p className="text-xs text-muted-foreground">{rank.coupon || 'Score 31+'}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <button onClick={startGame} className="btn-hero-primary">
                      Play Again
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatedSection>
  );
}
