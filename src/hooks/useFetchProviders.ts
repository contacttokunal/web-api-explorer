import { useEffect, useState } from "react";

const API_PROVIDERS_URL = "https://api.apis.guru/v2/providers.json";

const useFetchProviders = () => {
  const [providers, setProviders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_PROVIDERS_URL)
      .then((res) => res.json())
      .then((data) => {
        setProviders(data.data || []);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching providers:", error));
  }, []);

  return { providers, loading };
};

export default useFetchProviders;
