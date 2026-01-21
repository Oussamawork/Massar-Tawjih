import React, { useState, useEffect, useRef } from 'react';
import { 
  ChatMessage, 
  Sender, 
  TraitScores, 
  Option, 
  AnalysisResult,
  Language 
} from './types';
import { QUESTIONS_MAP, INITIAL_SCORES, UI_TEXT } from './data';
import { generateCareerAnalysis } from './services/geminiService';
import { 
  ArrowRight, 
  RefreshCw, 
  Send, 
  Sparkles, 
  BookOpen, 
  MapPin, 
  User,
  Globe 
} from 'lucide-react';

// --- Sub-components ---

const LoadingDots = () => (
  <div className="flex space-x-1 p-2">
    <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isBot = message.sender === 'bot';
  // Logical properties for RTL support: 
  // User (sender='user') is usually 'end', Bot is 'start'.
  // We use flex justify to position them.
  // rounded-ts (top-start), rounded-te (top-end) would be ideal if using newer Tailwind,
  // but using standard rounded classes with RTL conditional logic or just keeping bubbles rounded.
  
  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'} fade-in-up`}>
      <div 
        className={`max-w-[85%] px-5 py-3 rounded-2xl text-md leading-relaxed shadow-sm ${
          isBot 
            ? 'bg-white text-slate-800 rounded-tl-none rtl:rounded-tr-none rtl:rounded-tl-2xl border border-brand-100' 
            : 'bg-brand-600 text-white rounded-tr-none rtl:rounded-tl-none rtl:rounded-tr-2xl'
        }`}
      >
        {message.isTyping ? <LoadingDots /> : message.text}
      </div>
    </div>
  );
};

const ResultCard: React.FC<{ result: AnalysisResult; onReset: () => void; lang: Language }> = ({ result, onReset, lang }) => {
  const ui = UI_TEXT[lang];
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar bg-white p-6 md:p-8 animate-fade-in-up">
      <div className="max-w-3xl mx-auto w-full space-y-8 pb-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-brand-50 rounded-full mb-2">
            <Sparkles className="w-6 h-6 text-brand-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-900">{ui.profileTitle}</h2>
          <p className="text-slate-600 italic">"{result.encouragement}"</p>
        </div>

        {/* Profile Summary */}
        <div className="bg-sand-50 border border-sand-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-brand-800 font-semibold">
            <User className="w-5 h-5" />
            <h3>{ui.whoYouAre}</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">{result.profileSummary}</p>
        </div>

        {/* Clusters */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 border-b pb-2">{ui.suggestedAreas}</h3>
          {result.topClusters.map((cluster, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.01] duration-300">
              <div className="bg-brand-50 p-4 border-b border-brand-100">
                <h4 className="font-bold text-lg text-brand-900">{cluster.clusterName}</h4>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">{ui.whyFits}</p>
                  <p className="text-slate-700">{cluster.whyItFits}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2 text-slate-600 font-medium text-sm">
                      <Sparkles className="w-4 h-4" /> {ui.exampleRoles}
                    </div>
                    <ul className="text-sm text-slate-700 space-y-1 list-disc pl-4 rtl:pr-4">
                      {cluster.roles.map((role, rIdx) => <li key={rIdx}>{role}</li>)}
                    </ul>
                  </div>

                  <div className="bg-brand-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2 text-brand-700 font-medium text-sm">
                      <BookOpen className="w-4 h-4" /> {ui.educationMorocco}
                    </div>
                    <p className="text-sm text-slate-700">{cluster.moroccanEducationPath}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-6 rounded-xl text-center space-y-4 mt-8">
          <p className="text-slate-600 text-sm">
            {ui.footerDisclaimer}
          </p>
          <button 
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-medium rounded-full hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30"
          >
            <RefreshCw className="w-4 h-4" /> {ui.restartBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [scores, setScores] = useState<TraitScores>(INITIAL_SCORES);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1); // -1 is Intro
  const [isTyping, setIsTyping] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ui = UI_TEXT[language];
  const questions = QUESTIONS_MAP[language];

  // Update HTML direction and font based on language
  useEffect(() => {
    const isArabic = language === 'ar';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.className = `bg-sand-50 text-slate-800 antialiased h-screen overflow-hidden ${isArabic ? 'font-arabic' : 'font-sans'}`;
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial greeting - Reset when language changes if we haven't started yet
  useEffect(() => {
    if (currentQuestionIndex === -1 && !analysis) {
      setMessages([]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          { id: 'intro-1', sender: 'bot', text: ui.welcome1 },
          { id: 'intro-2', sender: 'bot', text: ui.welcome2 }
        ]);
      }, 500);
    }
  }, [language]); // Re-run greeting when language changes

  const handleStart = () => {
    setMessages(prev => [...prev, { id: 'user-start', sender: 'user', text: ui.startUserMsg }]);
    setCurrentQuestionIndex(0);
    showNextQuestion(0);
  };

  const showNextQuestion = (index: number) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const question = questions[index];
      setMessages(prev => [
        ...prev, 
        { id: `q-${question.id}`, sender: 'bot', text: question.text }
      ]);
    }, 800);
  };

  const handleOptionSelect = (option: Option) => {
    // 1. Update User Chat
    setMessages(prev => [...prev, { id: `ans-${Date.now()}`, sender: 'user', text: option.label }]);

    // 2. Update Scores
    const newScores = { ...scores };
    (Object.keys(option.scoreChange) as Array<keyof TraitScores>).forEach(trait => {
      newScores[trait] = (newScores[trait] || 0) + (option.scoreChange[trait] || 0);
    });
    setScores(newScores);

    // 3. Move Logic
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      showNextQuestion(nextIndex);
    } else {
      finishQuiz(newScores);
    }
  };

  const finishQuiz = async (finalScores: TraitScores) => {
    setCurrentQuestionIndex(-2); // -2 represents "Analyzing" state
    setIsTyping(true);
    
    // Add a transition message
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: 'analyzing', 
        sender: 'bot', 
        text: ui.analyzing 
      }]);
    }, 600);

    try {
      const result = await generateCareerAnalysis(finalScores, language);
      setAnalysis(result);
    } catch (e) {
      setError(ui.errorMsg);
    } finally {
      setIsTyping(false);
    }
  };

  const resetQuiz = () => {
    setScores(INITIAL_SCORES);
    setMessages([]);
    setCurrentQuestionIndex(-1);
    setAnalysis(null);
    setError(null);
    // Greeting will be triggered by useEffect dependent on [language]
    // But we need to manually trigger it if language doesn't change
    setTimeout(() => {
      setMessages([
        { id: 'intro-1', sender: 'bot', text: ui.welcome1 },
        { id: 'intro-2', sender: 'bot', text: ui.welcome2 }
      ]);
    }, 500);
  };

  const switchLanguage = (lang: Language) => {
    // Only allow switching if not in middle of quiz (or warn user)
    // For MVP simplicity, we allow switching at Intro. 
    // If mid-quiz, we just switch and reset or translate current state?
    // Translating current state is hard without complex mapping.
    // Resetting is safest for data integrity.
    if (currentQuestionIndex > -1 && !analysis) {
       if (confirm("Changing language will restart the discovery. Continue?")) {
         setLanguage(lang);
         resetQuiz();
       }
    } else {
      setLanguage(lang);
      // If we are viewing results, we might want to re-analyze or just let them stay?
      // Since result is generated text, we can't just flip a switch.
      // Better to reset if in result view too.
      if (analysis) {
        setAnalysis(null);
        resetQuiz();
      }
    }
  };

  // --- Render Logic ---

  if (analysis) {
    return <ResultCard result={analysis} onReset={resetQuiz} lang={language} />;
  }

  const currentQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length 
    ? questions[currentQuestionIndex] 
    : null;

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto md:max-w-2xl bg-white md:shadow-2xl md:my-4 md:rounded-2xl md:h-[calc(100vh-2rem)] overflow-hidden border-x border-slate-100">
      
      {/* Header */}
      <header className="bg-white border-b p-4 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="bg-brand-500 text-white p-1.5 rounded-lg">
            <MapPin className="w-5 h-5" />
          </div>
          <h1 className="font-bold text-lg text-slate-800 tracking-tight">Massar</h1>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
           <Globe className="w-4 h-4 text-slate-400" />
           <select 
             value={language} 
             onChange={(e) => switchLanguage(e.target.value as Language)}
             className="text-sm bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-500"
           >
             <option value="en">English</option>
             <option value="fr">Français</option>
             <option value="ar">العربية</option>
           </select>
        </div>
      </header>

      {/* Progress Bar (Separate from header to not clutter layout in mobile) */}
      {currentQuestionIndex >= 0 && (
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-100">
           <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500 w-10">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden" dir="ltr">
              {/* Force LTR for progress bar regardless of document dir */}
              <div 
                className="h-full bg-brand-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
           </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 scroll-smooth">
        <div className="flex flex-col min-h-full justify-end pb-2">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isTyping && (
             <MessageBubble key="typing" message={{ id: 'typing', sender: 'bot', text: '', isTyping: true }} />
          )}
          {error && (
            <div className="text-center text-red-500 text-sm bg-red-50 p-3 rounded-lg my-4">
              {error}
              <button onClick={resetQuiz} className="block w-full mt-2 text-red-700 font-semibold underline">{ui.tryAgain}</button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input / Options Area */}
      <div className="p-4 bg-white border-t border-slate-100 min-h-[140px] flex items-center">
        <div className="w-full max-w-lg mx-auto">
          
          {/* Intro Start Button */}
          {currentQuestionIndex === -1 && !isTyping && (
            <button
              onClick={handleStart}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-brand-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 rtl:flex-row-reverse"
            >
              {ui.startBtn} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          )}

          {/* Question Options */}
          {currentQuestion && !isTyping && (
            <div className="grid gap-2 fade-in-up">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className="text-start w-full p-3.5 text-sm md:text-base bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-brand-50 hover:border-brand-300 hover:text-brand-800 transition-all active:scale-[0.99] shadow-sm"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          
          {/* Analysis State */}
          {currentQuestionIndex === -2 && (
             <div className="text-center text-slate-500 text-sm animate-pulse">
               {ui.analyzingDots}
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
