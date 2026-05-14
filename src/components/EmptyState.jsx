export default function EmptyState({ icon = '🍫', title, subtitle, action, onAction }) {
  return (
    <div className="text-center py-24 text-gray-500">
      <p className="text-5xl mb-4">{icon}</p>
      <p className="text-xl font-medium">{title}</p>
      {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
      {action && (
        <button onClick={onAction}
          className="mt-4 bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900">
          {action}
        </button>
      )}
    </div>
  );
}