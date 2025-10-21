import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Lock, Check, HelpCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Puzzle {
  id: number;
  title: string;
  question: string;
  answer: string;
  hint: string;
}

interface PuzzleCardProps {
  puzzle: Puzzle;
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: () => void;
}

export function PuzzleCard({ puzzle, isUnlocked, isCompleted, onComplete }: PuzzleCardProps) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = () => {
    const normalizedAnswer = answer.trim().toUpperCase();
    const correctAnswer = puzzle.answer.toUpperCase();

    if (normalizedAnswer === correctAnswer) {
      toast.success('🎃 Correct! The puzzle is solved!', {
        description: 'The next trial awaits...',
      });
      onComplete();
      setAnswer('');
    } else {
      toast.error('👻 Not quite right...', {
        description: 'Try again, brave soul!',
      });
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  if (!isUnlocked && !isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[#0B0B0B]/80 border-2 border-[#3A0CA3]/30 p-6 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-center gap-3 text-[#3A0CA3]/50">
            <Lock className="w-6 h-6" />
            <span className="text-lg">Locked - Complete the previous puzzle</span>
          </div>
          
          {/* Locked overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3A0CA3]/10 to-transparent pointer-events-none" />
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={!isCompleted ? { scale: 1.02 } : {}}
    >
      <Card 
        className={`
          border-2 p-6 backdrop-blur-sm relative overflow-hidden transition-all duration-300
          ${isCompleted 
            ? 'bg-[#FF7518]/10 border-[#FF7518]/50 shadow-[0_0_30px_rgba(255,117,24,0.3)]' 
            : 'bg-[#0B0B0B]/80 border-[#3A0CA3]/50 hover:border-[#FF7518]/50 shadow-[0_0_20px_rgba(58,12,163,0.2)]'
          }
        `}
        style={isShaking ? { animation: 'shake 0.5s' } : {}}
      >
        {/* Completed badge */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-4 right-4 bg-[#FF7518] rounded-full p-2"
            style={{ boxShadow: '0 0 20px rgba(255, 117, 24, 0.6)' }}
          >
            <Check className="w-6 h-6 text-[#0B0B0B]" />
          </motion.div>
        )}

        {/* Title */}
        <h3 
          className={`mb-4 ${isCompleted ? 'text-[#FF7518]' : 'text-[#F8F8FF]'}`}
          style={{ 
            fontFamily: "'Creepster', cursive",
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            textShadow: isCompleted ? '0 0 10px rgba(255, 117, 24, 0.3)' : 'none'
          }}
        >
          {puzzle.title}
        </h3>

        {/* Question */}
        <p className="text-[#F8F8FF]/90 mb-6 leading-relaxed">
          {puzzle.question}
        </p>

        {!isCompleted && (
          <>
            {/* Hint button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="mb-4 text-[#3A0CA3] hover:text-[#FF7518] hover:bg-[#FF7518]/10"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>

            {/* Hint */}
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-[#3A0CA3]/20 border border-[#3A0CA3]/40 rounded-lg p-3 mb-4 text-[#F8F8FF]/80 text-sm"
              >
                💡 {puzzle.hint}
              </motion.div>
            )}

            {/* Answer input */}
            <div className="flex gap-3">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter your answer..."
                className="bg-[#0B0B0B]/50 border-[#3A0CA3]/50 text-[#F8F8FF] placeholder:text-[#F8F8FF]/30 focus:border-[#FF7518] focus:ring-[#FF7518]/20"
              />
              <Button
                onClick={handleSubmit}
                disabled={!answer.trim()}
                className="bg-[#FF7518] hover:bg-[#FF7518]/90 text-[#0B0B0B] min-w-[120px] transition-all duration-300"
                style={{
                  boxShadow: answer.trim() ? '0 0 15px rgba(255, 117, 24, 0.4)' : 'none'
                }}
              >
                Submit
              </Button>
            </div>
          </>
        )}

        {isCompleted && (
          <div className="text-[#FF7518] flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Puzzle Solved!</span>
          </div>
        )}

        {/* Glow effect */}
        {!isCompleted && (
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF7518]/10 rounded-full blur-3xl pointer-events-none"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </Card>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </motion.div>
  );
}
