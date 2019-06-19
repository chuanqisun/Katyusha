export function getNextIdFromArrayOfInts(ints) {
  let maxInt = Math.max(...ints, -1);
  return ++maxInt;
}
