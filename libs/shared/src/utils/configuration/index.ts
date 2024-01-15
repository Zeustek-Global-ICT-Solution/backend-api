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
      domain: 'DoNotReply@2ed7595d-dce8-4b8d-8f04-57930414f89f.azurecomm.net',
      phone: '+18449197534',
      fileUploadConnectionString:
        process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING,
      containerName: process.env.AZURE_BLOB_CONTAINER_NAME,
      communicationConnectionString:
        process.env.AZURE_COMMUNICATION_CONNECTION_STRING,
      emailDomain: process.env.AZURE_EMAIL_DOMAIN,
    },
  },
});
