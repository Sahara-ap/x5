export const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
) => {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
