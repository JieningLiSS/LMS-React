import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditAuthorModal extends Component {

  constructor(props) {
    super(props);
    this.state = { snackbaropen: false, snackbarmsg: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3000/authors', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authorId: event.target.DepartmentID.value,
        authorName: event.target.DepartmentName.value
      })
    })
      .then(res => res.json())
      .then((result) => {
        this.setState({ snackbaropen: true, snackbarmsg: result });
      }
      )
  }


  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}

          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
</IconButton>
          ]}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Author
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DepartmentID">
                    <Form.Label>AuthorID</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentID"
                      required
                      disabled
                      defaultValue={this.props.depid}
                      placeholder="AuthorID"
                    />
                  </Form.Group>

                  <Form.Group controlId="DepartmentName">
                    <Form.Label>AuthorName</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentName"
                      required
                      defaultValue={this.props.depname}
                      placeholder="AuthorName"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update Author
                  </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }

}
