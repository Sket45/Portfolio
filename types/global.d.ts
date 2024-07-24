declare global {
  interface Window {
    scrollTimeout?: ReturnType<typeof setTimeout>;
  }
}

export {};
