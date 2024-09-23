import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import APIDetails from "./components/APIDetails";
import styled from "styled-components";

const AppContainer = styled.div`
  background: #4b627c;
  height: 100vh;
`;

const Button = styled.button`
  background-color: #8bc4e2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 24px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppContainer>
      <Router>
        {isSidebarOpen && (
          <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <HomePageContainer>
                <Button onClick={() => setIsSidebarOpen(true)}>
                  Explore Web API
                </Button>
              </HomePageContainer>
            }
          />
          <Route path="/api/:providerName" element={<APIDetails />} />
        </Routes>
      </Router>
    </AppContainer>
  );
};

export default App;
