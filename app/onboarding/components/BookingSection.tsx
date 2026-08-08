"use client";

import { useState, useMemo, useCallback } from "react";

interface BookingSectionProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function generateTimeSlots12h(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour <= 17; hour++) {
    const h = hour > 12 ? hour - 12 : hour;
    const period = hour >= 12 ? "pm" : "am";
    slots.push(`${h}:00${period}`);
    if (hour < 17) {
      slots.push(`${h}:30${period}`);
    }
  }
  return slots;
}

function generateTimeSlots24h(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    if (hour < 17) {
      slots.push(`${String(hour).padStart(2, "0")}:30`);
    }
  }
  return slots;
}

const TIME_SLOTS_12H = generateTimeSlots12h();
const TIME_SLOTS_24H = generateTimeSlots24h();

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function isPastDay(year: number, month: number, day: number): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const check = new Date(year, month, day);
  check.setHours(0, 0, 0, 0);
  return check < today;
}

function isToday(year: number, month: number, day: number): boolean {
  const today = new Date();
  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  );
}

interface CalendarDay {
  day: number;
  month: number;
  year: number;
}

type TimeFormat = "12h" | "24h";

export default function BookingSection({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: BookingSectionProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");

  const timeSlots = timeFormat === "12h" ? TIME_SLOTS_12H : TIME_SLOTS_24H;

  const calendarDays = useMemo((): CalendarDay[] => {
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const daysInCurrentMonth = getDaysInMonth(viewYear, viewMonth);

    const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    const days: CalendarDay[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, month: -1, year: prevYear });
    }

    for (let d = 1; d <= daysInCurrentMonth; d++) {
      days.push({ day: d, month: 0, year: viewYear });
    }

    const remaining = 42 - days.length;
    const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    for (let d = 1; d <= remaining; d++) {
      days.push({ day: d, month: 1, year: nextYear });
    }

    return days;
  }, [viewYear, viewMonth]);

  const weeks = useMemo(() => {
    const rows: CalendarDay[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      rows.push(calendarDays.slice(i, i + 7));
    }
    return rows;
  }, [calendarDays]);

  const goToPrevMonth = useCallback(() => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }, [viewMonth]);

  const goToNextMonth = useCallback(() => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }, [viewMonth]);

  const handleDateClick = useCallback(
    (calDay: CalendarDay) => {
      if (calDay.month !== 0) return;
      if (isPastDay(viewYear, viewMonth, calDay.day)) return;
      const dateStr = formatDate(viewYear, viewMonth, calDay.day);
      onDateChange(dateStr);
      onTimeChange("");
    },
    [viewYear, viewMonth, onDateChange, onTimeChange],
  );

  const isSelected = useCallback(
    (calDay: CalendarDay) => {
      if (calDay.month !== 0) return false;
      return selectedDate === formatDate(viewYear, viewMonth, calDay.day);
    },
    [selectedDate, viewYear, viewMonth],
  );

  return (
    <div className="mt-8">
      <div className="border border-[#E5E7EB] rounded-2xl bg-white overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Calendar panel */}
          <div className="flex-1 p-6 md:py-6 md:pl-6 md:pr-5">
            {/* Month navigation — month name left, arrows right */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[15px] font-semibold text-[#111827] select-none">
                {MONTHS[viewMonth]} {viewYear}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={goToPrevMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-[#6B7280] hover:bg-[#F3F3F3] transition-colors duration-150"
                  aria-label="Previous month"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M15 19l-7-7 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-[#6B7280] hover:bg-[#F3F3F3] transition-colors duration-150"
                  aria-label="Next month"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-8 text-[12px] font-medium text-[#94A3B8] select-none"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Calendar weeks */}
            <div className="flex flex-col">
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {week.map((calDay, di) => {
                    const isAdjacent = calDay.month !== 0;
                    const past =
                      !isAdjacent && isPastDay(viewYear, viewMonth, calDay.day);
                    const todayCheck =
                      !isAdjacent && isToday(viewYear, viewMonth, calDay.day);
                    const selected = isSelected(calDay);

                    return (
                      <button
                        key={`${wi}-${di}`}
                        type="button"
                        disabled={past || isAdjacent}
                        onClick={() => handleDateClick(calDay)}
                        className={`flex items-center justify-center w-full h-10 transition-colors duration-150 ${
                          past || isAdjacent ? "cursor-not-allowed" : ""
                        }`}
                        aria-label={
                          isAdjacent
                            ? ""
                            : `${MONTHS[viewMonth]} ${calDay.day}, ${viewYear}`
                        }
                      >
                        <span
                          className={`inline-flex items-center justify-center w-9 h-9 rounded-[7px] text-[14px] transition-colors duration-150 ${
                            isAdjacent
                              ? "text-[#CBD5E1]"
                              : past
                                ? "text-[#CBD5E1]"
                                : selected
                                  ? "bg-[#0150FF] text-white font-semibold"
                                  : todayCheck
                                    ? "text-[#0150FF] font-semibold bg-[#F1F5F9]"
                                    : "text-[#111827] bg-[#F3F3F3]"
                          }`}
                        >
                          {calDay.day}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-[#F1F5F9] my-6" />

          {/* Time slots panel */}
          <div className="w-full md:w-[260px] p-6 md:py-6 md:pr-6 md:pl-5 flex flex-col">
            {selectedDate ? (
              <>
                {/* Date header */}
                <p className="text-[14px] font-semibold text-[#111827] mb-4 pb-4 border-b border-[#F1F5F9]">
                  {formatDateDisplay(selectedDate)}
                </p>

                {/* 12h / 24h toggle */}
                <div className="flex mb-4 bg-[#F3F3F3] rounded-[10px] p-0.5">
                  <button
                    type="button"
                    onClick={() => setTimeFormat("12h")}
                    className={`flex-1 py-1.5 text-[13px] font-medium rounded-[8px] transition-all duration-150 ${
                      timeFormat === "12h"
                        ? "bg-white text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                        : "text-[#6B7280]"
                    }`}
                  >
                    12h
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeFormat("24h")}
                    className={`flex-1 py-1.5 text-[13px] font-medium rounded-[8px] transition-all duration-150 ${
                      timeFormat === "24h"
                        ? "bg-white text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                        : "text-[#6B7280]"
                    }`}
                  >
                    24h
                  </button>
                </div>

                {/* Time slots */}
                <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[340px] pr-1">
                  {timeSlots.map((slot) => {
                    const isSlotSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => onTimeChange(slot)}
                        className={`w-full text-left cursor-pointer py-2.5 px-4 text-[14px] font-medium rounded-[10px] border transition-all duration-150 ${
                          isSlotSelected
                            ? "bg-[#0150FF] border-[#0150FF] text-white"
                            : "bg-white border-[#E5E7EB] text-[#111827] hover:border-[#D1D5DB]"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center flex-1 text-[13px] text-[#94A3B8] text-center leading-relaxed">
                Select a date to see
                <br />
                available times
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
