export const API_PROVIDERS_URL = "https://api.apis.guru/v2/providers.json";
export const API_PROVIDER_DETAILS_URL = (providerName: string) =>
  `https://api.apis.guru/v2/${providerName}.json`;
