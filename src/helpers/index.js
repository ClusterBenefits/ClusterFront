export const enhancedOnEndReached = (() => {
  let wait = false;
  return fetchMore => () => {
    if (wait) return;
    wait = true;
    fetchMore().then(() => {
      wait = false;
    });
  };
})();
