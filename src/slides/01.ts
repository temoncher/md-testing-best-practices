import { fetchBooks } from './01.mocks';

const logBooks = async () => {
  const books = await fetchBooks();

  console.log(books);
};

void logBooks();