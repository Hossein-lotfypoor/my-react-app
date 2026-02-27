import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const AntiForgetApp: React.FC = () => {
  // لیست کارهای روزانه
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // لیست یادآوری‌های نوار زرد بالا
  const [bannerList, setBannerList] = useState<string[]>(() => {
    const saved = localStorage.getItem('bannerList');
    return saved ? JSON.parse(saved) : ["به اپلیکیشن ضد فراموشی خوش آمدی!"];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('bannerList', JSON.stringify(bannerList));
  }, [bannerList]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // اضافه کردن یادآوری جدید به نوار (حداکثر ۷ مورد برای شلوغ نشدن)
  const addToBanner = (text: string) => {
    if (text.trim()) {
      const newList = [text, ...bannerList].slice(0, 7);
      setBannerList(newList);
    }
  };

  const clearBanner = () => {
    setBannerList([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden text-right" dir="rtl">
      
      {/* ۱. نوار زرد متحرک (Marquee) */}
      <div className="bg-yellow-400 text-black py-3 sticky top-0 z-50 shadow-lg border-b-2 border-yellow-600 overflow-hidden h-14 flex items-center">
        <div className="whitespace-nowrap animate-marquee font-black text-lg">
          {bannerList.map((item, index) => (
            <span key={index} className="mx-8 inline-block"> 
              <span className="text-red-600">●</span> {item} 
            </span>
          ))}
          {/* تکرار برای جلوگیری از بریدگی در انیمیشن */}
          {bannerList.map((item, index) => (
            <span key={`dup-${index}`} className="mx-8 inline-block"> 
              <span className="text-red-600">●</span> {item} 
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-md w-full mx-auto p-4 flex-grow">
        
        {/* ۲. بخش ورودی یادداشت فوری */}
        <div className="mb-6 bg-white p-5 rounded-2xl shadow-md border border-yellow-200">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-bold text-gray-700">ثبت در نوار متحرک بالا:</label>
            <button 
              onClick={clearBanner} 
              className="text-[10px] bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-colors"
            >
              پاکسازی نوار
            </button>
          </div>
          <input 
            type="text" 
            placeholder="یادآوری فوری را بنویس و اینتر بزن..."
            className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-yellow-400 outline-none transition-all text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addToBanner(e.currentTarget.value);
                e.currentTarget.value = ""; 
              }
            }}
          />
        </div>

        {/* ۳. بخش لیست کارهای اصلی */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-black text-gray-800 mb-4">لیست برنامه‌ها:</h2>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="مثلاً: تحویل قطعه..."
              className="flex-grow p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <button 
              onClick={addTodo} 
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700"
            >
              +
            </button>
          </div>

          <div className="space-y-3">
            {todos.length === 0 && <p className="text-center text-gray-300 py-4">لیست خالی است...</p>}
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl group transition-all hover:bg-gray-100">
                <span className="text-gray-700 font-medium">{todo.text}</span>
                <button 
                  onClick={() => deleteTodo(todo.id)} 
                  className="text-red-300 hover:text-red-500 transition-colors"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="p-6 text-center text-gray-400 text-[10px] font-mono">
        ANTI-FORGET SYSTEM v3.0
      </footer>
    </div>
  );
};

export default AntiForgetApp;