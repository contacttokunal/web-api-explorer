import { useEffect, useState } from "react";

const API_PROVIDER_DETAILS_URL = (providerName: string) =>
  `https://api.apis.guru/v2/${providerName}.json`;

interface ProviderDetail {
  swaggerUrl: string;
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
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state

        const response = await fetch(API_PROVIDER_DETAILS_URL(providerName));

        if (!response.ok) {
          throw new Error(`Failed to fetch details for ${providerName}`);
        }

        const data = await response.json();

        // Dynamically find the first valid key in the `apis` object
        const validKey = Object.keys(data.apis).find((key) =>
          key.startsWith(providerName)
        );

        if (validKey && data.apis[validKey]) {
          setProviderDetails(data.apis[validKey]);
        } else {
          throw new Error(`No valid platform key found for ${providerName}`);
        }
      } catch (err) {
        setError((err as Error).message);
        console.error("Error fetching provider details:", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProviderDetails();
  }, [providerName]);

  return { providerDetails, loading, error };
};

export default useFetchProviderDetails;
