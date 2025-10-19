import type { Remix } from "@remix-run/dom";
import { dom } from "@remix-run/events";
import { matchSorter } from "match-sorter";
import { books } from "./books";

export function MatchSorterExample(this: Remix.Handle) {
  let searchQuery = "";
  let results = books;

  return () => {
    return (
      <>
        <h2>match-sorter Search</h2>
        <p>Search books by title, author, or genre</p>

        <input
          type="text"
          placeholder="Try: 'tolkien', 'the', 'fiction'..."
          value={searchQuery}
          on={[
            dom.input((event) => {
              searchQuery = event.currentTarget.value;
              if (searchQuery.trim() === "") results = books;
              else {
                results = matchSorter(books, searchQuery, {
                  keys: ["title", "author", "genre"],
                });
              }
              this.update();
            }),
          ]}
        />

        <p>
          Found {results.length} result{results.length !== 1 ? "s" : ""}
        </p>

        <ul>
          {results.map((book) => (
            <li key={book.title}>
              <strong>{book.title}</strong>
              <div>
                by {book.author} ({book.year}) • {book.genre}
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };
}
