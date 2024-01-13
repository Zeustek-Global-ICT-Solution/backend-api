import { ServiceTypes } from '@app/shared/enums';

export const configuration = () => ({
  app: {
    environment: process.env.NODE_ENV || 'development',
    encryption_key: process.env.SERVER_SECRET || 'AppSecret',
    name: process.env.APP_NAME || 'Jummai',
    jwt_secret: 'tywi876tg3nloiuygbd,lof87652ui-09873tgudud',
    jwt_expiration: process.env.JWT_EXPIRATION || 60 * 15,
    baseUrl:
      process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
    domain: process.env.DOMAIN,
  },
  service: {
    serviceName: process.env.SERVICE_NAME || 'Api Gateway',
    type: ServiceTypes.HTTP,
    frontendDomain: process.env.FRONTEND_DOMAIN,
    port: process.env.PORT || 3000,
    host: process.env.HOST,
    version: 1,
    lang: 'en',
    azure: {
      communicationServicesConnectionString:
        'endpoint=https://jummaicommunication.unitedstates.communication.azure.com/;accesskey=NzrHN6VM/Z98XT88dfq62vR/xfo6Sgd0hHydPFtDTvbBAs1evX3lpDJE7rtJ7TT6ZYPLDuwxmNxpPZeSxULQLA==',
      domain: 'DoNotReply@2ed7595d-dce8-4b8d-8f04-57930414f89f.azurecomm.net',
      phone: '+18449197534',
    },
  },
});
