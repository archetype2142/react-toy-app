import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class EditBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      title: "",
      year: "",
    }

    this.setStatesNow = this.setStatesNow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  setStatesNow() {
    if (this.state.author) {
      this.props.book.author = this.state.author
      console.log(this.props.book.author);
      console.log(this.state.author);
    }

    if (this.state.title) {
      this.props.book.title = this.state.title
    } 

    if (this.state.year) {
      this.props.book.year = this.state.year
    }
  }
  
  handleChange(e, type) {
    this.setState({
      [type]: e.target.value
    });
  }

  handleSubmit() {
    this.setStatesNow();
    let self = this.props.fetchBooks;
    this.props.handleClose();

    fetch('https://egui-back.herokuapp.com/books/' + this.props.book.id + '.json' + '?author=' + this.props.book.author + '&title=' + this.props.book.title + '&year=' + this.props.book.year, {
      method: 'put'
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      self();
    });
  }

  handleDelete() {
    let self = this.props.fetchBooks;
    this.props.handleClose();
    fetch('https://egui-back.herokuapp.com/books/' + this.props.book.id + '.json', {
      method: 'delete'
    }).then(() => self());
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Form>
          <Modal.Body>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Author</Form.Label>
                <Form.Control value={this.state.author} onChange={e => this.handleChange(e, "author")} type="text" placeholder={this.props.book.author} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control value={this.state.title} onChange={e => this.handleChange(e, "title")} type="text" placeholder={this.props.book.title} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Year</Form.Label>
                <Form.Control value={this.state.year} onChange={e => this.handleChange(e, "year")} type="text" placeholder={this.props.book.year} />
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.handleSubmit()}>
              Save 
            </Button>
            <Button variant="danger" onClick={() => this.handleDelete()}>
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      title: "",
      year: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, type) {
    this.setState({
      [type]: e.target.value
    });
  }

  handleSubmit() {
    let self = this.props.fetchBooks;
    this.props.handleClose();

    fetch('https://egui-back.herokuapp.com/books.json/' + '?author=' + this.state.author + '&title=' + this.state.title + '&year=' + this.state.year, {
      method: 'post'
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      self();
    });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>New Book</Modal.Title>
          </Modal.Header>
          <Form>
          <Modal.Body>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Author</Form.Label>
                <Form.Control value={this.state.author} onChange={e => this.handleChange(e, "author")} type="text" placeholder="Author" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control value={this.state.title} onChange={e => this.handleChange(e, "title")} type="text" placeholder="Title" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Year</Form.Label>
                <Form.Control value={this.state.year} onChange={e => this.handleChange(e, "year")} type="text" placeholder="Year" />
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.handleSubmit()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  } 
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAdd: false, 
      showEdit: false,  
      bookToEdit: "", 
    }

    this.handleShowAdd = this.handleShowAdd.bind(this);
    this.handleCloseAdd = this.handleCloseAdd.bind(this);
    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);

    this.fetchBooks = this.fetchBooks.bind(this);
  }
  
  fetchBooks() {
    fetch('https://egui-back.herokuapp.com/books.json')
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({books: data});
    });
  }

  handleCloseAdd() {
    this.setState({ showAdd: false });
  }

  handleShowAdd() {
    this.setState({ showAdd: true });
  }

  handleCloseEdit() {
    this.setState({ showEdit: false });
  }

  handleShowEdit() {
    this.setState({ showEdit: true });
  }

  componentDidMount() {
    this.fetchBooks();
  }

  bookEdit(book) {
    this.setState({ bookToEdit: book });
  }

  render() {
    return (
      <Container className="border">
      <h1 className="text-center">Library</h1>
      <div className="border no-margin">
        <Row>
          <Col>
          Title
          </Col>

          <Col>
          Author
          </Col>

          <Col>
          Year
          </Col>

          <Col>
            <div className="btn-group">
              <Button className="btn" variant="primary">
                Filter
              </Button>
            
              <Button className="btn" variant="secondary">
                Clear
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="table-wrapper-scroll-y scrollbar">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Author</th>
              <th>Title</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.books.map((book, index) => (
                <tr key={index} onClick={() => {this.handleShowEdit(); this.bookEdit(book)} }>
                  <td>{index + 1}</td>
                  <td>{book.author}</td>
                  <td>{book.title}</td>
                  <td>{book.year}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
        <Row className="center-block">
          <Col className="text-center">
            <Button variant="primary" onClick={this.handleShowAdd}>
              Add Book
            </Button>
          </Col>
          <Col className="text-center">
            <Button variant="secondary" onClick={this.handleShowEdit}>
              Edit Book
            </Button>
          </Col>
          <Col className="text-center">
            <Button variant="danger" onClick={this.handleShow}>
              Delete Book
            </Button>
          </Col>
        </Row>

        {/*pop up to add*/}
        <AddBook show={this.state.showAdd} handleClose={this.handleCloseAdd} handleShow={this.handleShowAdd} fetchBooks={this.fetchBooks}/>
        
        {/*pop up to edit*/}
        <EditBook show={this.state.showEdit} handleClose={this.handleCloseEdit} handleShow={this.handleShowEdit} book={this.state.bookToEdit} fetchBooks={this.fetchBooks}/>
        

      </Container>
    );
  }
}

export default App;