export const Skeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-pink-100">
      <div className="relative aspect-square bg-gradient-to-br from-pink-50 to-purple-50 animate-pulse" />
      <div className="p-5">
        <div className="h-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg mb-3 animate-pulse" />
        <div className="h-4 bg-pink-50 rounded mb-2 animate-pulse" />
        <div className="h-4 bg-pink-50 rounded w-3/4 mb-4 animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="h-8 w-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg animate-pulse" />
          <div className="h-10 w-28 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}