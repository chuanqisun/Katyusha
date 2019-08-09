interface Environment {
  id: number;
  name: string;
  url: string;
  auth?: 'aad';
  username?: string;
  password?: string;
}

interface EnvironmentsStore {
  [index: number]: Environment;
}
