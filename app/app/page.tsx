"use client";
import { useState, useMemo } from "react";
import Calendar from "./components/Calendar";
import NewsShowcase from "./components/NewsShowcase";
import { mockNews } from "./data/mock-news";

export default function Home() {
  const availableDates = useMemo(
    () => Array.from(new Set(mockNews.map((n) => n.date))).sort(),
    []
  );
  const [selectedDate, setSelectedDate] = useState(availableDates[availableDates.length - 1]);
  const filteredNews = mockNews.filter((n) => n.date === selectedDate);
  return (
    <main style={{ padding: "32px" }}>
      <h1>Vitrina de Noticias</h1>
      <Calendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        availableDates={availableDates}
      />
      <NewsShowcase items={filteredNews} />
    </main>
  );
}
