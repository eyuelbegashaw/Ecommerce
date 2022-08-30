const Form = ({handleSubmit, handleChange, inputs, setInputs}) => {
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row form-row align-items-center justify-content-center">
        <div className="col-sm-3 my-1">
          <label className="sr-only" htmlFor="inlineFormInputName">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inlineFormInputName"
            placeholder="Name"
            name="name"
            value={inputs.name}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="col-sm-3 my-1">
          <label className="sr-only" htmlFor="inlineFormInputGroupUsername">
            Email
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">@</div>
            </div>
            <input
              type="email"
              className="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-auto my-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="autoSizingCheck2"
              name="isAdmin"
              value={inputs.isAdmin}
              checked={inputs.isAdmin}
              onChange={e => setInputs({...inputs, isAdmin: e.target.checked})}
            />
            <label className="form-check-label" htmlFor="autoSizingCheck2">
              Admin
            </label>
          </div>
        </div>
        <div className="col-auto my-1">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
