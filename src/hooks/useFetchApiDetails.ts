import { useEffect, useState } from "react";
import { API_PROVIDER_DETAILS_URL } from "../constants/api";

interface ApiDetail {
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

const useFetchApiDetails = (providerName: string) => {
  const [apiDetails, setApiDetails] = useState<ApiDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_PROVIDER_DETAILS_URL(providerName))
      .then((res) => res.json())
      .then((data) => {
        setApiDetails(data.apis[`${providerName}:aem`]);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching API details:", error));
  }, [providerName]);

  return { apiDetails, loading };
};

export default useFetchApiDetails;
