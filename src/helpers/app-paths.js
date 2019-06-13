const app = require('electron').remote.app;
const path = require('path');
import { settingsFilename, environmentsFilename } from '../../app.config';

export const userDataPath = app.getPath('userData');
export const settingsFilePath = path.join(userDataPath, settingsFilename);
export const environmentsFilePath = path.join(userDataPath, environmentsFilename);
