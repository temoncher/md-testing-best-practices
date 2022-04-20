import { getFeaturedBookNamesByAuthor } from  './02-stage-4';
import { Book, bookStore } from  './02.mocks';

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

it.skip('should get book names by author', async () => {
  const showErrorNotificationMock = jest.fn();
  const getBookNames = getFeaturedBookNamesByAuthor({
    showErrorNotification: showErrorNotificationMock,
    fetchBook: jest.fn().mockImplementation((id) => bookStore[id]),
    fetchIsFeatured: jest.fn().mockImplementation((id) => featuredBooksStore[id]),
  });

  const bookNames = await getBookNames(Object.keys(bookStoreMock));

  expect(showErrorNotificationMock).toBeCalledTimes(0);
  expect(bookNames).toEqual({
    'Martin Fowler':  ['Refactoring', 'Patterns of Enterprise Application Architecture'],
    'Uncle Bob': ['Clean Architecture'],
  });
});