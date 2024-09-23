import { useEffect, useState } from "react";

const API_PROVIDER_DETAILS_URL = (providerName: string) =>
  `https://api.apis.guru/v2/${providerName}.json`;

interface ProviderDetail {
  info: {
    title: string;
    description: string;
    "x-logo"?: { url: string };
    contact?: {
      email?: string;
      name?: string;
      url?: string;
    };
  };
}

const useFetchProviderDetails = (providerName: string) => {
  const [providerDetails, setProviderDetails] = useState<ProviderDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_PROVIDER_DETAILS_URL(providerName))
      .then((res) => res.json())
      .then((data) => {
        setProviderDetails(data.apis[`${providerName}:aem`] || null);
        setLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching provider details:", error)
      );
  }, [providerName]);

  return { providerDetails, loading };
};

export default useFetchProviderDetails;
