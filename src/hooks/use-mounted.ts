import { useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

export function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}
