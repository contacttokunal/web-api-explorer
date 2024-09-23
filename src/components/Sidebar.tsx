import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import useFetchProviders from "../hooks/useFetchProviders";
import useFetchProviderDetails from "../hooks/useFetchProviderDetails";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const { providers, loading } = useFetchProviders();

  return (
    <>
      <OverlayEffect onClick={closeSidebar} />
      <SidebarContainer>
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
    </>
  );
};

const ProviderDetails = ({
  providerName,
  closeSidebar,
}: {
  providerName: string;
  closeSidebar: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle visibility
  const [providerDetails, setProviderDetails] = useState<any>(null); // State to store fetched data
  const [loadingDetails, setLoadingDetails] = useState(false); // State to track loading status

  // Fetch provider details only when accordion is expanded
  const { providerDetails: fetchedDetails, loading } =
    useFetchProviderDetails(providerName);

  // Effect to trigger the fetching logic only when accordion is open
  useEffect(() => {
    if (isOpen && !providerDetails && !loading) {
      setLoadingDetails(true);
      setProviderDetails(fetchedDetails);
      setLoadingDetails(false);
    }
  }, [isOpen, fetchedDetails, providerDetails, loading]);

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <ProviderLink onClick={toggleDetails}>
        <span>{providerName}</span>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </ProviderLink>

      {isOpen && (
        <DetailsContainer>
          {loadingDetails ? (
            <Loading>Loading...</Loading>
          ) : providerDetails ? (
            <>
              <Wrap>
                {providerDetails?.info["x-logo"]?.url && (
                  <ProviderImage
                    src={providerDetails.info["x-logo"].url}
                    alt={`${providerName} Logo`}
                  />
                )}
                <Link to={`/api/${providerName}`} onClick={closeSidebar}>
                  {providerDetails?.info.title || providerName}
                </Link>
              </Wrap>
            </>
          ) : (
            <p>Failed to load provider details.</p>
          )}
        </DetailsContainer>
      )}
    </>
  );
};

const OverlayEffect = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000c2;
  z-index: 2;
  cursor: pointer;
`;

const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 350px;
  height: 100%;
  background-color: #4b627c;
  padding: 20px;
  transition: transform 0.3s ease;
  z-index: 100;
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.3);
  color: white;
  overflow-y: auto;
  border-left: 2px solid #3ab5f5;
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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #3b4f67;
  border-radius: 5px;
  cursor: pointer;
  span {
    color: white;
  }
  svg {
    color: white;
  }
`;

const DetailsContainer = styled.div`
  background: #1d2631;
  margin-top: 10px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  a {
    color: white;
    text-decoration: none;
    margin-top: 10px;
  }
`;

const ProviderImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: left;
  align-item: center;
  a {
    margin-left: 1rem;
  }
`;

export default Sidebar;
