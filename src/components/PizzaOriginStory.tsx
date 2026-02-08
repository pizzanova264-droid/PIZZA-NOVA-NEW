import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Gift, ChevronRight, Star, Trophy, Sparkles, CheckSquare, XSquare, Award, MapPin } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { levelBank, type Level } from '@/data/pizzaQuizBank';

// ── Scoring & Ranking ──────────────────────────────────────────
type Rank = { title: string; emoji: string; coupon: string; discount: string };

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

// ── Shuffle Utility ────────────────────────────────────────────
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getShuffledLevels(): Level[] {
  return levelBank.map(level => ({
    ...level,
    quizzes: shuffleArray(level.quizzes).slice(0, 5),
  }));
}

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
  const [levels, setLevels] = useState<Level[]>(() => getShuffledLevels());
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
    setLevels(getShuffledLevels());
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
      if (taskSelections[i] === opt.correct) pts += 2.5;
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
      const pts = 2;
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
            Pizza <span className="text-primary">Adventure</span>
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
                  Journey through 4 levels — Italy, USA, India, and the Future — answering quizzes and completing interactive tasks to earn up to 80 points. Questions change every time you play!
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
                    Confirm Selection <ChevronRight className="w-5 h-5" />
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
                    <h3 className="text-xl font-serif font-bold">Quiz — Level {level.id}</h3>
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
                  <h3 className="text-2xl font-serif font-bold">Level {level.id} Complete!</h3>
                  <p className="text-primary-foreground/80">{level.title}</p>
                </div>

                <div className="p-8">
                  <div className="bg-primary/5 rounded-2xl p-6 mb-6">
                    <h4 className="font-semibold text-foreground mb-2">What You Learned:</h4>
                    <p className="text-muted-foreground leading-relaxed">{level.feedback}</p>
                  </div>

                  <div className="bg-muted rounded-2xl p-4 mb-6 text-center">
                    <p className="text-sm text-muted-foreground">Level Score</p>
                    <p className="text-3xl font-bold text-primary">{currentLevelScore}/{level.maxScore}</p>
                    <p className="text-sm text-muted-foreground mt-1">Total: {score}/80</p>
                  </div>

                  <div className="text-center">
                    <button onClick={nextLevel} className="btn-hero-primary inline-flex items-center gap-2">
                      {isLastLevel ? 'See Final Results' : 'Next Level →'}
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {levels.map((l, i) => (
                      <div key={l.id} className="bg-muted rounded-xl p-3 text-center">
                        <span className="text-xl">{l.emoji}</span>
                        <p className="text-xs text-muted-foreground mt-1">{l.title.split(' — ')[0]}</p>
                        <p className="text-lg font-bold text-primary">{levelScores[i] ?? 0}/{l.maxScore}</p>
                      </div>
                    ))}
                  </div>

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

                  {rank.coupon && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-6 text-center"
                    >
                      <Gift className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-foreground">Reward Unlocked!</p>
                      <p className="text-2xl font-mono font-bold text-primary my-2">{rank.coupon}</p>
                      <p className="text-muted-foreground">{rank.discount}</p>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(rank.coupon);
                          toast({
                            title: 'Coupon Copied!',
                            description: `Use code ${rank.coupon} for ${rank.discount}!`,
                          });
                        }}
                        className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Copy Coupon Code
                      </button>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-muted rounded-xl p-3 text-center">
                      <Award className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium">Badge</p>
                      <p className="text-xs text-muted-foreground">{rank.title}</p>
                    </div>
                    <div className="bg-muted rounded-xl p-3 text-center">
                      <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium">Secret Menu</p>
                      <p className="text-xs text-muted-foreground">{score >= 56 ? 'Unlocked!' : 'Score 56+'}</p>
                    </div>
                    <div className="bg-muted rounded-xl p-3 text-center">
                      <Gift className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium">Discount</p>
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
