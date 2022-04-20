const failSometimes = <T>(value: T) => {
  if (Math.random() < 0.5) {
    return Promise.reject('Something went wrong!');
  } else {
    return Promise.resolve(value);
  }
};
const showErrorNotification = console.error;

type Book = {
  id: string;
  name: string;
  status?: boolean;
};

const bookStore: Record<string, Book> = {
  'effective-ts': {
    id: 'effective-ts',
    name: 'Effective TypeScript',
  },
};
const featuredBooksStore: Record<Book['id'], boolean> = {
  'effective-ts': false,
};
const bookIds = Object.keys(bookStore);

const fetchBook = (id: string) => failSometimes(bookStore[id as keyof typeof bookStore]);
const fetchIsFavorite = (id: string) => Promise.resolve(featuredBooksStore[id as keyof typeof featuredBooksStore]);

const addStatusesToBooks = (bookRequests: PromiseSettledResult<Book>[], statuses: boolean[]) => {
  bookRequests.forEach((request, index) => {
    if (request.status === 'fulfilled') {
      request.value.status = statuses[index];
    }
  });
};


const groupBookRequests = (requests: PromiseSettledResult<Book>[]) => {
  const successful = [];
  const failed = [];

  for (const req of requests) {
    if (req.status === 'fulfilled') {
      successful.push(req.value);
    } else {
      failed.push(req.reason);
    }
  }

  return { successful, failed };
};

export const getBooks = async () => {
  const bookRequestsResults = await Promise.allSettled(bookIds.map(fetchBook));
  const favoriteStatuses = await Promise.all(bookIds.map(fetchIsFavorite));

  addStatusesToBooks(bookRequestsResults, favoriteStatuses);

  const { failed, successful } = groupBookRequests(bookRequestsResults);

  failed.forEach((reason) => {
    showErrorNotification(reason);
  });

  return successful;
};
