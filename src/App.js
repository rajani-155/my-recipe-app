import React, { Component } from "react";
import './App.css';
import Modal from "./component/Modal";
import RecipeTablePage from "./component/RecipeTablePage";


export default class App extends Component {
  state = {
    recipe:
      { rname: "",
        ringredient: "",
        description: ""
      },  
    showModal: false,
    details: [], // Array to store recipes
    selectedRecipe: null, 
    showLeftContent: false, 
    isEdit: false, 
    editIndex: null, 
    deleteItemId: null,
    
  };

  
  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      isEdit: false,
      editIndex: null,
      recipe: { rname: "", ringredient: "", description: "" }
    });
  };

  
  handleAdd = (recipe) => {
    const { details, isEdit, editIndex } = this.state;
    const updatedDetails = [...details];

    if (isEdit && editIndex !== null) {      
      updatedDetails[editIndex] = {
        recipename: recipe.rname,
        ingredientname: recipe.ringredient,
        description: recipe.description,
      };
    } else {      
      updatedDetails.push({
        recipename: recipe.rname,
        ingredientname: recipe.ringredient,
        description: recipe.description,
      });
    }
    
    this.setState({
      details: updatedDetails,
      recipe: { rname: "", ringredient: "", description: "" },
      showModal: false,
      showLeftContent: true, 
      selectedRecipe: isEdit ? updatedDetails[editIndex] : null,
      isEdit: false,
    });
  };

  
  handleRecipeClick = (recipe) => {
    this.setState({ selectedRecipe: recipe });
  };

 
  handleEdit = (index) => {
    let { recipe, details } = this.state;
    let recipeToEdit = details[index];

    recipe.rname = recipeToEdit.recipename;
    recipe.ringredient = recipeToEdit.ingredientname;
    recipe.description = recipeToEdit.description;

    this.setState({
      recipe,
      isEdit: true,
      editIndex: index,
      showModal: true
    });
  }
  
  //handleDelete = (recipe) => {
  //let details = this.state.details.filter((item) => item !== recipe);
    //this.setState({ details, selectedRecipe: null }); // Clear selected recipe if deleted

//};

handleDelete = (index) => {
  const { details, selectedRecipe, showLeftContent } = this.state;
  const updatedDetails = [...details];
  updatedDetails.splice(index, 1); // Remove the item at the given index
  
  this.setState({
    details: updatedDetails,
    selectedRecipe: showLeftContent ? null : selectedRecipe 
  });
};

  render() {
    const {
      details,
      showModal,
      recipe,
      selectedRecipe,
      showLeftContent,
      isEdit,
    } = this.state;

    return (
      <div className="container">
        {showModal && (
          <>
            <div className="modal-overlay"></div>
            <Modal
              title={isEdit ? "Edit Recipe" : "Add Recipe"}
              btnPrimaryLabel={isEdit ? "Update Recipe" : "Add Recipe"}
              btnSecondaryLabel="Cancel"
              primaryButtonClassName="btn-primary"
              toggleModal={this.hideModal}
              handlePrimaryButtonFunction={this.handleAdd}
              recipe={recipe}
            />
          </>
        )}

        <div className="row">
          <div className="col-md-5 position-relative">
            {showLeftContent ? (
              <RecipeTablePage
                details={details}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                handleRecipeClick={this.handleRecipeClick}
                showModal={this.showModal}
              />
            ) : (
              <table className="table-custom mt-5 table table-bordered ms-5">
                <thead>
                  <tr>
                    <th>
                      <div className="recipe-header d-flex align-items-center justify-content-between">
                        <h5 className="mb-0 me-5">Recipe's List</h5>
                        <i
                          className="ri-add-box-line"
                          style={{ cursor: 'pointer' }}
                          onClick={this.showModal}
                        ></i>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="images-container mt-5 ms-5">
                        <img
                          src="/recipe1.png"
                          alt="Not Loaded"
                          className="responsive-photo"
                          style={{ cursor: 'pointer', width: '100%' }}
                        />
                        <button
                          type="button"
                          className="btn btn-primary mt-3"
                          onClick={this.showModal}
                        >
                          Add Recipe
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* Right column */}
          <div className="col-md-5 position-relative ms-3">
            {selectedRecipe ? (
              <div>
                <table className="mt-5 table table-bordered table-sm table-custom custom-border">
                  <thead>
                    <tr>
                      <th>
                        <div className=" ms-2 recipe-header d-flex align-items-center justify-content-between">
                          <h5>{selectedRecipe.recipename}'s Recipe</h5>
                          <div className="text-end">
                            <i
                              className="ri-edit-line"
                              onClick={() => this.handleEdit(details.indexOf(selectedRecipe))}//index within details
                              title='Edit'
                            ></i>
                            <i
                              className="ri-delete-bin-line ms-3 text-danger"
                              onClick={() => this.handleDelete(selectedRecipe)}
                              title='Delete'
                            ></i>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <ul>
                          <li className="mt-4">Ingredient Name:<br /><br /> {selectedRecipe.ingredientname}</li>
                          <li className="mt-4">Description:<br /><br /> {selectedRecipe.description}</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div onClick={() => this.handleRecipeClick(details[0])} style={{ cursor: 'pointer' }}>
                <img
                  src="/recipe2.png"
                  alt="Not Loaded"
                  className="responsive-photo"
                  style={{ cursor: 'pointer', width: '100%', maxWidth: '500px', marginBottom: '20px', marginLeft: "100px" }}
                />
                <h3 style={{ marginLeft: "200px" }}>Select a recipe for details</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
