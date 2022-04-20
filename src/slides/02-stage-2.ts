import { Book } from './02.mocks';
import { fetchBook, fetchIsFeatured } from './02.api';
import { showErrorNotification } from './02.notifications';

export async function getFeaturedStatuses(successful: Book[]) {
  const featuredRequests: Promise<boolean>[] = [];

  for (const book of successful) {
    featuredRequests.push(fetchIsFeatured(book.id));
  }

  const featuredStatuses = await Promise.all(featuredRequests);

  return featuredStatuses;
}

export function groupRequestResults(bookRequestsResults: PromiseSettledResult<Book>[]) {
  const successful: Book[] = [];
  const failed: PromiseRejectedResult[] = [];

  for (const req of bookRequestsResults) {
    if (req.status === 'fulfilled') {
      successful.push(req.value);
    } else {
      failed.push(req.reason);
    }
  }
  return { successful, failed };
}

export function groupByAuthor(successful: Book[]) {
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
  return bookNamesByAuthor;
}

/**
 * Fetches books,
 * fetches "featured" status for all successfully fetched books,
 * groups featured book names by author,
 * shows error notification for every failed request
 */
export const getFeaturedBookNamesByAuthor = async (bookIds: string[]) => {
  const bookRequestsResults = await Promise.allSettled(bookIds.map(fetchBook));

  const { successful, failed } = groupRequestResults(bookRequestsResults);

  const featuredStatuses = await getFeaturedStatuses(successful);

  successful.forEach((book, index) => {
    book.isFeatured = featuredStatuses[index];
  });

  const bookNamesByAuthor: Record<string, string[]> = groupByAuthor(successful);

  for (const rejectResult of failed) {
    showErrorNotification(rejectResult.reason);
  }

  return bookNamesByAuthor;
};

