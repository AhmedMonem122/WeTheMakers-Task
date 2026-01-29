export default function NotFound() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">No Jobs Found</h1>
        <p className="text-slate-500">
          Try adjusting your search or add a new job.
        </p>
      </div>
    </div>
  );
}
