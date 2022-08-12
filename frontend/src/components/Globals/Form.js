const Form = ({formData, onChange, onSubmit, type}) => {
  return (
    <form onSubmit={onSubmit}>
      {(type === "Register" || type === "Update") && (
        <div className="form-group  mb-2">
          <label htmlFor="name" className="form-label fw-bold">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            onChange={onChange}
          />
        </div>
      )}
      <div className="form-group  mb-2">
        <label htmlFor="email" className="form-label fw-bold">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={onChange}
        />
      </div>
      <div className="form-group  mb-2">
        <label htmlFor="email" className="form-label fw-bold">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          placeholder="Enter password"
          onChange={onChange}
        />
      </div>
      {(type === "Register" || type === "Update") && (
        <div className="form-group">
          <label htmlFor="password2" className="form-label fw-bold">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={formData.password2}
            placeholder="Confirm password"
            onChange={onChange}
          />
        </div>
      )}
      <div className="form-group mt-2">
        <button type="submit" className="btn btn-secondary">
          {type === "Update" && "Update"}
          {type === "Register" && "Register"}
          {type === "Login" && "Login"}
        </button>
      </div>
    </form>
  );
};

export default Form;
