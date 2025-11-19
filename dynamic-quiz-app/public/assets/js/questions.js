/**
 * Question bank for the Dynamic Quiz Application.
 * -------------------------------------------------------------------
 * Structure:
 * {
 *   Category: {
 *     difficulty: [
 *       {
 *         id: string,
 *         question: string,
 *         choices: string[],
 *         correctAnswer: number (index in choices),
 *         explanation: string
 *       }
 *     ]
 *   }
 * }
 *
 * To add questions:
 * 1. Pick the category (create a new key if needed).
 * 2. Choose the difficulty level.
 * 3. Push another object following the shape above.
 * 4. Keep IDs unique to avoid cache collisions.
 *
 * To remove questions simply delete the corresponding object.
 */

const questionBank = {
  Math: {
    easy: [
      {
        id: "math-e-1",
        question: "What is 8 + 5?",
        choices: ["11", "12", "13", "14"],
        correctAnswer: 2,
        explanation: "Adding 8 and 5 results in 13.",
      },
      {
        id: "math-e-2",
        question: "Solve: 9 × 2",
        choices: ["16", "17", "18", "21"],
        correctAnswer: 2,
        explanation: "Nine groups of two equal 18.",
      },
      {
        id: "math-e-3",
        question: "What is the value of 12 − 7?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: 2,
        explanation: "Subtracting 7 from 12 equals 5.",
      },
      {
        id: "math-e-4",
        question: "Which number is even?",
        choices: ["13", "21", "42", "57"],
        correctAnswer: 2,
        explanation: "42 is divisible by 2, hence even.",
      },
    ],
    medium: [
      {
        id: "math-m-1",
        question: "Solve for x: 3x + 5 = 20",
        choices: ["3", "4", "5", "6"],
        correctAnswer: 3,
        explanation: "3x = 15, so x = 5.",
      },
      {
        id: "math-m-2",
        question: "What is the area of a rectangle with length 12 and width 4?",
        choices: ["16", "32", "42", "48"],
        correctAnswer: 3,
        explanation: "Area = length × width = 12 × 4 = 48.",
      },
      {
        id: "math-m-3",
        question: "Simplify: 56 ÷ 7",
        choices: ["7", "8", "9", "10"],
        correctAnswer: 1,
        explanation: "56 divided by 7 equals 8.",
      },
      {
        id: "math-m-4",
        question: "What is 25% of 240?",
        choices: ["50", "55", "60", "65"],
        correctAnswer: 2,
        explanation: "25% is one-fourth, so 240 ÷ 4 = 60.",
      },
    ],
    hard: [
      {
        id: "math-h-1",
        question: "If f(x) = 2x² − 3x + 1, what is f(4)?",
        choices: ["21", "23", "25", "27"],
        correctAnswer: 0,
        explanation: "f(4) = 2(16) − 12 + 1 = 21.",
      },
      {
        id: "math-h-2",
        question: "What is the derivative of 4x³?",
        choices: ["12x²", "3x²", "4x²", "12x³"],
        correctAnswer: 0,
        explanation: "Power rule: 3 × 4 = 12, so 12x².",
      },
      {
        id: "math-h-3",
        question: "Solve for x: 2^(x+1) = 32",
        choices: ["3", "4", "5", "6"],
        correctAnswer: 2,
        explanation: "32 = 2^5, so x + 1 = 5 → x = 4.",
      },
      {
        id: "math-h-4",
        question: "What is the determinant of [[2,3],[5,4]]?",
        choices: ["-7", "-8", "7", "8"],
        correctAnswer: 1,
        explanation: "Determinant = (2×4) − (3×5) = 8 − 15 = −7.",
      },
    ],
  },
  General: {
    easy: [
      {
        id: "gen-e-1",
        question: "What color do you get by mixing red and blue?",
        choices: ["Purple", "Green", "Orange", "Yellow"],
        correctAnswer: 0,
        explanation: "Red + blue creates purple.",
      },
      {
        id: "gen-e-2",
        question: "How many days are in a leap year?",
        choices: ["364", "365", "366", "367"],
        correctAnswer: 2,
        explanation: "Leap years have 366 days.",
      },
      {
        id: "gen-e-3",
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: 1,
        explanation: "Mars appears red due to iron oxide.",
      },
      {
        id: "gen-e-4",
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correctAnswer: 2,
        explanation: "Paris is the capital city of France.",
      },
    ],
    medium: [
      {
        id: "gen-m-1",
        question: "Who wrote '1984'?",
        choices: ["Aldous Huxley", "George Orwell", "Mark Twain", "J.K. Rowling"],
        correctAnswer: 1,
        explanation: "George Orwell authored '1984'.",
      },
      {
        id: "gen-m-2",
        question: "Which ocean is the deepest?",
        choices: ["Atlantic", "Arctic", "Indian", "Pacific"],
        correctAnswer: 3,
        explanation: "The Pacific Ocean contains the Mariana Trench.",
      },
      {
        id: "gen-m-3",
        question: "What is the smallest prime number?",
        choices: ["0", "1", "2", "3"],
        correctAnswer: 2,
        explanation: "2 is the smallest and even prime number.",
      },
      {
        id: "gen-m-4",
        question: "Which language has the most native speakers?",
        choices: ["English", "Mandarin Chinese", "Spanish", "Hindi"],
        correctAnswer: 1,
        explanation: "Mandarin Chinese has the highest number of native speakers.",
      },
    ],
    hard: [
      {
        id: "gen-h-1",
        question: "Which treaty ended World War I?",
        choices: [
          "Treaty of Tordesillas",
          "Treaty of Versailles",
          "Treaty of Paris",
          "Treaty of Utrecht",
        ],
        correctAnswer: 1,
        explanation: "The Treaty of Versailles ended WWI in 1919.",
      },
      {
        id: "gen-h-2",
        question: "What is the longest river in Asia?",
        choices: ["Mekong", "Yangtze", "Ganges", "Yellow"],
        correctAnswer: 1,
        explanation: "The Yangtze River is Asia's longest.",
      },
      {
        id: "gen-h-3",
        question: "Who developed the polio vaccine in 1952?",
        choices: ["Alexander Fleming", "Louis Pasteur", "Jonas Salk", "Edward Jenner"],
        correctAnswer: 2,
        explanation: "Jonas Salk created the first successful polio vaccine.",
      },
      {
        id: "gen-h-4",
        question: "The term 'DNA fingerprinting' was coined by which geneticist?",
        choices: ["James Watson", "Alec Jeffreys", "Francis Crick", "Rosalind Franklin"],
        correctAnswer: 1,
        explanation: "Sir Alec Jeffreys introduced DNA fingerprinting in 1984.",
      },
    ],
  },
  Science: {
    easy: [
      {
        id: "sci-e-1",
        question: "Water boils at what temperature in Celsius?",
        choices: ["50°C", "75°C", "100°C", "150°C"],
        correctAnswer: 2,
        explanation: "At standard pressure, water boils at 100°C.",
      },
      {
        id: "sci-e-2",
        question: "What gas do plants absorb from the atmosphere?",
        choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        correctAnswer: 2,
        explanation: "Plants use carbon dioxide for photosynthesis.",
      },
      {
        id: "sci-e-3",
        question: "Which part of the plant conducts photosynthesis?",
        choices: ["Roots", "Stems", "Leaves", "Flowers"],
        correctAnswer: 2,
        explanation: "Most photosynthesis happens in leaves.",
      },
      {
        id: "sci-e-4",
        question: "How many planets are in our solar system?",
        choices: ["7", "8", "9", "10"],
        correctAnswer: 1,
        explanation: "There are eight recognized planets.",
      },
    ],
    medium: [
      {
        id: "sci-m-1",
        question: "What is the chemical symbol for sodium?",
        choices: ["So", "Sn", "Na", "S"],
        correctAnswer: 2,
        explanation: "Sodium's Latin name is Natrium, symbol Na.",
      },
      {
        id: "sci-m-2",
        question: "Which organelle is known as the powerhouse of the cell?",
        choices: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
        correctAnswer: 2,
        explanation: "Mitochondria generate ATP through respiration.",
      },
      {
        id: "sci-m-3",
        question: "What law states that pressure and volume are inversely related?",
        choices: ["Ohm's Law", "Boyle's Law", "Newton's First Law", "Hooke's Law"],
        correctAnswer: 1,
        explanation: "Boyle's Law describes the inverse relationship.",
      },
      {
        id: "sci-m-4",
        question: "Which vitamin is primarily synthesized from sunlight exposure?",
        choices: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
        correctAnswer: 2,
        explanation: "Vitamin D synthesis is triggered by UV light.",
      },
    ],
    hard: [
      {
        id: "sci-h-1",
        question: "Which particle mediates the strong nuclear force?",
        choices: ["Photon", "Gluon", "Graviton", "Boson"],
        correctAnswer: 1,
        explanation: "Gluons transmit the strong force between quarks.",
      },
      {
        id: "sci-h-2",
        question: "What is the second law of thermodynamics about?",
        choices: [
          "Conservation of energy",
          "Entropy increase",
          "Action-reaction",
          "Mass-energy equivalence",
        ],
        correctAnswer: 1,
        explanation: "The second law states entropy of an isolated system never decreases.",
      },
      {
        id: "sci-h-3",
        question: "Which scientist proposed the uncertainty principle?",
        choices: ["Einstein", "Bohr", "Heisenberg", "Schrödinger"],
        correctAnswer: 2,
        explanation: "Werner Heisenberg formulated the principle in 1927.",
      },
      {
        id: "sci-h-4",
        question: "What is the pH of a neutral solution at 25°C?",
        choices: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation: "Neutral pH corresponds to 7 at room temperature.",
      },
    ],
  },
};

export default questionBank;

