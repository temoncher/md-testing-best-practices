import { getFeaturedBookNamesByAuthor } from  './02-stage-1';
import { Book } from  './02.mocks';
import * as notificationsModule from './02.notifications';
import * as apiModule from './02.api';

const mockedNotificationsModule = jest.mocked(notificationsModule);
const mockedApiModule = jest.mocked(apiModule);

jest.mock('./02.api');
jest.mock('./02.notifications');

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

beforeEach(() => {
  jest.clearAllMocks();
});

it.skip('should get book names by author', async () => {
  mockedApiModule.fetchBook.mockImplementation((id) => Promise.resolve(bookStoreMock[id]));
  mockedApiModule.fetchIsFeatured.mockImplementation((id) => Promise.resolve(featuredBooksStore[id]));

  const bookNames = await getFeaturedBookNamesByAuthor(Object.keys(bookStoreMock));

  expect(mockedNotificationsModule.showErrorNotification).toBeCalledTimes(0);
  expect(bookNames).toEqual({
    'Martin Fowler':  ['Refactoring', 'Patterns of Enterprise Application Architecture'],
    'Uncle Bob': ['Clean Architecture'],
  });
});