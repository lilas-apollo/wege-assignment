export default function SkeletonProduct() {
  return (
    <div className="animate-pulse max-w-[99%] sm:p-10 p-2 m-auto bg-white  ">
      <div className="h-100 w-full bg-gray-200 rounded mb-3" />
      <div className="h-24 w-full bg-gray-200 rounded mb-3" />
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-4" />
    </div>
  );
}
