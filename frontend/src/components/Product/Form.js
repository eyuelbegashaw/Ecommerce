const Form = ({handleSubmit, handleChange, handleUpload, inputs, edit}) => {
  return (
    <form onSubmit={e => handleSubmit(e)} className="row g-3">
      <h5 className="">{edit ? "Edit Product" : "Create New Product"}</h5>
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={inputs.name}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={inputs.description}
          onChange={e => handleChange(e)}
        />
      </div>

      <div className="col-md-6">
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Image
          </label>
          <input class="form-control" type="file" id="formFile" onChange={e => handleUpload(e)} />
        </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="brand" className="form-label">
          Brand
        </label>
        <input
          type="text"
          className="form-control"
          id="brand"
          name="brand"
          value={inputs.brand}
          onChange={e => handleChange(e)}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          type="text"
          className="form-control"
          id="category"
          name="category"
          value={inputs.category}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={inputs.price}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="countInStock" className="form-label">
          Count In Stock
        </label>
        <input
          type="number"
          className="form-control"
          id="countInStock"
          name="countInStock"
          value={inputs.countInStock}
          onChange={e => handleChange(e)}
        />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          {edit ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default Form;
