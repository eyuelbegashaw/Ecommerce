const Form = ({formData, handleChange, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group  mb-2">
        <label htmlFor="name" className="form-label fw-bold">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={formData.address}
          placeholder="Enter address"
          onChange={handleChange}
        />
      </div>

      <div className="form-group  mb-2">
        <label htmlFor="email" className="form-label fw-bold">
          City
        </label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={formData.city}
          placeholder="Enter city"
          onChange={handleChange}
        />
      </div>
      <div className="form-group  mb-2">
        <label htmlFor="email" className="form-label fw-bold">
          Postal code
        </label>
        <input
          type="text"
          className="form-control"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          placeholder="Enter postal code "
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password2" className="form-label fw-bold">
          Country
        </label>
        <input
          type="text"
          className="form-control"
          id="country"
          name="country"
          value={formData.country}
          placeholder="Country"
          onChange={handleChange}
        />
      </div>

      <div className="form-group mt-2">
        <button type="submit" className="btn btn-secondary">
          continue
        </button>
      </div>
    </form>
  );
};

export default Form;
