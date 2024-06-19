import React, { Component } from "react";

export default class Modal extends Component {
  constructor(props) {
    super(props);// calls the constructor of the parent class
    this.state = {
      rname: props.recipe ? props.recipe.rname : "",//condition ? trueValue : falseValue
      ringredient: props.recipe ? props.recipe.ringredient : "",
      description: props.recipe ? props.recipe.description : ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recipe !== this.props.recipe && this.props.recipe) {//previous and current 
      this.setState({
        rname: this.props.recipe.rname,
        ringredient: this.props.recipe.ringredient,
        description: this.props.recipe.description
      });
    }
  }

  handleChange = (e) => {
    let newState = {
      ...this.state,
      [e.target.name]: e.target.value//new value
    };
    this.setState(newState);
  };

  handlePrimaryButtonClick = () => {
    const { rname, ringredient, description } = this.state;
    if (rname && ringredient && description) {
      this.props.handlePrimaryButtonFunction(this.state);
      let newState = {
        rname: "",
        ringredient: "",
        description: ""
      };
      this.setState(newState);
    } else {
      alert("Please fill in all fields.");
    }
  };

  render() {
    let {
      title,
      btnPrimaryLabel,
      btnSecondaryLabel,
      primaryButtonClassName,
      toggleModal,
    } = this.props;
    let { rname, ringredient, description } = this.state;

    return (
      <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog" style={{ width: "800px", height: "600px" }}>
          <div className="modal-content mt-5">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                onClick={toggleModal}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p style={{ margin: "-15px", marginLeft: "5px" }}>Recipe Name</p>
              <div className="mb-5 mt-3">
                <input
                  name="rname"
                  type="text"
                  id="rname"
                  className="form-control"
                  placeholder="Enter the recipe's name "
                  value={rname}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col">
                  <div>Recipe Ingredients</div>
                  <textarea
                    name="ringredient"
                    className="form-control"
                    style={{ width: "100%", height: "200px" }}
                    placeholder="Enter each engridents separated by sdterik. For ex.1 table spoon sugar * 2 table spoon honey"
                    value={ringredient}
                    onChange={this.handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col">
                  <div>Recipe Description</div>
                  <textarea
                    name="description"
                    className="form-control"
                    style={{ width: "100%", height: "200px" }}
                    placeholder="Enter each description separated by sterik. For ex. Boil water for 5mins * Add sugar"
                    value={description}
                    onChange={this.handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={toggleModal}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {btnSecondaryLabel}
              </button>
              <button
                onClick={this.handlePrimaryButtonClick}
                type="button"
                className={`btn ${primaryButtonClassName}`}
              >
                {btnPrimaryLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
