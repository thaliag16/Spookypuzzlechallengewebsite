import { motion } from 'motion/react';
import { Ghost, Skull } from 'lucide-react';
import { Button } from './ui/button';

interface HeroSectionProps {
  onStart: () => void;
  started: boolean;
}

export function HeroSection({ onStart, started }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Floating bats */}
      <motion.div
        className="absolute top-20 left-[10%] opacity-20"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 30, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Ghost className="w-12 h-12 text-[#F8F8FF]" />
      </motion.div>
      
      <motion.div
        className="absolute top-40 right-[15%] opacity-20"
        animate={{ 
          y: [0, 25, 0],
          x: [0, -40, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Skull className="w-10 h-10 text-[#3A0CA3]" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[20%] opacity-20"
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0]
        }}
        transition={{ 
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <Ghost className="w-8 h-8 text-[#FF7518]" />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-[#F8F8FF] mb-6 flex items-center justify-center gap-4 flex-wrap"
            style={{ 
              fontFamily: "'Creepster', cursive",
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              textShadow: '0 0 20px rgba(255, 117, 24, 0.5), 0 0 40px rgba(255, 117, 24, 0.3)'
            }}
          >
            <motion.span
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(255, 117, 24, 0.5)',
                  '0 0 40px rgba(255, 117, 24, 0.8)',
                  '0 0 20px rgba(255, 117, 24, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎃
            </motion.span>
            The Great Pumpkin Challenge
            <motion.span
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(255, 117, 24, 0.5)',
                  '0 0 40px rgba(255, 117, 24, 0.8)',
                  '0 0 20px rgba(255, 117, 24, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              🎃
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[#F8F8FF]/80 mb-12 text-lg md:text-2xl"
          style={{ fontFamily: 'serif', fontStyle: 'italic' }}
        >
          Solve the puzzles… if you dare. Only the worthy shall receive their invitation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            onClick={onStart}
            disabled={started}
            className="bg-[#FF7518] hover:bg-[#FF7518]/90 text-[#0B0B0B] px-8 py-6 rounded-full relative overflow-hidden group transition-all duration-300"
            style={{
              boxShadow: '0 0 30px rgba(255, 117, 24, 0.5), 0 0 60px rgba(255, 117, 24, 0.2)',
            }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F8F8FF]/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10">
              {started ? '🎃 Challenge Begun! 🎃' : '🎃 Start the Challenge 🎃'}
            </span>
          </Button>
        </motion.div>

        {/* Fog effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F8FF]/5 to-transparent blur-xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Import Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet" />
    </section>
  );
}
