const cookingBooks: unknown[] = [
  { id: 6, name: 'Salt Fat Acid Heat' },
  { id: 7, name: 'Half Baked Harvest Super Simple' },
  { id: 8, name: 'Mastering Art of French Cooking' },
];
const cookingBooksWithAuthors: unknown[] = [
  { id: 6, name: 'Salt Fat Acid Heat', author: 'Samin Nosrat' },
  { id: 7, name: 'Half Baked Harvest Super Simple', author: 'Teighan Gerard' },
  { id: 8, name: 'Mastering Art of French Cooking', author: 'Julia Child' },
];

const programmingBooks: unknown[] = [
  { id: 1, name: 'Effective TypeScript' },
  { id: 2, name: 'Refactoring' },
  { id: 3, name: 'Clean Code' },
  { id: 4, name: 'Clean Architecture' },
  { id: 5, name: 'Patterns of Enterprise Application Architecture' },
];

const programmingBooksWithAuthors: unknown[] = [
  { id: 1, name: 'Effective TypeScript', author: 'Dan Vanderkam' },
  { id: 2, name: 'Refactoring', author: 'Martin Fowler' },
  { id: 3, name: 'Clean Code', author: 'Uncle Bob' },
  { id: 4, name: 'Clean Architecture', author: 'Uncle Bob' },
  { id: 5, name: 'Patterns of Enterprise Application Architecture', author: 'Martin Fowler' },
];


const allBooks: unknown[] = [
  ...cookingBooks,
  ...programmingBooks,
];

const allBooksWithAuthors: unknown[] = [
  ...cookingBooksWithAuthors,
  ...programmingBooksWithAuthors,
];

/**
 * Fetches books from the server
 * @param options.onlyProgrammingBooks - to retreive only programming books
 * @param options.onlyCookingBooks - to retreive only cooking books
 * @param options.includeAuthors - to add book author to each book
 * @returns list of books promise
 */
export const fetchBooks = (options?: any) => {
  if (options?.onlyProgrammingBooks) {
    return Promise.resolve(options?.includeAuthors ? programmingBooksWithAuthors : programmingBooks);
  }

  if (options?.onlyCookingBooks) {
    return Promise.resolve(options?.includeAuthors ? cookingBooksWithAuthors : cookingBooks);
  }

  return Promise.resolve(options?.includeAuthors ? allBooksWithAuthors : allBooks);
};