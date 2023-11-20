import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/admin/common/sidebar";

const AdminTemplate = ({children}) => {
  return (
    <Container fluid >
      <Row>
        <Col lg={3} xxl={2} className="p-0">
          <Sidebar/>
        </Col>
        <Col lg={9} xxl={10} className="p-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTemplate;
