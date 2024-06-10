import React from "react";
import { Button, Alert, Breadcrumb, Card } from "react-bootstrap";

const ReactBoot = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Card style={{ color: "FFF" }}>
          <Card.Img src="https://picsum.photos/200/100" />
          <Card.Body>
            <Card.Title>Card Example</Card.Title>
            <Card.Text>This is an example of react bootstrap</Card.Text>
            <Button variant="primary">Test</Button>
          </Card.Body>
        </Card>
        <Breadcrumb>
          <Breadcrumb.Item>Test</Breadcrumb.Item>
          <Breadcrumb.Item>Test 2</Breadcrumb.Item>
          <Breadcrumb.Item active>Test 3</Breadcrumb.Item>
        </Breadcrumb>
        <Alert variant="success">This is a button</Alert>
        <Button>Test</Button>
      </header>
    </div>
  );
};

export default ReactBoot;
