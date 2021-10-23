import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNotebooks, deleteTutorial } from "../actions/tutorials";
import NotebooksDataService from "../services/Notebooks.service";

class Notebooks extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getNotebooks = this.getNotebooks.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeNotebooks = this.removeNotebooks.bind(this);

    this.state = {
      currentNotebooks: {
        id: null,
        title: "",
       
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentNotebooks: {
          ...prevState.currentNotebooks,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTutorial: {
        ...prevState.currentNotebooks,
        description: description,
      },
    }));
  }

  getNotebooks(id) {
    NotebooksDataService.get(id)
      .then((response) => {
        this.setState({
          currentNotebooks: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentNotebooks.id,
      title: this.state.currentNotebooks.title,
     
      published: status,
    };

    this.props
      .updateTutorial(this.state.currentNotebooks.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateTutorial(this.state.currentNotebooks.id, this.state.currentNotebooks)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The tutorial was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeNotebooks() {
    this.props
      .deleteNotebooks(this.state.currentTutorial.id)
      .then(() => {
        this.props.history.push("/tutorials");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentNotebooks } = this.state;

    return (
      <div>
        {currentNotebooks ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Notes...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateNotebooks, deleteNotebooks })(Notebooks);
