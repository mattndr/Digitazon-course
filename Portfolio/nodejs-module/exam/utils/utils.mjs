export function filterNotDeleted(resource) {
  const result = Object.keys(resource).reduce(
    (result, current) =>
      resource[current].deleted
        ? result
        : {
            ...result,
            [current]: resource[current],
          },
    {}
  );
  return result;
}
