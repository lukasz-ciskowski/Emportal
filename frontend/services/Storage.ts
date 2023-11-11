class Storage {
  read(key: string): string | null | false {
    if (process.client) {
      return localStorage.getItem(key);
    }
    return false;
  }

  write(key: string, value: string) {
    if (process.client) {
      localStorage.setItem(key, value);
    }
  }

  remove(key: string) {
    if (process.client) {
      localStorage.removeItem(key);
    }
  }
}

export const storageService = new Storage();
