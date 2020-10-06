import os from 'os';
import fs from 'fs';
import * as pgMonitor from 'pg-monitor';
import { IInitOptions } from 'pg-promise';

pgMonitor.setTheme('matrix');

const $DEV =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

const logFile = './db/errors.log';

// pgMonitor.setLog((msg, info) => {
//   if (info.event === 'error') {
//     let logText = os.EOL + msg;
//     if (info.time) {
//       logText = os.EOL + logText;
//     }
//     fs.appendFileSync(logFile, logText);
//   }

//   if (!$DEV) {
//     info.display = false;
//   }
// });

export class Diagnostics {
  static init<Ext = {}>(options: IInitOptions<Ext>) {
    if ($DEV) {
      pgMonitor.attach(options);
    } else {
      pgMonitor.attach(options, ['error']);
    }
  }
}
