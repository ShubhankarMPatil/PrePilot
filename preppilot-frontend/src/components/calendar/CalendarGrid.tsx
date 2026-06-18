const days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export default function CalendarGrid() {
  const dates = Array.from(
    { length: 31 },
    (_, i) => i + 1
  );

  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((day) => (
          <div
            key={day}
            className="font-semibold text-center"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => (
          <div
            key={date}
            className="aspect-square border rounded-lg flex items-center justify-center hover:bg-gray-100 cursor-pointer transition"
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}