import zipWith from 'lodash/zipWith';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import partition from 'lodash/partition';

import { fetchBook, fetchIsFeatured } from './02.api';
import { showErrorNotification } from './02.notifications';

const isFulfilled = <T>(res: PromiseSettledResult<T>): res is PromiseFulfilledResult<T> => res.status === 'fulfilled';

export const getFeaturedBookNamesByAuthor = async (bookIds: string[]) => {
  const bookRequestsResults = await Promise.allSettled(bookIds.map(fetchBook));
  const [fulfilledRequestsResults, failedRequestsResults] = partition(bookRequestsResults, isFulfilled);
  const fulfilledBooks = fulfilledRequestsResults.map((res) => res.value);

  const featuredStatuses = await Promise.all(fulfilledBooks.map((book) => fetchIsFeatured(book.id)));

  const booksWithStatuses = zipWith(fulfilledBooks, featuredStatuses, (book, featuredStatus) => ({
    ...book,
    isFeatured: featuredStatus,
  }));
  const featuredBooks = booksWithStatuses.filter((book) => book.isFeatured);
  const booksByAuthor = groupBy(featuredBooks, (book) => book.author);
  const namesByAuthor = mapValues(booksByAuthor, (books) => books.map((book) => book.name));

  failedRequestsResults.forEach((result) => showErrorNotification(result.reason));

  return namesByAuthor;
};
