"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { ApplicationCard } from "./application-card";
import { ApplicationsSkeleton } from "./applications-skeleton";
import { EmptyApplications } from "./empty-state";
import { useEffect, useRef } from "react";
import { getMyApplications } from "@/app/lib/applications";
import { Application } from "@/types/applications";

export function ApplicationsList() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<Application[], Error>({
    queryKey: ["my-applications"],
    initialPageParam: 1, // ✅ REQUIRED in v5
    queryFn: ({ pageParam }) => getMyApplications(pageParam as number),

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage();
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <ApplicationsSkeleton />;

  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load applications</p>
    );

  const applications = data?.pages.flat() ?? [];

  if (applications.length === 0) return <EmptyApplications />;

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <ApplicationCard key={app.id} app={app} />
      ))}

      {isFetchingNextPage && <ApplicationsSkeleton />}

      <div ref={loadMoreRef} />
    </div>
  );
}
