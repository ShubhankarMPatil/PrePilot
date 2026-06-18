interface Props {
  data: {
    day: string;
    hours: number;
  }[];
}

export default function StudyHoursChart({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Weekly Study Hours
      </h2>

      <div className="flex items-end gap-4 h-56">
        {data.map((item) => (
          <div
            key={item.day}
            className="flex flex-col items-center flex-1"
          >
            <div
              className="w-full bg-black rounded-t"
              style={{
                height: `${item.hours * 25}px`,
              }}
            />

            <span className="mt-2 text-sm">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}