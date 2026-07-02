"use client";

import { NewsItem } from "../types/news";

export default function NewsShowcase({ items }: { items: NewsItem[] }) {
  if (items.length === 0) {
    return <p>No hay noticias para este día todavía.</p>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ border: "1px solid #eee", borderRadius: "12px", overflow: "hidden", textDecoration: "none", color: "inherit" }}
        >
          <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
          <div style={{ padding: "12px" }}>
            <span style={{ fontSize: "12px", color: "#888" }}>
              {item.country} · {item.outlet} · {item.category}
            </span>
            <p style={{ margin: "4px 0 0", fontWeight: 600 }}>{item.title}</p>
          </div>
        </a>
      ))}
    </div>
  );
}