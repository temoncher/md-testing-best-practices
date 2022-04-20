

export type Book = {
  id: string;
  name: string;
  author: string;
  isFeatured?: boolean;
};

export const bookStore: Record<string, Book> = {
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
export const featuredBooksStore: Record<Book['id'], boolean> = {
  'effective-ts': false,
  'refactoring': true,
  'clean-code': false,
  'clean-architecture': true,
  'patterns-of-enterprise-application-architecture': true,
};
export const storedBookIds = Object.keys(bookStore);

