interface SettingCardProps {
  label: string;
  value: string;
}

export default function SettingCard({
  label,
  value,
}: SettingCardProps) {
  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold mt-2">
        {value}
      </p>
    </div>
  );
}