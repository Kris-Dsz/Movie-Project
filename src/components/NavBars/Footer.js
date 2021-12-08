import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Row,
  Column,
  Heading,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
              <Heading>
                <Link to="/aboutus" style={{textDecoration:'none',color:'white'}}>
                  About Us
                </Link>
              </Heading>
          </Column>
          <Column>
            <Heading>
            <Link to="/contactus" style={{textDecoration:'none',color:'white'}}>
                  Contact Us
                </Link>
            </Heading>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
