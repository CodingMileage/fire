import React from "react";
import "./bootTut.css";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Breadcrumb,
  Card,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";

const Boott = () => {
  return (
    <>
      <div className="container">
        <form>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="color"
            id="email"
            className="form-control form-control-color"
          />
          <button>Submit</button>
        </form>

        <Container>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Form.Label>
                    <Form.Control
                      type="email"
                      className="form-label"
                      placeholder="Email@gmail.com"
                    />
                    <Form.Text>We Dont Share Information</Form.Text>
                    <Form.Control type="color" />
                  </Form.Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Form.Label>
                    <Form.Control
                      type="password"
                      className="form-label"
                      placeholder="Password"
                    />
                    <Form.Text>We Dont Share Information</Form.Text>
                  </Form.Label>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Card className="mb-3" style={{ color: "#00FF00" }}>
            <Card.Img src="https://picsum.photos/50/50" />
            <Card.Body>
              <Card.Title>Card Example</Card.Title>
              <Card.Text>This is an example of react bootstrap</Card.Text>
              <Button variant="primary">Test</Button>
            </Card.Body>
          </Card>
        </Container>

        {/* <div className="table-responsive">
          <table className="table table-hover table-bordered table-">
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>Brandon</td>
                <td>Mace</td>
                <td>26</td>
              </tr>
              <tr>
                <td>Jim</td>
                <td>Jone</td>
                <td>46</td>
              </tr>
              <tr>
                <td>Craey</td>
                <td>Whote</td>
                <td>66</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        {/* <div className="row row-cols-2 g-3">
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="box"></div>
              </div>
              <div className="col">
                <div className="box"></div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="box"></div>
          </div>
          <div className="col">
            <div className="box"></div>
          </div>
          <div className="col">
            <div className="box"></div>
          </div>
          <div className="col">
            <div className="box"></div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Boott;
