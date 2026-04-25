import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  ChevronRight, 
  CircleDot, 
  User, 
  Zap,
  Timer,
  Swords
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  sentence: string;
  translation: string;
  correct: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  { id: 1, sentence: "Yo ______ hablar español.", translation: "Ես կարող եմ խոսել իսպաներեն", correct: "puedo", options: ["puedo", "puedes", "puede"] },
  { id: 2, sentence: "Tú ______ venir a mi casa.", translation: "Դու կարող ես գալ իմ տուն", correct: "puedes", options: ["puedes", "puedo", "podemos"] },
  { id: 3, sentence: "Él ______ jugar al fútbol.", translation: "Նա կարող է ֆուտբոլ խաղալ", correct: "puede", options: ["puede", "pueden", "puedes"] },
  { id: 4, sentence: "Nosotros ______ bailar salsa.", translation: "Մենք կարող ենք սալսա պարել", correct: "podemos", options: ["podemos", "pueden", "podeis"] },
  { id: 5, sentence: "Ustedes ______ entrar ahora.", translation: "Դուք կարող եք ներս մտնել հիմա", correct: "pueden", options: ["pueden", "podemos", "puedes"] },
  { id: 6, sentence: "Ella ______ cantar muy bien.", translation: "Նա կարող է շատ լավ երգել", correct: "puede", options: ["puede", "puedo", "pueden"] },
  { id: 7, sentence: "Ellos ______ ver la televisión.", translation: "Նրանք կարող են հեռուստացույց դիտել", correct: "pueden", options: ["pueden", "podeis", "puedes"] },
  { id: 8, sentence: "Gor ______ correr muy rápido.", translation: "Գոռը կարող է շատ արագ վազել", correct: "puede", options: ["puede", "puedo", "podemos"] },
  { id: 9, sentence: "Gayane ______ leer este libro.", translation: "Գայանեն կարող է կարդալ այս գիրքը", correct: "puede", options: ["puede", "puedes", "podemos"] },
  { id: 10, sentence: "Nosotros no ______ ir al cine.", translation: "Մենք չենք կարող գնալ կինո", correct: "podemos", options: ["podemos", "pueden", "puedo"] },
  { id: 11, sentence: "¿Vosotros ______ ayudarme?", translation: "Դուք կարող եք ինձ օգնել? (Իսպանիա)", correct: "podéis", options: ["podéis", "pueden", "podemos"] },
  { id: 12, sentence: "Usted ______ usar mi lápiz.", translation: "Դուք կարող եք օգտագործել իմ մատիտը", correct: "puede", options: ["puede", "puedo", "puedes"] },
  { id: 13, sentence: "Yo no ______ dormir hoy.", translation: "Ես չեմ կարող քնել այսօր", correct: "puedo", options: ["puedo", "puede", "pueo"] },
  { id: 14, sentence: "Ellas ______ cocinar paella.", translation: "Նրանք կարող են պաելյա պատրաստել", correct: "pueden", options: ["pueden", "puedes", "podemos"] },
  { id: 15, sentence: "¿Tú ______ abrir la ventana?", translation: "Դու կարող ես բացել պատուհանը?", correct: "puedes", options: ["puedes", "puedo", "puede"] },
];

const BowlingPins = ({ state }: { state: 'idle' | 'hit' | 'missed' }) => {
  return (
    <div className="relative flex justify-center gap-1.5 h-32 mt-12">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, y: 0, rotate: 0 }}
          animate={state === 'hit' ? { 
            y: [0, -100, 300], 
            x: (i - 2.5) * 50,
            rotate: i * 60,
            opacity: 0 
          } : { y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: i * 0.05 }}
          className="w-5 h-14 bg-white rounded-t-full rounded-b-md border-2 border-slate-200 relative shadow-md"
        >
          <div className="absolute top-2.5 left-0 w-full h-1.5 bg-red-600" />
        </motion.div>
      ))}
    </div>
  );
};

const CharacterPortrait = ({ name, variant, isActive, result }: { name: string, variant: 'Gor' | 'Gayane', isActive: boolean, result: 'success' | 'fail' | null }) => {
  const isGor = variant === 'Gor';
  return (
    <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${isActive ? 'scale-110' : 'opacity-40 blur-[0.5px]'}`}>
      <div className="relative">
        <motion.div 
          animate={result === 'success' ? { y: [-15, 0, -15, 0], scale: [1, 1.1, 1] } : result === 'fail' ? { x: [-5, 5, -5, 5, 0] } : {}}
          className={`w-28 h-28 rounded-full border-4 border-slate-900 shadow-2xl flex items-center justify-center relative overflow-hidden bg-white mb-2`}
        >
          <div className={`absolute inset-0 ${isGor ? 'bg-blue-500' : 'bg-rose-400'} opacity-10`} />
          <User size={64} className={isGor ? 'text-blue-600' : 'text-rose-500'} strokeWidth={1} />
          
          <AnimatePresence>
            {result === 'success' && (
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-emerald-500/80 flex items-center justify-center z-20">
                <Zap size={48} className="text-white fill-white" />
              </motion.div>
            )}
            {result === 'fail' && (
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-rose-500/80 flex items-center justify-center z-20">
                <div className="text-5xl font-black text-white">!</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className={`px-5 py-1.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl border-2 transition-colors ${
        isActive 
          ? isGor ? 'bg-blue-600 text-white border-blue-700' : 'bg-rose-500 text-white border-rose-600'
          : 'bg-white text-slate-400 border-slate-100'
      }`}>
        {name}
      </div>
    </div>
  );
};

export default function BowlingPoder() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [turn, setTurn] = useState<'Gor' | 'Gayane'>('Gor');
  const [scores, setScores] = useState({ Gor: 0, Gayane: 0 });
  const [gameState, setGameState] = useState<'idle' | 'rolling' | 'result' | 'finished'>('idle');
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'success' | 'fail' | null>(null);

  const currentQ = QUESTIONS[currentIdx];

  const handleSelect = (opt: string) => {
    if (gameState !== 'idle') return;

    setSelectedOpt(opt);
    setGameState('rolling');
    
    const isCorrect = opt === currentQ.correct;

    setTimeout(() => {
      if (isCorrect) {
        setFeedback('success');
        setGameState('result');
        setScores(prev => ({ ...prev, [turn]: prev[turn] + 1 }));
        if (currentIdx === QUESTIONS.length - 1) {
          confetti({ particleCount: 150, spread: 70 });
        }
      } else {
        setFeedback('fail');
        setGameState('result');
      }
    }, 1200);
  };

  const nextQuestion = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setTurn(turn === 'Gor' ? 'Gayane' : 'Gor');
      setGameState('idle');
      setFeedback(null);
      setSelectedOpt(null);
    } else {
      setGameState('finished');
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setTurn('Gor');
    setScores({ Gor: 0, Gayane: 0 });
    setGameState('idle');
    setFeedback(null);
    setSelectedOpt(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans overflow-x-hidden flex flex-col items-center">
      
      {/* Alley Background */}
      <div className="fixed inset-0 pointer-events-none perspective-[1000px]">
        <div className="absolute inset-0 bg-[#f1f5f9]" />
        {/* The Lane */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-full bg-[#d4a373] rotate-x-[60deg] origin-bottom border-x-[15px] border-amber-900 opacity-20 shadow-inner" />
      </div>

      <header className="w-full max-w-5xl p-6 md:p-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <Swords size={24} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">Poder Match</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Gor vs Gayane Bowling</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8 bg-white px-4 md:px-8 py-3 rounded-[2rem] shadow-xl border border-slate-100">
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Gor</span>
              <span className="text-2xl font-black italic">{scores.Gor}</span>
           </div>
           <div className="h-8 w-px bg-slate-100" />
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Gayane</span>
              <span className="text-2xl font-black italic">{scores.Gayane}</span>
           </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl p-6 flex flex-col items-center justify-between relative z-10 mb-10">
        
        <AnimatePresence mode="wait">
          {gameState === 'finished' ? (
            <motion.div 
               key="finished"
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-center space-y-10 bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border-b-[16px] border-slate-100"
            >
               <div className="w-24 h-24 bg-yellow-400 rounded-[2rem] mx-auto flex items-center justify-center text-white shadow-2xl border-4 border-white transform -rotate-6">
                  <Trophy size={48} />
               </div>
               <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">TORNEO FINAL</h2>
                  <div className="flex justify-center gap-12 py-8">
                     <div className="text-center">
                        <p className="text-xs font-black text-blue-600 uppercase">Gor</p>
                        <p className="text-5xl font-black">{scores.Gor}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-xs font-black text-rose-500 uppercase">Gayane</p>
                        <p className="text-5xl font-black">{scores.Gayane}</p>
                     </div>
                  </div>
                  <div className="text-3xl font-black italic text-slate-400">
                    {scores.Gor > scores.Gayane ? '¡GANA GOR!' : scores.Gayane > scores.Gor ? '¡GANA GAYANE!' : '¡EMPATE!'}
                  </div>
               </div>
               <button onClick={restart} className="px-12 py-5 bg-slate-900 text-white rounded-full font-black uppercase text-lg shadow-xl flex items-center gap-3 mx-auto transition-transform active:scale-95">
                  <RotateCcw /> REINTENTAR
               </button>
            </motion.div>
          ) : (
            <div className="w-full flex flex-col items-center space-y-12">
               
               {/* Pins & Alley */}
               <div className="w-full h-64 relative flex flex-col items-center">
                  <BowlingPins state={feedback === 'success' ? 'hit' : 'idle'} />
                  
                  {/* Feedback Message */}
                  <AnimatePresence>
                    {(feedback === 'success' || feedback === 'fail') && (
                      <motion.div 
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1.5, rotate: 0 }}
                        exit={{ opacity: 0 }}
                        className={`absolute top-0 px-8 py-3 rounded-2xl font-black italic text-5xl uppercase tracking-tighter shadow-2xl z-40
                          ${feedback === 'success' ? 'bg-yellow-400 text-black rotate-6' : 'bg-rose-600 text-white -rotate-6'}`}
                      >
                        {feedback === 'success' ? '¡STRIKE!' : '¡OUCH!'}
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               {/* Competitors Area */}
               <div className="w-full max-w-2xl px-6 flex justify-between items-end">
                  <CharacterPortrait name="Gor" variant="Gor" isActive={turn === 'Gor'} result={turn === 'Gor' ? feedback : null} />
                  
                  <div className="flex flex-col items-center gap-3 mb-4">
                     <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all bg-white shadow-xl border-2 ${turn === 'Gor' ? 'border-blue-600 text-blue-600' : 'border-rose-500 text-rose-500'}`}>
                        Turno: {turn}
                     </div>
                     <div className="flex items-center gap-2 text-slate-400 bg-white/50 px-3 py-1 rounded-full text-xs font-black italic">
                        <Timer size={14} />
                        {currentIdx + 1} / 15
                     </div>
                  </div>

                  <CharacterPortrait name="Gayane" variant="Gayane" isActive={turn === 'Gayane'} result={turn === 'Gayane' ? feedback : null} />
               </div>

               {/* Game Card */}
               <div className="w-full bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border-b-[12px] border-slate-100 space-y-12 relative overflow-hidden">
                  
                  {/* The Ball Animation */}
                  <motion.div 
                    animate={
                      gameState === 'rolling' ? { y: -400, scale: 0.1, x: feedback === 'fail' ? 200 : 0 } : 
                      gameState === 'result' ? { opacity: 0 } : { y: 0, scale: 1 }
                    }
                    transition={{ duration: 1 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                  >
                    <div className="w-16 h-16 bg-slate-800 rounded-full border-4 border-slate-700 shadow-2xl flex items-center justify-center">
                       <div className="flex gap-1 mb-4">
                          <div className="w-2 h-2 bg-black rounded-full" />
                          <div className="w-2 h-2 bg-black rounded-full" />
                          <div className="w-2 h-2 bg-black rounded-full" />
                       </div>
                    </div>
                  </motion.div>

                  <div className="text-center space-y-4 relative z-20">
                     <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 leading-none">{currentQ.translation}</p>
                     <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight">
                        {currentQ.sentence.split('______')[0]}
                        <span className={`px-4 py-1 mx-2 rounded-2xl border-4 ${turn === 'Gor' ? 'border-blue-600 text-blue-600' : 'border-rose-500 text-rose-500'}`}>
                           {selectedOpt ? selectedOpt : '?'}
                        </span>
                        {currentQ.sentence.split('______')[1]}
                     </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
                     {currentQ.options.map(opt => (
                       <button
                         key={opt}
                         onClick={() => handleSelect(opt)}
                         disabled={gameState !== 'idle'}
                         className={`py-10 px-4 rounded-[2.5rem] border-b-[8px] bg-white font-black italic text-3xl uppercase tracking-widest shadow-2xl transition-all active:scale-95
                           ${gameState === 'result' 
                              ? opt === currentQ.correct 
                                 ? 'bg-emerald-500 border-emerald-600 text-white scale-105' 
                                 : selectedOpt === opt ? 'bg-rose-500 border-rose-600 text-white' : 'bg-slate-50 border-slate-100 opacity-20'
                              : 'border-slate-100 hover:border-slate-900 group'
                           }
                         `}
                       >
                         {opt}
                       </button>
                     ))}
                  </div>

                  <AnimatePresence>
                    {gameState === 'result' && (
                      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center pt-4">
                        <button onClick={nextQuestion} className="px-12 py-5 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-slate-800 transition-colors">
                           SIGUIENTE <ChevronRight />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               {/* Indicator */}
               <div className="flex gap-2.5">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentIdx ? 'w-8 bg-slate-900' : i < currentIdx ? 'bg-indigo-400' : 'bg-slate-200'}`} />
                  ))}
               </div>

            </div>
          )}
        </AnimatePresence>

      </main>

      <footer className="w-full p-8 text-center opacity-10 select-none">
         <p className="text-[10px] font-black uppercase tracking-[1.5em]">Competition Alley: Gor vs Gayane v1.0</p>
      </footer>
    </div>
  );
}
