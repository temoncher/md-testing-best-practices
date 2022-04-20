import zipWith from 'lodash/zipWith';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import partition from 'lodash/partition';

import { Book } from './02.mocks';

const isFulfilled = <T>(res: PromiseSettledResult<T>): res is PromiseFulfilledResult<T> => res.status === 'fulfilled';

type GetFeaturedBookNamesByAuthorDependencies = {
  showErrorNotification: (reason: string) => void;
  fetchBook: (bookId: string) => Promise<Book>;
  fetchIsFeatured: (bookId: string) => Promise<boolean>;
};

export const getFeaturedBookNamesByAuthor = (deps: GetFeaturedBookNamesByAuthorDependencies) => async (bookIds: string[]) => {
  const bookRequestsResults = await Promise.allSettled(bookIds.map(deps.fetchBook));
  const [fulfilledRequestsResults, failedRequestsResults] = partition(bookRequestsResults, isFulfilled);
  const fulfilledBooks = fulfilledRequestsResults.map((res) => res.value);

  const featuredStatuses = await Promise.all(fulfilledBooks.map((book) => deps.fetchIsFeatured(book.id)));

  const booksWithStatuses = zipWith(fulfilledBooks, featuredStatuses, (book, featuredStatus): Book => ({
    ...book,
    isFeatured: featuredStatus,
  }));
  const featuredBooks = booksWithStatuses.filter((book) => book.isFeatured);
  const booksByAuthor = groupBy(featuredBooks, (book) => book.author);
  const namesByAuthor = mapValues(booksByAuthor, (books) => books.map((book) => book.name));

  failedRequestsResults.forEach((result) => deps.showErrorNotification(result.reason));

  return namesByAuthor;
};
