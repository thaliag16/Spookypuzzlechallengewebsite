import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { PuzzlesSection } from './components/PuzzlesSection';
import { RSVPSection } from './components/RSVPSection';
import { EventDetails } from './components/EventDetails';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [started, setStarted] = useState(false);
  const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([]);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    // Scroll to puzzles section
    setTimeout(() => {
      document.getElementById('puzzles')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePuzzleComplete = (puzzleId: number) => {
    if (!completedPuzzles.includes(puzzleId)) {
      setCompletedPuzzles([...completedPuzzles, puzzleId]);
    }
  };

  const allPuzzlesComplete = completedPuzzles.length === 5;

  return (
    <div className="min-h-screen bg-[#0B0B0B] overflow-x-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A0CA3]/10 via-transparent to-[#0B0B0B]" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FF7518]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-[#3A0CA3]/5 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-[#FF7518]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <HeroSection onStart={handleStart} started={started} />
      
      {started && (
        <>
          <PuzzlesSection 
            completedPuzzles={completedPuzzles}
            onPuzzleComplete={handlePuzzleComplete}
            allComplete={allPuzzlesComplete}
          />
          
          {allPuzzlesComplete && !rsvpSubmitted && (
            <RSVPSection onSubmit={() => setRsvpSubmitted(true)} />
          )}
          
          {rsvpSubmitted && <EventDetails />}
        </>
      )}
      
      <Toaster />
    </div>
  );
}
