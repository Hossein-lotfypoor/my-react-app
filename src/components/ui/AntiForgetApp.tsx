import  { useState, useEffect } from 'react';

const AntiForgetApp = () => {
  // ۱. لود کردن دیتا از حافظه گوشی
  const [items, setItems] = useState<string[]>(() => {
    const saved = localStorage.getItem("reminders");
    return saved ? JSON.parse(saved) : ["عینک", "گاز", "کلیدها"];
  });

  const [newItem, setNewItem] = useState("");
  const [currentReminder, setCurrentReminder] = useState("");
  const [isAnimate, setIsAnimate] = useState(false);

  // ۲. ذخیره خودکار هر تغییر در لیست
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(items));
  }, [items]);

  // ۳. منطق انتخاب تصادفی (دکمه اصلی)
  const getRandomReminder = () => {
    if (items.length === 0) return;
    setIsAnimate(true);
    setCurrentReminder(""); // پاک کردن قبلی برای افکت
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * items.length);
      setCurrentReminder(items[randomIndex]);
      setIsAnimate(false);
    }, 400);
  };

  const addItem = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([...items, newItem]);
    setNewItem("");
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans flex flex-col items-center">
      <h1 className="text-2xl font-bold text-cyan-400 mb-8">چکاپ هوشیاری ۵۱</h1>

      {/* --- بخش نمایش (دکمه اصلی خروج) --- */}
      <div className={`w-full max-w-sm p-6 rounded-2xl bg-slate-800 border-2 border-cyan-500/50 shadow-xl mb-10 transition-all ${isAnimate ? 'scale-95' : 'scale-100'}`}>
        <div className="h-24 flex items-center justify-center text-center">
          {currentReminder ? (
            <p className="text-xl font-bold animate-bounce text-yellow-400">{currentReminder} رو چک کردی؟</p>
          ) : (
            <p className="text-slate-400">آماده خروجی؟ دکمه رو بزن</p>
          )}
        </div>
        
        <button 
          onClick={getRandomReminder}
          className="w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-xl font-black text-lg mt-4 shadow-lg shadow-cyan-900/40"
        >
          {isAnimate ? "در حال جستجو..." : "بررسی نهایی"}
        </button>
      </div>

      {/* --- بخش مدیریت (لیست موارد) --- */}
      <div className="w-full max-w-sm">
        <h2 className="text-sm text-slate-500 mb-4 border-b border-slate-700 pb-2">مدیریت موارد (نیاز به تمرکز)</h2>
        
        <form onSubmit={addItem} className="flex gap-2 mb-4">
          <input 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="یادآوری جدید..."
            className="flex-1 bg-slate-800 border border-slate-700 p-2 rounded-lg text-sm focus:outline-none focus:border-cyan-500"
          />
          <button type="submit" className="bg-slate-700 px-4 rounded-lg">+</button>
        </form>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-slate-800/50 p-2 rounded border-r-2 border-slate-600">
              <span className="text-sm">{item}</span>
              <button onClick={() => removeItem(index)} className="text-red-500 text-xs p-1">حذف</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AntiForgetApp;