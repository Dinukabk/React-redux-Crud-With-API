import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveNotebooks,
  findNotebooksByTitle,
  deleteAllNotebooks,
} from "../actions/notebooks";
import { Link } from "react-router-dom";

class NotebooksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);

    this.state = {
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveNotebooks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentNotebooks: null,
      currentIndex: -1,
    });
  }

  setActiveNotebooks(Notebooks, index) {
    this.setState({
      currentNotebooks: tutorial,
      currentIndex: index,
    });
  }

  removeAllNotebooks() {
    this.props
      .deleteAllNotebooks()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findNotebooksByTitle(this.state.searchTitle);
  }

  render() {
    const { searchTitle, currentTutorial, currentIndex } = this.state;
    const { tutorials } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Notebook List</h4>

          <ul className="list-group">
            {Notebooks &&
              Notebooks.map((Notebooks, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNotebooks(Notebooks, index)}
                  key={index}
                >
                  {Notebooks.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllNotebooks}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentNotebooks ? (
            <div>
              <h4>Notebooks</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentNotebooks.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentNotebooks.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentNotebooks.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/Notebooks/" + currentNotebooks.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Notebooks...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Notebooks: state.Notebooks,
  };
};

export default connect(mapStateToProps, {
  retrieveNotebooks,
  findNotebooksByTitle,
  deleteAllNotebooks,
})(NotebooksList);
