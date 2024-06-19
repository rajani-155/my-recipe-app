import React, { Component } from "react";

class RecipeTablePage extends Component {
  render() {
    const { details, handleRecipeClick, showModal } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="mt-5 table table-bordered table-sm table-custom custom-border ms-5">
              <thead>
                <tr>
                  <th colSpan="2" className="no-top-border">
                    <div className="recipe-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0 me-5">Recipe's List</h5>
                      <i
                        className="ri-add-box-line"
                        style={{ cursor: 'pointer' }}
                        onClick={showModal}
                      ></i>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {details.map((recipe, index) => (
                  <tr key={index}>
                    <td onClick={() => handleRecipeClick(recipe)}>
                      {recipe.recipename}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeTablePage;
