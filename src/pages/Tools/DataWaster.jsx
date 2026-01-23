import React, { useEffect, useState, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DataWaster = () => {
  const [dark, setDark] = useState(false);
  const [amount, setAmount] = useState(0);
  const [wasted, setWasted] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [concurrentFetches, setConcurrentFetches] = useState(0);

  const maxConcurrent = 5;

  const isRunningRef = useRef(false);
  const concurrentRef = useRef(0);

  const urls = [
    "https://cdn-5ev.pages.dev/datadummyab.txt",
    "https://dummy-8vl.pages.dev/datadummyab.txt",
    "https://wallbuck.com/dummy/datadummyab.txt",
  ];

  // Theme init
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefers ? "dark" : "light");
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  useEffect(() => {
    document.title = "Data Waster | Ankit Gupta";
  }, []);

  const fetchData = async () => {
    if (!isRunningRef.current) return;

    const url =
      urls[Math.floor(Math.random() * urls.length)] + "?" + Math.random();

    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const sizeMB = blob.size / 1024 / 1024;

      setWasted((prev) => {
        const next = prev + sizeMB;

        if (amount > 0 && next >= amount) {
          isRunningRef.current = false;
          setIsRunning(false);
          return amount;
        }

        return next;
      });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      concurrentRef.current--;
      setConcurrentFetches(concurrentRef.current);

      if (
        isRunningRef.current &&
        (amount === 0 || wasted < amount) &&
        concurrentRef.current < maxConcurrent
      ) {
        concurrentRef.current++;
        fetchData();
      }
    }
  };

  const startWasting = () => {
    if (isRunningRef.current) {
      isRunningRef.current = false;
      setIsRunning(false);
      return;
    }

    isRunningRef.current = true;
    setIsRunning(true);
    setWasted(0);

    concurrentRef.current = 0;
    setConcurrentFetches(0);

    for (let i = 0; i < maxConcurrent; i++) {
      concurrentRef.current++;
      fetchData();
    }
  };

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    return () => {
      isRunningRef.current = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors flex flex-col justify-center">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-800 flex items-center justify-center"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Data Waster</h1>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
          Wasting your valuable mobile data is easier than ever.
        </p>

        <div className="max-w-md mx-auto">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 mb-2"
            min="0"
          />
          <p className="text-sm mb-4">MB to waste (0 = infinite)</p>

          <button
            onClick={startWasting}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            {isRunning ? "Stop" : "Start"}
          </button>

          <p className="text-lg">
            {wasted.toFixed(2)} MB wasted ({concurrentFetches} active)
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataWaster;
