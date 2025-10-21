import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Mail } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RSVPSectionProps {
  onSubmit: () => void;
}

export function RSVPSection({ onSubmit }: RSVPSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState('coming');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      toast.error('Please fill in all fields!');
      return;
    }

    // Simulate sending RSVP
    toast.success('🎃 RSVP Submitted!', {
      description: 'Your response has been sent to Thalia, welcome to the party!',
    });

    setTimeout(() => {
      onSubmit();
      // Scroll to event details
      setTimeout(() => {
        document.getElementById('event-details')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }, 1000);
  };

  return (
    <motion.section
      id="rsvp"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center py-20 px-4"
    >
      {/* Celebratory floating pumpkins */}
      <motion.div
        className="absolute top-20 left-[10%] text-6xl"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🎃
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-[15%] text-5xl"
        animate={{ 
          y: [0, -40, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        🎃
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[20%] text-4xl"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
      >
        🎃
      </motion.div>

      <div className="max-w-2xl w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 
            className="text-[#FF7518] mb-4"
            style={{ 
              fontFamily: "'Creepster', cursive",
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              textShadow: '0 0 20px rgba(255, 117, 24, 0.4)'
            }}
          >
            🎃 RSVP to the Pumpkin Carving Party 🎃
          </h2>
          <p className="text-[#F8F8FF]/80 text-lg">
            You've proven yourself worthy!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card 
            className="bg-[#0B0B0B]/80 border-2 border-[#FF7518]/50 p-8 backdrop-blur-sm relative overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(255, 117, 24, 0.3)' }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF7518]/5 via-transparent to-[#3A0CA3]/5 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Name field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#F8F8FF]">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name..."
                  className="bg-[#0B0B0B]/50 border-[#3A0CA3]/50 text-[#F8F8FF] placeholder:text-[#F8F8FF]/30 focus:border-[#FF7518] focus:ring-[#FF7518]/20"
                />
              </div>

              {/* Phone field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#F8F8FF]">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number..."
                  className="bg-[#0B0B0B]/50 border-[#3A0CA3]/50 text-[#F8F8FF] placeholder:text-[#F8F8FF]/30 focus:border-[#FF7518] focus:ring-[#FF7518]/20"
                />
              </div>

              {/* Attendance radio */}
              <div className="space-y-3">
                <Label className="text-[#F8F8FF]">
                  Will you attend?
                </Label>
                <RadioGroup value={attendance} onValueChange={setAttendance}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="coming" id="coming" className="border-[#FF7518] text-[#FF7518]" />
                    <Label htmlFor="coming" className="text-[#F8F8FF] cursor-pointer">
                      🎃 I'm coming!
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-coming" id="not-coming" className="border-[#3A0CA3] text-[#3A0CA3]" />
                    <Label htmlFor="not-coming" className="text-[#F8F8FF] cursor-pointer">
                      👻 Can't make it
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-[#FF7518] hover:bg-[#FF7518]/90 text-[#0B0B0B] py-6 transition-all duration-300"
                style={{
                  boxShadow: '0 0 30px rgba(255, 117, 24, 0.5)'
                }}
              >
                <Mail className="w-5 h-5 mr-2" />
                Send My RSVP
              </Button>

              {/* Info text */}
              <p className="text-[#F8F8FF]/60 text-sm text-center mt-4">
                Your RSVP will be sent to Thalia! Check your messages soon 👻
              </p>
              <p className="text-[#3A0CA3] text-xs text-center">
                Details will be emailed to thaliagreenberg@gmail.com
              </p>
            </form>

            {/* Decorative cobweb effect */}
            <div className="absolute top-0 right-0 text-6xl opacity-10 pointer-events-none">
              🕸️
            </div>
            <div className="absolute bottom-0 left-0 text-6xl opacity-10 pointer-events-none transform rotate-180">
              🕸️
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
