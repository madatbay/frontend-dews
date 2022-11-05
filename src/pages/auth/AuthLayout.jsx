import { Container, Row, Text } from "@nextui-org/react";
import React from "react";

import "./auth.css";

export default function AuthLayout({ children }) {
  return (
    <Container xl css={{ height: "100vh" }} className="mesh-bg">
      <Row align="center" justify="center" css={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Text h1 color="primary">
          dews.io
        </Text>
        {children}
      </Row>
    </Container>
  );
}
