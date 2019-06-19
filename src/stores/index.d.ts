interface Environment {
  id: number;
  name: string;
  url: string;
  auth: 'aad-basic' | 'manual';
  username?: string;
  password?: string;
}

type PortableEnvironment = Omit<Environment, 'id'>;

interface EnvironmentDetailsForm extends Environment {
  mode: 'create' | 'edit';
}
