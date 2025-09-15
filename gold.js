import React, { useEffect, useState } from "react";
import { FaCoins, FaDollarSign, FaClock, FaSyncAlt, FaMoon, FaSun } from "react-icons/fa";
import { FaEuroSign } from "react-icons/fa";

function Gold() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }

    // Ensure proper mobile viewport to avoid zooming and oversized UI
    const existing = document.querySelector('meta[name="viewport"]');
    const content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    if (existing) {
      existing.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchPrices = async () => {
    try {
      setError(null);
      const res = await fetch("https://web.mrnitro.ir:2083/prices");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Error fetching prices:", e);
      setError(e.message || "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const formatTime = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  return (
    <div className={`min-h-[100dvh] p-3 sm:p-4 ${isDarkMode 
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
      : 'bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-300'
    }`} dir="rtl">
      <div className={`w-full max-w-full sm:max-w-sm mx-auto rounded-xl shadow-2xl p-4 sm:p-5 text-right border ${
        isDarkMode 
          ? 'bg-gray-800/95 backdrop-blur border-gray-700' 
          : 'bg-white/95 backdrop-blur border-yellow-200'
      }`}>
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-2">
          <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
          }`}>
            قیمت‌های لحظه‌ای
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600'
            }`}
            title={isDarkMode ? 'حالت روشن' : 'حالت تاریک'}
          >
            {isDarkMode ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
          </button>
        </div>
        
        <p className={`text-[11px] sm:text-xs mb-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          برای بروزرسانی از دکمه زیر استفاده کنید
        </p>

        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className={`h-14 sm:h-16 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
            <div className="space-y-2">
              <div className={`h-3 rounded w-2/3 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`} />
              <div className={`h-3 rounded w-1/2 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`} />
            </div>
          </div>
        ) : error ? (
          <div className={`font-medium border rounded-lg p-3 text-xs sm:text-sm ${
            isDarkMode 
              ? 'text-red-400 bg-red-900/20 border-red-800' 
              : 'text-red-600 bg-red-50 border-red-200'
          }`}>
            {error}
          </div>
        ) : data ? (
          <>
            {/* Gold Price */}
            <div className={`rounded-lg p-4 mb-3 border ${
              isDarkMode 
                ? 'bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 border-yellow-700' 
                : 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300'
            }`}>
              <h2 className={`text-sm sm:text-base font-bold mb-2 inline-flex items-center gap-2 ${
                isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
              }`}>
                <FaCoins className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`} /> طلا
              </h2>
              {data.gold_price ? (
                <p className={`text-2xl sm:text-3xl font-black leading-tight ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {Number(data.gold_price || 0).toLocaleString("fa-IR")} تومان
                </p>
              ) : (
                <p className={`font-medium text-xs sm:text-sm ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>{data.gold_error}</p>
              )}
            </div>

            {/* USD Price */}
            <div className={`rounded-lg p-4 mb-4 border ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-700' 
                : 'bg-gradient-to-r from-green-100 to-green-200 border-green-300'
            }`}>
              <h2 className={`text-sm sm:text-base font-bold mb-2 inline-flex items-center gap-2 ${
                isDarkMode ? 'text-green-300' : 'text-green-700'
              }`}>
                <FaDollarSign className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'}`} /> دلار/تتر
              </h2>
              {data.usd_price ? (
                <p className={`text-2xl sm:text-3xl font-black leading-tight ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {Number(data.usd_price || 0).toLocaleString("fa-IR")} تومان
                </p>
              ) : (
                <p className={`font-medium text-xs sm:text-sm ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>{data.usd_error}</p>
              )}
            </div>

            {/* Euro Price */}
            <div className={`rounded-lg p-4 mb-4 border ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-700' 
                : 'bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300'
            }`}>
              <h2 className={`text-sm sm:text-base font-bold mb-2 inline-flex items-center gap-2 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                <FaEuroSign className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`} /> یورو
              </h2>
              {data.euro_price ? (
                <p className={`text-2xl sm:text-3xl font-black leading-tight ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {Number(data.euro_price || 0).toLocaleString("fa-IR")} تومان
                </p>
              ) : (
                <p className={`font-medium text-xs sm:text-sm ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>{data.euro_error}</p>
              )}
            </div>

            {/* Time Info */}
            <div className={`text-[11px] sm:text-xs space-y-1 rounded-lg p-3 border ${
              isDarkMode 
                ? 'text-gray-300 bg-gray-800/50 border-gray-700' 
                : 'text-gray-600 bg-gray-50 border-gray-100'
            }`}>
              <div className="flex items-center gap-2">
                <FaClock className="text-xs" /> زمان جلالی: {data.jtime}
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-xs" /> زمان میلادی: {data.time}
              </div>
              <div className={`text-[10px] mt-2 flex items-center gap-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <FaClock className="text-[10px]" /> آخرین بروزرسانی: {formatTime(lastUpdated)}
              </div>
            </div>
          </>
        ) : (
          <p className={`text-xs ${
            isDarkMode ? 'text-red-400' : 'text-red-500'
          }`}>خطا در دریافت اطلاعات</p>
        )}

        <div className="flex gap-2 justify-start mt-4">
          <button
            onClick={() => {
              setLoading(true);
              fetchPrices();
            }}
            className={`px-3 py-2 rounded-lg shadow-md transition font-semibold inline-flex items-center gap-2 text-sm ${
              isDarkMode 
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
            }`}
          >
            <FaSyncAlt className="text-xs" /> بروزرسانی دستی
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gold;