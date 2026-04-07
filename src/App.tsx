import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

// Configuration: Define your routes here
const REDIRECT_ROUTES: Record<string, string> = {
  '/redirect-exp': 'https://fitrimahadzir.my/portfoliio/redirect-exp',
  '/game1': 'https://game.fitrimahadzir.my/emojiflip',
  '/web1': 'https://webapp.fitrimahadzir.my/keriscoin',
  '/web2': 'https://webapp.fitrimahadzir.my/qulusa',
  '/web3': 'https://webapp.fitrimahadzir.my/protonhafiz',
  '/app1': 'https://webapp.fitrimahadzir.my/keriswallet',
  '/media1': 'https://media.fitrimahadzir.my/kaddigital',
  '/portfolio': 'https://www.behance.net/gallery/246627031/PORTFOLIO-FITRI-MAHADZIR-(LATEST)',
  '/resume': 'https://media.fitrimahadzir.my/resume',
  '/contact': 'https://wa.me/601170006477',
  '/github': 'https://github.com/fitrimahadzir',
  '/': 'https://fitrimahadzir.my', // Default home redirect
};

const REDIRECT_DELAY = 1500; // Delay in milliseconds
const DEV_MODE = false; // Set to true to disable automatic redirection

export default function App() {
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [countdown, setCountdown] = useState(REDIRECT_DELAY / 1000);

  useEffect(() => {
    // Get current path (remove trailing slash if exists)
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    
    const url = REDIRECT_ROUTES[path];

    if (url) {
      setTargetUrl(url);
      
      // Start countdown for visual feedback
      const interval = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 0.1));
      }, 100);

      // Perform redirect after delay (only if NOT in dev mode)
      const timeout = setTimeout(() => {
        if (!DEV_MODE) {
          window.location.href = url;
        } else {
          console.log(`[DEV MODE] Redirection to ${url} suppressed.`);
        }
      }, REDIRECT_DELAY);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    } else {
      setIsNotFound(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-link-bio flex items-center justify-center p-6">
      {DEV_MODE && (
        <div className="fixed top-4 left-4 z-50">
          <div className="bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Dev Mode Active
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        {isNotFound ? (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full glass-card rounded-3xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-red-50/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Link Not Found</h1>
            <p className="text-slate-600 mb-8">
              The link you followed might be broken or the page has been removed.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors group"
            >
              Go to Homepage
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        ) : (
          <motion.div
            key="redirecting"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full glass-card rounded-3xl p-10 text-center"
          >
            <div className="mb-8">
              <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <motion.div 
                  className="absolute inset-0 border-4 border-slate-200/30 rounded-full"
                />
                <motion.div 
                  className="absolute inset-0 border-4 border-t-accent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="w-16 h-16 bg-[#bbdb00] rounded-full flex items-center justify-center shadow-inner relative z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    scale: { 
                      initial: { duration: 0.5, ease: "backOut" },
                      animate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    },
                    opacity: {
                      initial: { duration: 0.5 },
                      animate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }
                  }}
                >
                  <ExternalLink className="w-7 h-7 text-accent" />
                </motion.div>
              </div>
              
              <h1 className="text-3xl font-bold text-slate-900 mb-3">Redirecting...</h1>
              <p className="text-slate-600">
                You are being redirected to your destination. Please wait a moment.
              </p>
            </div>

            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-200/30 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: REDIRECT_DELAY / 1000, ease: "easeInOut" }}
                />
              </div>

              <div className="pt-4 border-t border-slate-200/20">
                <p className="text-xs text-slate-500 mb-4 uppercase tracking-widest font-semibold">
                  Taking too long?
                </p>
                <a
                  href={targetUrl || '#'}
                  className="inline-flex items-center text-slate-900 font-semibold hover:text-accent transition-colors group"
                >
                  Click here if you are not redirected
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-0 right-0 text-center"
      >
        <p className="text-slate-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} Fitri Mahadzir
        </p>
      </motion.div>
    </div>
  );
}
