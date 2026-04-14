// components/Skeleton.js - Loading skeleton screens

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden animate-pulse">
      <div className="skeleton h-44 w-full"></div>
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-1/4 rounded"></div>
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="skeleton h-4 w-4/5 rounded"></div>
        <div className="skeleton h-3 w-1/3 rounded mt-2"></div>
      </div>
    </div>
  );
}

export function FeaturedCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden animate-pulse h-80">
      <div className="skeleton h-full w-full"></div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-card p-5 animate-pulse">
      <div className="skeleton h-4 w-1/2 rounded mb-4"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-3 py-2 border-b border-gray-100">
          <div className="skeleton w-8 h-8 rounded flex-shrink-0"></div>
          <div className="skeleton w-20 h-14 rounded flex-shrink-0"></div>
          <div className="flex-1 space-y-1.5">
            <div className="skeleton h-3.5 w-full rounded"></div>
            <div className="skeleton h-3.5 w-3/4 rounded"></div>
            <div className="skeleton h-2.5 w-1/3 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TickerSkeleton() {
  return (
    <div className="bg-gray-900 h-10 animate-pulse flex items-center">
      <div className="bg-red-700 h-full w-32 flex-shrink-0"></div>
      <div className="flex-1 px-6">
        <div className="skeleton h-3 w-3/4 rounded"></div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        </div>
        <div className="space-y-6">
          <SidebarSkeleton />
        </div>
      </div>
    </div>
  );
}
