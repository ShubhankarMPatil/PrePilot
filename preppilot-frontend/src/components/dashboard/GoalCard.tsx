interface GoalCardProps {
  title: string;
  progress: number;
}

export default function GoalCard({
  title,
  progress,
}: GoalCardProps) {
  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm">
      <div className="flex justify-between mb-3">
        <h3 className="font-medium">
          {title}
        </h3>

        <span className="font-semibold">
          {progress}%
        </span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}