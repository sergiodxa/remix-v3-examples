import type { Remix } from "@remix-run/dom";
import { dom } from "@remix-run/events";
import Fuse from "fuse.js";
import { books } from "./books";
import type { Book } from "./books";

type Result = {
  item: Book;
  score?: number;
};

export function FuseExample(this: Remix.Handle) {
  // Configure Fuse with fuzzy search options
  const fuse = new Fuse(books, {
    keys: ["title", "author", "genre"],
    threshold: 0.4, // Lower = more strict, higher = more fuzzy
    includeScore: true,
  });

  let searchQuery = "";

  let results: Result[] = books.map((book) => ({ item: book }));

  return () => {
    return (
      <>
        <h2>Fuse.js Fuzzy Search</h2>
        <p>Search books by title, author, or genre</p>

        <input
          type="text"
          placeholder="Try: 'orwel', 'fantasy', 'gatsby'..."
          value={searchQuery}
          on={[
            dom.input((event) => {
              searchQuery = event.currentTarget.value;
              if (searchQuery.trim() === "") {
                results = books.map((book) => ({ item: book }));
              } else results = fuse.search(searchQuery);
              this.update();
            }),
          ]}
        />

        <p>
          Found {results.length} result{results.length !== 1 ? "s" : ""}
        </p>

        <ul>
          {results.map(({ item, score }) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <div>
                by {item.author} ({item.year}) • {item.genre}
                {score !== undefined && score > 0 && (
                  <span> • Match: {Math.round((1 - score) * 100)}%</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };
}
