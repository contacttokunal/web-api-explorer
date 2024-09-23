import { Link } from "react-router-dom";
import styled from "styled-components";
import useFetchProviders from "../hooks/useFetchProviders";
import useFetchProviderDetails from "../hooks/useFetchProviderDetails";

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const { providers, loading } = useFetchProviders();

  return (
    <SidebarContainer>
      <CloseButton onClick={closeSidebar}>Close</CloseButton>
      <Header>Select Provider</Header>
      {loading ? (
        <Loading>Loading providers...</Loading>
      ) : (
        <ProviderList>
          {providers.map((provider) => (
            <ProviderItem key={provider}>
              <ProviderDetails
                providerName={provider}
                closeSidebar={closeSidebar}
              />
            </ProviderItem>
          ))}
        </ProviderList>
      )}
    </SidebarContainer>
  );
};

const ProviderDetails = ({
  providerName,
  closeSidebar,
}: {
  providerName: string;
  closeSidebar: () => void;
}) => {
  const { providerDetails, loading } = useFetchProviderDetails(providerName);

  if (loading) return <Loading>Loading...</Loading>;

  return (
    <ProviderLink onClick={closeSidebar}>
      {providerDetails?.info["x-logo"]?.url && (
        <ProviderImage src={providerDetails.info["x-logo"].url} alt="Logo" />
      )}
      <Link to={`/api/${providerName}`}>
        {providerDetails?.info.title || providerName}
      </Link>
    </ProviderLink>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 350px;
  height: 100%;
  background-color: #2c3e50;
  padding: 20px;
  transition: transform 0.3s ease;
  z-index: 100;
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.3);
  color: white;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px 10px;
  cursor: pointer;
  float: right;
  margin-bottom: 10px;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Loading = styled.p`
  text-align: center;
`;

const ProviderList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProviderItem = styled.div`
  margin: 10px 0;
`;

const ProviderLink = styled.div`
  display: flex;
  align-items: center;
  a {
    color: white;
    text-decoration: none;
    margin-left: 10px;
  }
`;

const ProviderImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

export default Sidebar;
