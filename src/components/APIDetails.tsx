import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import useFetchProviderDetails from "../hooks/useFetchProviderDetails";

const APIDetails = () => {
  const { providerName } = useParams<{ providerName: string }>();
  const { providerDetails, loading } = useFetchProviderDetails(
    providerName || ""
  );

  if (loading) return <Loading>Loading API details...</Loading>;

  if (!providerDetails)
    return <div>No API details found for {providerName}</div>;

  return (
    <DetailsContainer>
      <DetailsCard>
        <HeadingContainer>
          {providerDetails.info["x-logo"]?.url && (
            <LogoImage
              src={providerDetails.info["x-logo"].url}
              alt="Provider Logo"
            />
          )}
          <h3>{providerDetails.info.title} APIs</h3>
        </HeadingContainer>
        <InfoContainer>
          <p>
            <strong>Description:</strong> {providerDetails.info.description}
          </p>
          <p>
            <strong>Email:</strong> {providerDetails.info.contact?.email}
          </p>
          <p>
            <strong>Name:</strong> {providerDetails.info.contact?.name}
          </p>
          <p>
            <strong>URL:</strong>{" "}
            <a href={providerDetails.info.contact?.url}>
              {providerDetails.info.contact?.url}
            </a>
          </p>
        </InfoContainer>
        <BackLink to="/">Back to Home</BackLink>
      </DetailsCard>
    </DetailsContainer>
  );
};

// Main container for the details page
const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f1f1f1;
  padding: 20px;
  background: #4b627c;
`;

// Card containing the API details
const DetailsCard = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #2c3e50;
  }

  p {
    text-align: left;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  strong {
    color: #3498db;
  }

  a {
    color: #3498db;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
const HeadingContainer = styled.div`
  display: flex;
  justify-conent: space-between;
`;

// Logo image with constrained size
const LogoImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #ecf0f1;
  padding: 10px;
`;

// Info container to space the text content
const InfoContainer = styled.div`
  text-align: left;
  margin-bottom: 20px;

  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

// Styled loading message
const Loading = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
`;

// Back link to the home page
const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #2980b9;
  }
`;

export default APIDetails;
