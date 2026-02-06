import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Pizza, RotateCcw, Share2, Star, Trophy, Flame, Gift } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { toast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: { text: string; traits: string[] }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "It's Friday night. What's your vibe?",
    options: [
      { text: "🎉 Party mode - dancing till dawn!", traits: ["bold", "spicy", "adventurous"] },
      { text: "🎬 Cozy movie marathon at home", traits: ["comfort", "classic", "warm"] },
      { text: "📚 Deep conversation with close friends", traits: ["rich", "complex", "sophisticated"] },
      { text: "🌙 Spontaneous midnight adventure", traits: ["unexpected", "fusion", "creative"] }
    ]
  },
  {
    id: 2,
    question: "Pick your ideal travel destination:",
    options: [
      { text: "🇮🇹 Italy - for the art and pasta", traits: ["classic", "authentic", "traditional"] },
      { text: "🇹🇭 Thailand - for the street food", traits: ["spicy", "bold", "exotic"] },
      { text: "🇯🇵 Japan - for the precision and zen", traits: ["delicate", "umami", "balanced"] },
      { text: "🇲🇽 Mexico - for the colors and fiesta", traits: ["vibrant", "zesty", "fun"] }
    ]
  },
  {
    id: 3,
    question: "Your friends would describe you as:",
    options: [
      { text: "The life of the party 🎊", traits: ["bold", "spicy", "extrovert"] },
      { text: "The reliable one everyone trusts 💪", traits: ["classic", "comfort", "warm"] },
      { text: "The creative soul with wild ideas 🎨", traits: ["fusion", "unexpected", "creative"] },
      { text: "The chill one who goes with the flow 🌊", traits: ["balanced", "fresh", "light"] }
    ]
  },
  {
    id: 4,
    question: "Pick a superpower:",
    options: [
      { text: "🔥 Control fire - bold and powerful", traits: ["spicy", "bold", "intense"] },
      { text: "🌿 Talk to plants - connected to nature", traits: ["fresh", "herbal", "garden"] },
      { text: "⏰ Time travel - endless possibilities", traits: ["fusion", "adventurous", "complex"] },
      { text: "❤️ Heal others - spreading warmth", traits: ["comfort", "warm", "sweet"] }
    ]
  },
  {
    id: 5,
    question: "Your perfect pizza night soundtrack?",
    options: [
      { text: "🎸 Rock classics - headbanging energy", traits: ["bold", "intense", "powerful"] },
      { text: "🎷 Jazz - smooth and sophisticated", traits: ["rich", "complex", "sophisticated"] },
      { text: "🎵 Pop hits - fun and catchy", traits: ["fun", "fresh", "vibrant"] },
      { text: "🎻 Lo-fi beats - chill and cozy", traits: ["comfort", "warm", "balanced"] }
    ]
  }
];

interface FlavorProfile {
  name: string;
  description: string;
  pizza: string;
  color: string;
  emoji: string;
  xp: number;
  badge: string;
  streakReward: string;
  coupon: string;
  discount: string;
}

const flavorProfiles: Record<string, FlavorProfile> = {
  "bold-spicy": {
    name: "The Nova Inferno Soul",
    description: "You're bold, daring, and not afraid to turn up the heat! Life's too short for bland experiences.",
    pizza: "Nova Inferno Twist with jalapeños, sriracha drizzle, and fiery red peppers 🔥",
    color: "from-red-500 to-orange-500",
    emoji: "🌶️",
    xp: 75,
    badge: "🔥 Inferno Badge",
    streakReward: "Order your match 3 times → Free spicy topping upgrade",
    coupon: "INFERNO15",
    discount: "15% off your Nova Inferno Twist",
  },
  "classic-comfort": {
    name: "The Timeless Romantic",
    description: "You appreciate the classics and find beauty in simplicity. Authentic flavors speak to your soul.",
    pizza: "Golden Margherita with fresh basil, heirloom tomatoes, and truffle honey drizzle 🍃",
    color: "from-amber-500 to-yellow-500",
    emoji: "🧀",
    xp: 50,
    badge: "🧀 Classic Badge",
    streakReward: "Order your match 3 times → Free garlic bread",
    coupon: "CLASSIC10",
    discount: "10% off your Golden Margherita",
  },
  "fusion-creative": {
    name: "The Flavor Alchemist",
    description: "Rules? What rules? You love mixing the unexpected and creating magic from chaos!",
    pizza: "Fusion Fantasy with Thai peanut sauce, kimchi, and maple-glazed tofu 🎨",
    color: "from-purple-500 to-pink-500",
    emoji: "✨",
    xp: 65,
    badge: "✨ Alchemist Badge",
    streakReward: "Order your match 3 times → Free custom topping combo",
    coupon: "FUSION20",
    discount: "20% off your Fusion Fantasy",
  },
  "fresh-balanced": {
    name: "The Zen Foodie",
    description: "Balance is your mantra. You seek harmony in every bite and appreciate mindful eating.",
    pizza: "Garden Harmony with roasted vegetables, pesto swirl, and lemon zest 🌿",
    color: "from-green-500 to-teal-500",
    emoji: "🥗",
    xp: 55,
    badge: "🌿 Zen Badge",
    streakReward: "Order your match 3 times → Free fresh juice",
    coupon: "ZEN15",
    discount: "15% off your Garden Harmony",
  },
  "rich-sophisticated": {
    name: "The Gourmet Explorer",
    description: "You have refined taste and appreciate the finer things. Every meal is an experience to savor.",
    pizza: "Truffle Royale with wild mushrooms, aged balsamic, and gold leaf garnish 👑",
    color: "from-amber-600 to-rose-600",
    emoji: "🍷",
    xp: 70,
    badge: "👑 Gourmet Badge",
    streakReward: "Order your match 3 times → Free dessert upgrade",
    coupon: "GOURMET20",
    discount: "20% off your Truffle Royale",
  },
};

export function FlavorPersonalityMatcher() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [result, setResult] = useState<FlavorProfile | null>(null);

  const handleAnswer = (traits: string[]) => {
    const newAnswers = [...answers, traits];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers: string[][]) => {
    const traitCounts: Record<string, number> = {};
    allAnswers.flat().forEach(trait => {
      traitCounts[trait] = (traitCounts[trait] || 0) + 1;
    });

    const sortedTraits = Object.entries(traitCounts).sort((a, b) => b[1] - a[1]);
    const topTraits = sortedTraits.slice(0, 2).map(t => t[0]);

    let profileKey = "classic-comfort";
    if (topTraits.includes("spicy") || topTraits.includes("bold")) {
      profileKey = "bold-spicy";
    } else if (topTraits.includes("fusion") || topTraits.includes("creative") || topTraits.includes("unexpected")) {
      profileKey = "fusion-creative";
    } else if (topTraits.includes("fresh") || topTraits.includes("balanced") || topTraits.includes("light")) {
      profileKey = "fresh-balanced";
    } else if (topTraits.includes("rich") || topTraits.includes("sophisticated") || topTraits.includes("complex")) {
      profileKey = "rich-sophisticated";
    }

    setResult(flavorProfiles[profileKey]);
  };

  const resetQuiz = () => {
    setIsStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <AnimatedSection className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container-main px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            AI Flavor Match
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Discover Your <span className="text-primary">Pizza Personality</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Answer 5 fun questions and let our AI reveal your unique flavor profile with exclusive rewards!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!isStarted && !result && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card rounded-3xl shadow-elevated p-8 text-center"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mb-6">
                  <Pizza className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Ready to Find Your Flavor?</h3>
                <p className="text-muted-foreground mb-6">
                  This isn't just any quiz — it's a journey into your taste soul! 
                  Earn Nova Points, unlock your Personality Badge, and get an exclusive coupon!
                </p>
                <div className="flex items-center justify-center gap-4 mb-8 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-primary" /> +50-75 XP</span>
                  <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-primary" /> Badge</span>
                  <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-primary" /> Streak Rewards</span>
                </div>
                <button
                  onClick={() => setIsStarted(true)}
                  className="btn-hero-primary inline-flex items-center gap-2"
                >
                  Start the Quiz <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {isStarted && !result && (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-card rounded-3xl shadow-elevated p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <div className="flex gap-1">
                    {questions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-2 rounded-full transition-colors ${
                          idx <= currentQuestion ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-serif font-bold mb-8 text-center">
                  {questions[currentQuestion].question}
                </h3>

                <div className="grid gap-3">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.traits)}
                      className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <span className="text-lg">{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-3xl shadow-elevated overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${result.color} p-8 text-white text-center`}>
                  <span className="text-6xl mb-4 block">{result.emoji}</span>
                  <h3 className="text-3xl font-serif font-bold mb-2">{result.name}</h3>
                  <p className="text-white/90">{result.description}</p>
                </div>

                <div className="p-8">
                  {/* Pizza Match */}
                  <div className="bg-primary/5 rounded-2xl p-6 mb-6">
                    <h4 className="font-semibold text-foreground mb-2">🍕 Your Perfect Pizza Match:</h4>
                    <p className="text-lg text-primary font-medium">{result.pizza}</p>
                  </div>

                  {/* Loyalty XP Section */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-muted rounded-xl p-4 text-center">
                      <Star className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-2xl font-bold text-primary">+{result.xp}</p>
                      <p className="text-xs text-muted-foreground">Nova Points</p>
                    </div>
                    <div className="bg-muted rounded-xl p-4 text-center">
                      <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-sm font-bold text-foreground">{result.badge}</p>
                      <p className="text-xs text-muted-foreground">Badge Earned</p>
                    </div>
                    <div className="bg-muted rounded-xl p-4 text-center">
                      <Flame className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-sm font-bold text-foreground">3x</p>
                      <p className="text-xs text-muted-foreground">Streak Goal</p>
                    </div>
                  </div>

                  {/* Streak Reward */}
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Flame className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">🔥 Streak Reward</p>
                        <p className="text-sm text-muted-foreground">{result.streakReward}</p>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Reward */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-6 text-center"
                  >
                    <Gift className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold text-foreground">🎁 Exclusive Coupon!</p>
                    <p className="text-2xl font-mono font-bold text-primary my-2">{result.coupon}</p>
                    <p className="text-sm text-muted-foreground">{result.discount}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(result.coupon);
                        toast({
                          title: '🎁 Coupon Copied!',
                          description: `Use code ${result.coupon} for ${result.discount}!`,
                        });
                      }}
                      className="mt-3 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Copy Coupon
                    </button>
                  </motion.div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={resetQuiz}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-border hover:border-primary transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" /> Try Again
                    </button>
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      <Share2 className="w-4 h-4" /> Share Result
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
