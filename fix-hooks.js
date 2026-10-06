const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const targetHooksOld = `  if (activeCards.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900  dark:text-[#F5F5F7] mb-4">Großartig!</h1>
          <p className="text-lg text-gray-500 mb-10">
            {reviewCards ? "Все запланированные карточки пройдены." : "Вы выучили все карточки в этой колоде."}
          </p>
          <button
            onClick={onBack}
            className="w-full md:w-auto bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.98]"
          >
            Вернуться в библиотеку
          </button>
        </motion.div>
      </div>
    );
  }

  const todayStr = new Date().toLocaleDateString('en-CA');
  const stored = localStorage.getItem(\`daily_activity_\${appLanguage}\`);
  const progress = stored ? JSON.parse(stored) : {};
  const rawCount = progress[todayStr];
  const currentCount = typeof rawCount === 'number' ? rawCount : (rawCount?.total || (typeof rawCount === 'string' ? parseInt(rawCount) || 0 : 0));
  
  const isLimitReached = profile && profile.tier === 'free' && currentCount >= 70;

  useEffect(() => {
    if (isLimitReached && !isPaywallOpen) {
      setIsPaywallOpen(true);
    }
  }, [isLimitReached, isPaywallOpen, setIsPaywallOpen]);`;

const targetHooksNew = `  const todayStr = new Date().toLocaleDateString('en-CA');
  const stored = localStorage.getItem(\`daily_activity_\${appLanguage}\`);
  const progress = stored ? JSON.parse(stored) : {};
  const rawCount = progress[todayStr];
  const currentCount = typeof rawCount === 'number' ? rawCount : (rawCount?.total || (typeof rawCount === 'string' ? parseInt(rawCount) || 0 : 0));
  
  const isLimitReached = profile && profile.tier === 'free' && currentCount >= 70;

  useEffect(() => {
    if (isLimitReached && !isPaywallOpen) {
      setIsPaywallOpen(true);
    }
  }, [isLimitReached, isPaywallOpen, setIsPaywallOpen]);

  if (activeCards.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900  dark:text-[#F5F5F7] mb-4">Großartig!</h1>
          <p className="text-lg text-gray-500 mb-10">
            {reviewCards ? "Все запланированные карточки пройдены." : "Вы выучили все карточки в этой колоде."}
          </p>
          <button
            onClick={onBack}
            className="w-full md:w-auto bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.98]"
          >
            Вернуться в библиотеку
          </button>
        </motion.div>
      </div>
    );
  }`;

code = code.replace(targetHooksOld, targetHooksNew);

fs.writeFileSync('src/app/page.tsx', code);
console.log('Fixed hooks order');
