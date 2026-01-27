import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

async function enableMocking() {
  if (!isDevMode()) {
    return;
  }

  const { worker } = await import('./mock/browser');

  return worker.start();
}

enableMocking()
  .then(async () => {
    await bootstrapApplication(App, appConfig);
  })
  .catch((err) => console.log(err));
