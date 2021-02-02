import { PriorityQueue } from "./priority_queue";

test("Should return a max heap by default", () => {
  const h = new PriorityQueue([10, 2, 6, -1, 20, 11]);
  expect(h.peek()).toEqual(20);
  const head = h.poll();
  expect(head).toEqual(20);
  expect(h.peek()).toEqual(11);
});

test("Should return a min heap when comparator passed", () => {
  const h = new PriorityQueue([10, 2, 6, -1, 20, 11], (a, b) => a - b);
  expect(h.peek()).toEqual(-1);
  const head = h.poll();
  expect(head).toEqual(-1);
  expect(h.peek()).toEqual(2);
});
