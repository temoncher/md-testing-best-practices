import { Book } from './02.mocks';
import { fetchBook, fetchIsFeatured } from './02.api';
import { showErrorNotification } from './02.notifications';

/**
 * Fetches books,
 * fetches "featured" status for all successfully fetched books,
 * groups featured book names by author,
 * shows error notification for every failed request
 */
export const getFeaturedBookNamesByAuthor = async (bookIds: string[]) => {
  const bookRequestsResults = await Promise.allSettled(bookIds.map(fetchBook));

  const successful: Book[] = [];
  const failed: PromiseRejectedResult[] = [];

  for (const req of bookRequestsResults) {
    if (req.status === 'fulfilled') {
      successful.push(req.value);
    } else {
      failed.push(req.reason);
    }
  }

  const featuredRequests: Promise<boolean>[] = [];

  for (const book of successful) {
    featuredRequests.push(fetchIsFeatured(book.id));
  }

  const featuredStatuses = await Promise.all(featuredRequests);

  successful.forEach((book, index) => {
    book.isFeatured = featuredStatuses[index];
  });

  const bookNamesByAuthor: Record<string, string[]> = {};

  for (const book of successful) {
    if (book.isFeatured) {
      const existing = bookNamesByAuthor[book.author];

      if (existing) {
        existing.push(book.name);
      } else {
        bookNamesByAuthor[book.author] = [book.name];
      }
    }
  }

  for (const rejectResult of failed) {
    showErrorNotification(rejectResult.reason);
  }

  return bookNamesByAuthor;
};
