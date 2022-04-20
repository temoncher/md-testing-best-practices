import { getFeaturedBookNamesByAuthor } from  './02-stage-1';
import { Book } from  './02.mocks';
import * as notificationsModule from './02.notifications';
import * as apiModule from './02.api';
import { getFeaturedStatuses, groupRequestResults, groupByAuthor } from './02-stage-2';

const mockedNotificationsModule = jest.mocked(notificationsModule);
const mockedApiModule = jest.mocked(apiModule);

jest.mock('./02.api');
jest.mock('./02.notifications');

beforeEach(() => {
  jest.clearAllMocks();
});

describe.skip('getFeaturedBookNamesByAuthor', () => {
  const bookStoreMock: Record<string, Book> = {
    'effective-ts': {
      id: 'effective-ts',
      name: 'Effective TypeScript',
      author: 'Dan Vanderkam',
    },
    'refactoring': {
      id: 'refactoring',
      name: 'Refactoring',
      author: 'Martin Fowler',
    },
    'clean-code': {
      id: 'clean-code',
      name: 'Clean Code',
      author: 'Uncle Bob',
    },
    'clean-architecture': {
      id: 'clean-architecture',
      name: 'Clean Architecture',
      author: 'Uncle Bob',
    },
    'patterns-of-enterprise-application-architecture': {
      id: 'patterns-of-enterprise-application-architecture',
      name: 'Patterns of Enterprise Application Architecture',
      author: 'Martin Fowler',
    },
  };
  const featuredBooksStore: Record<Book['id'], boolean> = {
    'effective-ts': false,
    'refactoring': true,
    'clean-code': false,
    'clean-architecture': true,
    'patterns-of-enterprise-application-architecture': true,
  };

  it('should get book names by author', async () => {
    mockedApiModule.fetchBook.mockImplementation((id) => Promise.resolve(bookStoreMock[id]));
    mockedApiModule.fetchIsFeatured.mockImplementation((id) => Promise.resolve(featuredBooksStore[id]));

    const bookNames = await getFeaturedBookNamesByAuthor(Object.keys(bookStoreMock));

    expect(mockedNotificationsModule.showErrorNotification).toBeCalledTimes(0);
    expect(bookNames).toEqual({
      'Martin Fowler':  ['Refactoring', 'Patterns of Enterprise Application Architecture'],
      'Uncle Bob': ['Clean Architecture'],
    });
  });
});

describe.skip('getFeaturedStatuses', () => {
  it('should get statuses', async () => {
    mockedApiModule.fetchIsFeatured.mockResolvedValue(true);
    const featuredStatuses = await getFeaturedStatuses([
      { id: 'some-id-1', author: 'some author', name: 'book name' },
      { id: 'some-id-2', author: 'some author', name: 'book name 2' },
    ]);

    expect(featuredStatuses).toEqual([true, true]);
  });

  // ...
});


describe.skip('groupRequestResults', () => {
  it('should group requests', () => {
    const { failed, successful } = groupRequestResults([
      {
        status: 'fulfilled',
        value: { id: 'some-id-1', author: 'some-author-1', name: 'Book 1' },
      },
      {
        status: 'rejected',
        reason: 'Something went wrong',
      },
      {
        status: 'fulfilled',
        value: { id: 'some-id-2', author: 'some-author-1', name: 'Book 2' },
      },
    ]);

    expect(successful).toEqual([
      { id: 'some-id-1', author: 'some-author-1', name: 'Book 1' },
      { id: 'some-id-2', author: 'some-author-1', name: 'Book 2' },
    ]);
    expect(failed).toEqual([
      'Something went wrong',
    ]);
  });

  // ...
});


describe.skip('groupByAuthor', () => {
  it('should group by author', () => {
    const byAuthor = groupByAuthor([
      { id: 'id-1', author: 'Author 1', name: 'A1 Book 1', isFeatured: true },
      { id: 'id-2', author: 'Author 1', name: 'A1 Book 2', isFeatured: true },
      { id: 'id-3', author: 'Author 2', name: 'A2 Book 1' },
      { id: 'id-3', author: 'Author 3', name: 'A3 Book 1', isFeatured: true },
      { id: 'id-3', author: 'Author 2', name: 'A2 Book 2', isFeatured: true },
      { id: 'id-3', author: 'Author 4', name: 'A4 Book 1' },
    ]);

    expect(byAuthor).toEqual({
      'Author 1': ['A1 Book 1', 'A1 Book 2'],
      'Author 2': ['A2 Book 2'],
      'Author 3': ['A3 Book 1'],
    });
  });

  // ...
});