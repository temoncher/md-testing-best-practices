import { bookStore, featuredBooksStore } from './02.mocks';

const failSometimes = <T>(value: T) => {
  if (Math.random() < 0.5) {
    return Promise.reject('Something went wrong!');
  } else {
    return Promise.resolve(value);
  }
};

export const fetchBook = (id: string) => failSometimes(bookStore[id as keyof typeof bookStore]);
export const fetchIsFeatured = (id: string) => Promise.resolve(featuredBooksStore[id as keyof typeof featuredBooksStore]);