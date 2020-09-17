export const storage = {
  set: (key: string, val: any, store = window.localStorage): void => {
    store.setItem(key, JSON.stringify(val))
  },
  get: (key: string, store: any = window.localStorage): string | null => {
    try {
      return JSON.parse(store.getItem(key))
    } catch (e) {
      return store.getItem(key)
    }
  },
  remove: (key: string, store: any = window.localStorage): void => {
    store.removeItem(key)
  },
  clear: (store: any = window.localStorage): void => {
    store.clear()
  },
}
