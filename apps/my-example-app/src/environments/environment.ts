import { createMocksInterceptor } from '@backbase/foundation-ang/data-http';

import { Item } from '@backbase/foundation-ang/web-sdk';
import { ExternalServices } from '@backbase/foundation-ang/start';

import { Environment } from './type';

const services: ExternalServices = {
  auth: () => ({
    login: (username: any, password: any) => Promise.resolve(),
    logout: () => Promise.resolve(),
    goToLoginPage: () => {},
    register: (countdown: any) => () => {},
    refresh: () => Promise.resolve(),
    timeToLive: () => 100
  }),
  eventBus: () => ({
    publish: (eventName: any, data: any) => {
      console.log(`eventBus published '${eventName}' with payload:`, data);
    },
    subscribe: (eventName: any, listener: any) => {
      console.log(`eventBus subscribed '${eventName}' to listener:`, listener);
    },
    unsubscribe: (eventName: any, listener: any) => {
      console.log(
        `eventBus unsubscribed '${eventName}' from listener:`,
        listener
      );
    }
  }),
  navigation: () => ({
    getBreadcrumbs: (uuid: any, depth: any) => {
      return Promise.resolve({
        type: 'externalLink',
        title: 'Backbase',
        url: 'http://www.backbase.com',
        isCurrent: true,
        properties: {}
      });
    },
    getTree: (uuid: any, depth: any) => {
      return Promise.resolve({
        type: 'externalLink',
        title: 'Backbase',
        url: 'http://www.backbase.com',
        isCurrent: true,
        isInPath: false,
        properties: {},
        children: []
      });
    }
  }),
  pageConfig: () => ({
    apiRoot: '/gateway/api',
    staticResourcesRoot: '/gateway/api/portal',
    portalName: 'bbus-standalone',
    pageName: 'index',
    currentLink: '',
    version: '6',
    locale: 'en-US'
  }),
  portalContent: () => ({
    get: (contentRef: any) => {
			console.log('++ contentRef', contentRef);
      return Promise.resolve({});
    }
  })
};

const pageModel: Item = {
  name: 'app-container',
  properties: {},
  children: [
		{
			name: 'panel-111',
			properties: {
				classId: 'PanelContainerComponent',
				cssClasses: 'd-block container my-5'
			},
			children: [
				{
					name: 'transaction-signing-widget',
					properties: {
						classId: 'TransactionSigningWidgetComponent'
					}
				}
			]
		}
	],
};

export const environment: Environment = {
  production: false,
  mockProviders: [createMocksInterceptor()],
  bootstrap: {
    pageModel,
    services,
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
