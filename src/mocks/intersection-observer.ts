const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
});
window.IntersectionObserver = vitest
  .fn()
  .mockImplementation(intersectionObserverMock);
