import { mergesort } from "./sorting";

const randomInRange = (min: number, max: number) =>
  (max - min) * Math.random() + min;

test("Should sort ascending", () => {
  const unsorted = new Array(100)
    .fill(0)
    .map(() => Math.floor(randomInRange(0, 20000)));
  expect(mergesort(unsorted)).toEqual(unsorted.sort((a, b) => a - b));
});
