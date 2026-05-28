export default function Loading() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <div className="skeleton aspect-[2.8/1] w-full" />
      </div>

      <div className="mb-8 grid gap-5 border-b border-gray-200 pb-6 md:grid-cols-2">
        <div className="skeleton aspect-video w-full" />
        <div className="skeleton aspect-video w-full" />
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
          <span className="inline-block h-7 w-2 skeleton" />
          <div className="skeleton h-8 w-48" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 overflow-hidden">
              <div className="skeleton aspect-[4/3] w-full" />
              <div className="p-5 space-y-3">
                <div className="skeleton h-4 w-20" />
                <div className="skeleton h-5 w-full" />
                <div className="skeleton h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
