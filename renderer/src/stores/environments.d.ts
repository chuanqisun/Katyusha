interface Environment {
  id: number;
  name: string;
  url: string;
  username?: string;
  password?: string;
}

interface EnvironmentsStore {
  [index: number]: Environment;
}
