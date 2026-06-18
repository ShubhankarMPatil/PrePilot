interface Props {
  tasks: string[];
}

export default function TaskList({
  tasks,
}: Props) {
  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        Tasks For Selected Day
      </h2>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task}>
            • {task}
          </li>
        ))}
      </ul>
    </div>
  );
}