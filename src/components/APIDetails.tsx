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
          <h4>Description</h4>
          <p>{providerDetails.info.description}</p>
          <h4>Swagger</h4>
          <p>{providerDetails.swaggerUrl}</p>
          <h4>Contact</h4>
          <span>Email </span> <span>{providerDetails.info.contact?.email}</span><br/>
          <span>Name </span> <span>{providerDetails.info.contact?.name}</span><br/>
          <span>URL </span> <span>{providerDetails.info.contact?.url}</span><br/>
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
  min-height: 100vh;
  background-color: #f1f1f1;
  padding: 20px;
  background: #4b627c;
`;

// Card containing the API details
const DetailsCard = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  text-align: center;

  h3 {
    color: #fff;
    margin: 0;
    align-content: center;
  }

  h4 {
    color: #fff;
    font-weight: 500;
    margin: 0;
    margin-bottom: 10px;
  }

  span {
    display :inline-block;
    color: #fff;
    margin-bottom: 5px;
}
  
  p {
    text-align: left;
    font-size: 1rem;
    margin-bottom: 20px;
    color: #fff;
  }

  strong {
    color: #3498db;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// Logo image with constrained size
const LogoImage = styled.img`
  max-height: 70px;
  object-fit: contain;
  border-radius: 8px;
  padding: 5px;

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
