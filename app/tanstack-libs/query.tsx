import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { QueryClient, QueryObserver } from "@tanstack/query-core";

type Post = {
  id: number;
  title: string;
  body: string;
};

export function QueryExample(this: Remix.Handle) {
  const queryClient = new QueryClient();

  const query = {
    queryKey: ["posts"],
    async queryFn({ signal }: { signal?: AbortSignal }) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
        { signal },
      );
      return (await response.json()) as Post[];
    },
    staleTime: 5000, // Consider data fresh for 5 seconds
  };

  const observer = new QueryObserver(queryClient, query);

  const unsubscribe = observer.subscribe(() => {
    if (this.signal.aborted) return unsubscribe();
    this.update();
  });

  this.signal.addEventListener(
    "abort",
    () => {
      unsubscribe();
      queryClient.clear();
    },
    { once: true },
  );

  return () => {
    const result = observer.getCurrentResult();

    return (
      <>
        <div>
          <button
            disabled={result.isFetching}
            on={[press(() => observer.refetch())]}
          >
            {result.isFetching ? "Loading..." : "Refetch Posts"}
          </button>
        </div>

        {result.isLoading && <p>Loading posts...</p>}
        {result.isError && <p>Error: {String(result.error)}</p>}
        {result.isSuccess && (
          <ul>
            {result.data.slice(0, 3).map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body.slice(0, 50)}...</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };
}
