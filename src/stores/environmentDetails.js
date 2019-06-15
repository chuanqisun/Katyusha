import { writable } from 'svelte/store';

/**
```typescript
{
  mode: 'create' | 'edit'
  name: string;
  url: string;
  auth: 'aad-basic' | 'manual';
  username?: string;
  password?: string;
}
```
*/
export const environmentDetailsStore = writable({ component: null });
