import { Container, Row, Navbar, Dropdown, Avatar, Text, Button, Badge, Grid } from "@nextui-org/react";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { useAuth } from "../../useAuth";
import ShareModal from "../../components/ShareModal";
import FeedPage from "./FeedPage";
import UserSuggestionCard from "./UserSuggestionCard";

export default function FeedLayout({ children }) {
  const { userData, logout } = useAuth();

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);

  let navigate = useNavigate();
  let location = useLocation();

  const handleNavDropdown = (event) => {
    switch (event) {
      case "profile":
        navigate("/profile");
        break;
      case "logout":
        logout();
        break;
      default:
        break;
    }
  };

  return (
    <Container xl css={{ minHeight: "100vh", padding: 0, backgroundColor: "#f3f3f3" }} fluid>
      <Navbar variant="floating">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <Link to={"/"}>
            <Text color="primary" hideIn="xs" h3>
              dews.io
            </Text>
          </Link>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight activeColor="primary" hideIn="xs" variant="underline">
          <Navbar.Link href="/" isActive={location.pathname === "/"}>
            Feed
          </Navbar.Link>
          <Navbar.Link isActive={location.pathname === "/explore"} isDisabled>
            Explore{" "}
            <Badge disablOutline color="secondary" size={"xs"}>
              Coming soon
            </Badge>
          </Navbar.Link>
          <Button auto flat iconRight={<AiOutlinePlusCircle fill="currentColor" />} onClick={handler}>
            Share
          </Button>
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar bordered as="button" color="primary" size="lg" src={userData?.profile_photo ? userData?.profile_photo : ""} />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu aria-label="User menu actions" color="primary" onAction={(key) => handleNavDropdown(key)}>
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  @{userData?.username}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem activeColor="secondary" isActive={true}>
            <Link to={"/"}>"Test"</Link>
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
      <Grid.Container gap={4} justify="center" css={{ mw: "90vw", margin: "$0 auto" }}>
        {children ? (
          <Grid xs={12}>{children}</Grid>
        ) : (
          <>
            <Grid xs={12} md={8}>
              <FeedPage />
            </Grid>
            <Grid xs={12} md={4}>
              <UserSuggestionCard />
            </Grid>
          </>
        )}
      </Grid.Container>
      <ShareModal visible={visible} closeHandler={closeHandler} />
    </Container>
  );
}
