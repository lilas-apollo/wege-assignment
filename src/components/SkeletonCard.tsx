export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white p-4 rounded-lg shadow">
      <div className="h-44 w-full bg-gray-200 rounded mb-3" />
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-4" />
    </div>
  );
}
