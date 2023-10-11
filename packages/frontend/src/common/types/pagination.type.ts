export type Pagination = {
  total: number;
  skip: number;
  take: number;
  setSkip: (skip: number) => void;
  setTake: (take: number) => void;
};
