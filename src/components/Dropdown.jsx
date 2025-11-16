"use client";

import { useState, useRef, useEffect } from "react";

export default function Dropdown({ items = [], value = null, placeholder = "Select...", onSelect = () => { } }) {
    const [open, setOpen] = useState(false);
    const [highlighted, setHighlighted] = useState(0);
    const containerRef = useRef(null);

    const selected = items?.find((it) => it.value === value) ?? null;

    useEffect(() => {
        function onDoc(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    useEffect(() => {
        if (!open) setHighlighted(items?.findIndex((it) => it.value === value) || 0);
    }, [open, value, items]);

    function toggleOpen() {
        setOpen((s) => !s);
    }

    function handleKeyDown(e) {
        if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
            e.preventDefault();
            setOpen(true);
            return;
        }
        if (open) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlighted((h) => Math.min(h + 1, items.length - 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlighted((h) => Math.max(h - 1, 0));
            } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const item = items[highlighted];
                if (item) {
                    onSelect(item);
                    setOpen(false);
                }
            } else if (e.key === "Escape") {
                setOpen(false);
            }
        }
    }

    return (
        <div className="relative inline-block text-left" ref={containerRef}>
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={toggleOpen}
                onKeyDown={handleKeyDown}
                className="w-56 flex items-center justify-between gap-2 px-3 py-2 border rounded-lg shadow-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                <span className={`truncate ${selected ? "text-gray-900" : "text-gray-500"}`}>
                    {selected ? selected.label : placeholder}
                </span>
                <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
            </button>

            {open && (
                <ul
                    role="menu"
                    aria-label="Dropdown"
                    tabIndex={-1}
                    className="absolute z-[9999] mt-2 w-56 max-h-56 overflow-auto rounded-lg border bg-white shadow-lg py-1 "
                    onKeyDown={handleKeyDown}
                >
                    {items.length === 0 && (
                        <li className="px-3 py-2 text-sm text-gray-500">No options</li>
                    )}
                    {items.map((item, i) => {
                        const isHighlighted = i === highlighted;
                        const isSelected = selected && selected.value === item.value;
                        return (
                            <li
                                key={i}
                                role="menuitem"
                                onMouseEnter={() => setHighlighted(i)}
                                onClick={() => {
                                    onSelect(item);
                                    setOpen(false);
                                }}
                                className={`cursor-pointer px-3 py-2 text-sm flex items-center justify-between ${isHighlighted ? "bg-indigo-50" : ""} ${isSelected ? "font-semibold" : "font-normal"}`}
                            >
                                <span className="truncate">{item.label}</span>
                                {isSelected && (
                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M16.7 5.3a1 1 0 00-1.4-1.4L7 12.2 4.7 10a1 1 0 10-1.4 1.4l3 3a1 1 0 001.4 0l8-8z" />
                                    </svg>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
