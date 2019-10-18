export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_4pfJMsvH44wv5memeiXnVFF100gCut0Jou",
  s3: {
    REGION: "us-east-1",
    BUCKET: "whatthegoon-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ttzncalsae.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_uA0JhRHD0",
    APP_CLIENT_ID: "4ofj2ulamq2jcc09eg9o3tsmgi",
    IDENTITY_POOL_ID: "us-east-1:a1051dd8-1dd9-4d8b-bbed-ab9322fe61bd"
  }
};
