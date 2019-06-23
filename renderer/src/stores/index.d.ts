interface Environment {
  id: number;
  name: string;
  url: string;
  auth: 'aad-basic' | 'manual';
  username?: string;
  password?: string;
}

type PortableEnvironment = Omit<Environment, 'id'>;

interface EnvironmentDetailsStore extends Environment {
  mode: 'create' | 'edit';
}

interface EnvironmentsStore {
  [index: number]: Environment;
}

interface UpdateServiceStore extends Metadata {
  needUpdate: boolean;
}

interface Metadata {
  supportedVersions: string[];
}

interface FullScreenModalStore {
  component: any /* Svelte component */;
}

interface SettingsStore {
  environmentsFilePath: string;
}
