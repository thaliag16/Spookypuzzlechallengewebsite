import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calendar, MapPin, Clock } from 'lucide-react';

export function EventDetails() {
  const handleAddToCalendar = () => {
    // Create .ics file content
    const event = {
      title: 'Halloween Pumpkin Carving Party',
      location: 'Myer Amphitheater',
      start: '20251025T170000', // October 25, 2025, 5:00 PM
      end: '20251025T200000',   // October 25, 2025, 8:00 PM
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:🎃 Thalia's Halloween Pumpkin Carving Party!
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pumpkin-carving-party.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Confetti effect
  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    emoji: ['🎃', '👻', '🦇', '🍬', '🕷️'][Math.floor(Math.random() * 5)],
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <motion.section
      id="event-details"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Confetti animation */}
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute text-3xl pointer-events-none"
          style={{ left: piece.left, top: '-10%' }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ 
            y: '110vh', 
            opacity: [1, 1, 0],
            rotate: 360 * 3,
          }}
          transition={{ 
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {piece.emoji}
        </motion.div>
      ))}

      <div className="max-w-3xl w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🎃
          </motion.div>
          
          <h2 
            className="text-[#FF7518] mb-4"
            style={{ 
              fontFamily: "'Creepster', cursive",
              fontSize: 'clamp(2.5rem, 7vw, 4rem)',
              textShadow: '0 0 30px rgba(255, 117, 24, 0.6)'
            }}
          >
            You're Invited!
          </h2>
          
          <p className="text-[#F8F8FF] text-xl">
            Congratulations on completing Thalia's Great Pumpkin Challenge!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card 
            className="bg-[#0B0B0B]/90 border-2 border-[#FF7518] p-10 backdrop-blur-sm relative overflow-hidden"
            style={{ boxShadow: '0 0 50px rgba(255, 117, 24, 0.4)' }}
          >
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF7518]/10 via-transparent to-[#3A0CA3]/10 pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              {/* Event title */}
              <div className="text-center pb-6 border-b border-[#FF7518]/30">
                <h3 className="text-[#F8F8FF] text-3xl mb-2">
                  🎃 Halloween Pumpkin Carving Party 🎃
                </h3>
              </div>

              {/* Event details */}
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4 bg-[#FF7518]/10 p-4 rounded-lg border border-[#FF7518]/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="w-6 h-6 text-[#FF7518] mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-[#FF7518]">Date</div>
                    <div className="text-[#F8F8FF] text-lg">October 25th, 2025</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 bg-[#3A0CA3]/10 p-4 rounded-lg border border-[#3A0CA3]/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="w-6 h-6 text-[#3A0CA3] mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-[#3A0CA3]">Time</div>
                    <div className="text-[#F8F8FF] text-lg">5:00 PM</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 bg-[#FF7518]/10 p-4 rounded-lg border border-[#FF7518]/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="w-6 h-6 text-[#FF7518] mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-[#FF7518]">Location</div>
                    <div className="text-[#F8F8FF] text-lg">Myer Amphitheater</div>
                  </div>
                </motion.div>
              </div>

              {/* Add to calendar button */}
              <Button
                onClick={handleAddToCalendar}
                className="w-full bg-[#FF7518] hover:bg-[#FF7518]/90 text-[#0B0B0B] py-6 transition-all duration-300"
                style={{
                  boxShadow: '0 0 30px rgba(255, 117, 24, 0.5)'
                }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Add to Calendar
              </Button>

              {/* Additional info */}
              <div className="text-center pt-6 border-t border-[#3A0CA3]/30">
                <p className="text-[#F8F8FF]/80 mb-2">
                  🎃 Bring your carving skills and Halloween spirit! 🎃
                </p>
                <p className="text-[#F8F8FF]/60 text-sm">
                  Can't wait to see you there!
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-10 -left-10 text-9xl opacity-20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              🎃
            </motion.div>
            <motion.div
              className="absolute -bottom-10 -right-10 text-9xl opacity-20"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              🎃
            </motion.div>
          </Card>
        </motion.div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-[#F8F8FF]/60 text-lg">
            Thank you for completing Thalia's Great Pumpkin Challenge! 👻
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
