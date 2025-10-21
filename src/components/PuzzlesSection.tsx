import { motion, AnimatePresence } from 'motion/react';
import { Progress } from './ui/progress';
import { PuzzleCard } from './PuzzleCard';
import { Sparkles } from 'lucide-react';

interface PuzzlesSectionProps {
  completedPuzzles: number[];
  onPuzzleComplete: (puzzleId: number) => void;
  allComplete: boolean;
}

const puzzles = [
  {
    id: 1,
    title: "Puzzle 1: The Haunted Math",
    question: "A ghost, a skeleton, and a vampire go trick-or-treating. The ghost gets 3 times as many candies as the skeleton. The vampire gets 5 more candies than the ghost. If the skeleton gets 7 candies, how many candies does the vampire get?",
    answer: "26",
    hint: "First find how many the ghost gets, then add 5 for the vampire."
  },
  {
    id: 2,
    title: "Puzzle 2: The Pattern of Shadows",
    question: "Find the next number in this cursed sequence: 2, 6, 12, 20, 30, ?",
    answer: "42",
    hint: "Look at the differences between consecutive numbers."
  },
  {
    id: 3,
    title: "Puzzle 3: The Witch's Cipher",
    question: "Decode this message: KIUNPPM",
    answer: "PUMPKIN",
    hint: "Unscrabble those letters girl."
  },
  {
    id: 4,
    title: "Puzzle 4: Who am I?",
    question: "You can’t see me, but I’m always near. I whisper softly right in your ear. I’ll open doors and chill your spine, But really, I just want to boo your mind.",
    answer: "Ghost",
    hint: "OOoOOOOOoooOOOoooOOoOoOOOOOoooo."
  },
  {
    id: 5,
    title: "Puzzle 5: The Jack-o'-Lantern Count",
    question: "You have 50 pumpkins. You carve every 2nd pumpkin, then paint every 3rd pumpkin. How many pumpkins are both carved AND painted?",
    answer: "8",
    hint: "Find pumpkins divisible by both 2 and 3 (i.e., divisible by 6)."
  }
];

export function PuzzlesSection({ completedPuzzles, onPuzzleComplete, allComplete }: PuzzlesSectionProps) {
  const progress = (completedPuzzles.length / puzzles.length) * 100;

  return (
    <section id="puzzles" className="relative min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-[#FF7518] mb-6"
            style={{ 
              fontFamily: "'Creepster', cursive",
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              textShadow: '0 0 15px rgba(255, 117, 24, 0.4)'
            }}
          >
            🕸️ The Five Trials 🕸️
          </h2>
          
          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-4">
            <Progress value={progress} className="h-3 bg-[#3A0CA3]/30" />
          </div>
          
          {/* Pumpkin progress icons */}
          <div className="flex justify-center gap-3 mb-8">
            {puzzles.map((puzzle) => (
              <motion.div
                key={puzzle.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: puzzle.id * 0.1 }}
              >
                <span 
                  className="text-3xl transition-all duration-300"
                  style={{
                    filter: completedPuzzles.includes(puzzle.id) 
                      ? 'drop-shadow(0 0 8px rgba(255, 117, 24, 0.8))' 
                      : 'grayscale(1) opacity(0.3)'
                  }}
                >
                  🎃
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Puzzle cards */}
        <div className="space-y-6">
          {puzzles.map((puzzle, index) => {
            const isUnlocked = index === 0 || completedPuzzles.includes(index);
            const isCompleted = completedPuzzles.includes(puzzle.id);
            
            return (
              <PuzzleCard
                key={puzzle.id}
                puzzle={puzzle}
                isUnlocked={isUnlocked}
                isCompleted={isCompleted}
                onComplete={() => onPuzzleComplete(puzzle.id)}
              />
            );
          })}
        </div>

        {/* Success animation */}
        <AnimatePresence>
          {allComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-16 text-center"
            >
              <motion.div
                className="inline-block relative"
                animate={{ 
                  rotate: [0, -5, 5, -5, 5, 0],
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <span className="text-8xl">🎃</span>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 text-[#FF7518]" />
                </motion.div>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#F8F8FF] mt-6 mb-4"
                style={{ 
                  fontFamily: "'Creepster', cursive",
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  textShadow: '0 0 20px rgba(248, 248, 255, 0.5)'
                }}
              >
                You did it! Your invitation awaits…
              </motion.h3>
              
              <motion.div
                className="text-[#FF7518] text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                ⬇️ Scroll down to claim your prize ⬇️
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
