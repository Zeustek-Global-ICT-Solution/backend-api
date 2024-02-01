import { ServiceTypes } from '@app/shared/enums';

export const configuration = () => ({
  app: {
    environment: process.env.NODE_ENV || 'development',
    encryption_key: process.env.SERVER_SECRET || 'AppSecret',
    name: process.env.APP_NAME || 'Jummai',
    jwt_secret:
      'U7hcIapWZABPDUQWJ6ltopKMMaw83b2QoEz4poA9JZ3eH40xC/xwoJwol4Ks2ZYVHzhcKMWPi/VD4WQ2VZPCkyd68qrBj7lzCHYWKpfm3PIfCn9URcyYmLfqIAppZCvkSdbTZwKmE2bLJ1USPcbVi4NN8ZrsG1ILVL6JM7y0KeQI3qG2VWg2xE+w0jxT/P9Aow1AABZ+kFGZ+qOA/MZhCyNyMoj8Kw6YYErkNxt91N0/GmHwW5az7wKaQc31eYt9cYcAzTrD6Ajha3lmAedvnbIZdmaxSoa/+fSzocl+MdFDyPhespjeRV5+h26hZ69GWtXmWuNN3jfMvVVp1uxDsA==',
    jwt_expiration: process.env.JWT_EXPIRATION || 86400000,
    baseUrl:
      process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
    domain: process.env.DOMAIN,
  },
  service: {
    serviceName: process.env.SERVICE_NAME || 'Api Jummai',
    type: ServiceTypes.HTTP,
    frontendDomain: process.env.FRONTEND_DOMAIN,
    port: process.env.PORT || 3000,
    host: process.env.HOST,
    nodeEnv: process.env.NODE_ENV || 'development',
    version: 1,
    lang: 'en',
    azure: {
      phone: process.env.AZURE_PHONE_NUMBER,
      fileUploadConnectionString:
        process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING,
      containerName: process.env.AZURE_BLOB_CONTAINER_NAME,
      communicationConnectionString:
        process.env.AZURE_COMMUNICATION_CONNECTION_STRING,
      emailDomain: process.env.AZURE_EMAIL_DOMAIN,
    },
    openAI: {
      apiKey: process.env.OPENAI_API_KEY,
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    nbsms: {
      username: process.env.NBSMS_USERNAME,
      password: process.env.NBSMS_PASSWORD,
      sender: process.env.NBSMS_SENDER,
    },
    pusher: {
      appId: process.env.APP_ID,
      apiKey: process.env.API_KEY,
      appSecret: process.env.APP_SECRET,
      cluster: process.env.CLUSTER,
    },
  },
});
