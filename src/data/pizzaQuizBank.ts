export interface TaskOption {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  question: string;
  options: { text: string; correct: boolean }[];
}

export interface Level {
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

export const levelBank: Level[] = [
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
      {
        question: 'Which Italian city is the birthplace of pizza?',
        options: [
          { text: 'Rome', correct: false },
          { text: 'Naples', correct: true },
          { text: 'Venice', correct: false },
        ],
      },
      {
        question: 'What type of oven was traditionally used for pizza?',
        options: [
          { text: 'Electric oven', correct: false },
          { text: 'Wood-fired stone oven', correct: true },
          { text: 'Microwave', correct: false },
        ],
      },
      {
        question: 'Who was the Margherita pizza named after?',
        options: [
          { text: 'A famous chef', correct: false },
          { text: 'Queen Margherita of Italy', correct: true },
          { text: 'A flower', correct: false },
        ],
      },
      {
        question: 'What was the original Italian pizza base made from?',
        options: [
          { text: 'Rice flour', correct: false },
          { text: 'Flatbread with olive oil and herbs', correct: true },
          { text: 'Corn tortilla', correct: false },
        ],
      },
      {
        question: 'Which herb is essential in a traditional Margherita?',
        options: [
          { text: 'Rosemary', correct: false },
          { text: 'Fresh basil', correct: true },
          { text: 'Thyme', correct: false },
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
      {
        question: 'Which city is famous for deep-dish pizza?',
        options: [
          { text: 'New York', correct: false },
          { text: 'Chicago', correct: true },
          { text: 'Los Angeles', correct: false },
        ],
      },
      {
        question: 'What made American pizza different from Italian?',
        options: [
          { text: 'Smaller and thinner', correct: false },
          { text: 'Larger with more cheese and toppings', correct: true },
          { text: 'No tomato sauce', correct: false },
        ],
      },
      {
        question: 'How is New York-style pizza typically eaten?',
        options: [
          { text: 'With a fork and knife', correct: false },
          { text: 'Folded in half', correct: true },
          { text: 'Cut into squares', correct: false },
        ],
      },
      {
        question: 'What role did World War II play in pizza\'s popularity?',
        options: [
          { text: 'Pizza was banned', correct: false },
          { text: 'Returning soldiers craved pizza from Italy', correct: true },
          { text: 'No effect at all', correct: false },
        ],
      },
      {
        question: 'Which decade saw pizza delivery become mainstream?',
        options: [
          { text: '1940s', correct: false },
          { text: '1960s', correct: true },
          { text: '1990s', correct: false },
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
        { text: '🧈 Butter only', correct: false },
      ],
    },
    quizzes: [
      {
        question: 'Which ingredient is commonly used in Indian pizza?',
        options: [
          { text: 'Paneer', correct: true },
          { text: 'Tofu only', correct: false },
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
        question: 'Why do Indian pizzas often use vegetarian toppings?',
        options: [
          { text: 'Cost reasons only', correct: false },
          { text: 'Cultural and religious preferences', correct: true },
          { text: 'Taste preference only', correct: false },
        ],
      },
      {
        question: 'Which vegetable is a signature Indian pizza topping?',
        options: [
          { text: 'Artichoke', correct: false },
          { text: 'Capsicum and corn', correct: true },
          { text: 'Asparagus', correct: false },
        ],
      },
      {
        question: 'What sauce variation is unique to Indian pizzas?',
        options: [
          { text: 'Classic marinara only', correct: false },
          { text: 'Tikka and tandoori sauce', correct: true },
          { text: 'Ketchup', correct: false },
        ],
      },
      {
        question: 'Which Indian city was among the first to get pizza chains?',
        options: [
          { text: 'Jaipur', correct: false },
          { text: 'Mumbai', correct: true },
          { text: 'Lucknow', correct: false },
        ],
      },
      {
        question: 'What makes Indian pizza unique globally?',
        options: [
          { text: 'It uses no cheese', correct: false },
          { text: 'Fusion of Italian technique with Indian spices', correct: true },
          { text: 'It is always sweet', correct: false },
        ],
      },
      {
        question: 'What is a popular Indian pizza flavor not found elsewhere?',
        options: [
          { text: 'Hawaiian', correct: false },
          { text: 'Paneer Tikka', correct: true },
          { text: 'Plain cheese', correct: false },
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
          { text: 'AI and machine learning', correct: true },
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
          { text: 'Matching pizzas to personality and mood', correct: true },
          { text: 'Making pizza more expensive', correct: false },
        ],
      },
      {
        question: 'What is the benefit of AI-powered food recommendations?',
        options: [
          { text: 'Random selections', correct: false },
          { text: 'Better matches for individual taste preferences', correct: true },
          { text: 'No benefit', correct: false },
        ],
      },
      {
        question: 'How can data analytics help restaurants?',
        options: [
          { text: 'Increase food waste', correct: false },
          { text: 'Predict demand and reduce food waste', correct: true },
          { text: 'Ignore trends', correct: false },
        ],
      },
      {
        question: 'What technology enables contactless ordering?',
        options: [
          { text: 'Telegram only', correct: false },
          { text: 'Mobile apps and QR codes', correct: true },
          { text: 'Fax machines', correct: false },
        ],
      },
      {
        question: 'How might IoT devices improve kitchen operations?',
        options: [
          { text: 'Play music only', correct: false },
          { text: 'Real-time monitoring of cooking temperatures', correct: true },
          { text: 'No improvement', correct: false },
        ],
      },
      {
        question: 'What role does sustainability play in future food tech?',
        options: [
          { text: 'No role', correct: false },
          { text: 'Reducing environmental impact through smart logistics', correct: true },
          { text: 'Increasing packaging waste', correct: false },
        ],
      },
    ],
    feedback:
      'AI allows users to receive pizzas based on lifestyle, health, and taste using technology. Pizza Nova is at the forefront of this delicious revolution!',
    maxScore: 20,
  },
];
