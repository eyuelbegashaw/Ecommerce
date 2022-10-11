import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  categoryReset,
} from "../../features/category/categorySlice";

//Components
import {toast, ToastContainer} from "react-toastify";

const Category = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global states
  const {user} = useSelector(store => store.auth);
  const {categories, isError, isSuccess, message} = useSelector(store => store.category);

  //Component states
  const [inputs, setInputs] = useState({id: "", name: ""});
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/login");
  }, [dispatch, navigate, user]);

  //fetch on mount
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategory());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(categoryReset());
  }, [dispatch, isError, isSuccess, message]);

  const handleChange = e => {
    const name = e.target.name;
    setInputs({...inputs, [name]: e.target.value});
  };

  const handleDelete = id => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteCategory(id));
    }
  };

  //update product
  const handleSubmit = e => {
    e.preventDefault();

    if (edit) {
      const updatedCategory = {name: inputs.name};
      dispatch(updateCategory({id: inputs.id, updatedCategory}));
    } else if (create) {
      dispatch(createCategory(inputs));
    }
  };

  const handleEdit = category => {
    setEdit(true);
    setCreate(false);
    setInputs({
      id: category._id,
      name: category.name,
    });
  };

  const handleCreate = () => {
    setInputs({
      id: "",
      name: "",
    });

    setEdit(false);
    setCreate(true);
  };

  const handleHide = () => {
    setEdit(false);
    setCreate(false);
  };

  return (
    <div className="container-md mt-1">
      <ToastContainer />
      <div className="row p-0">
        <div className="col-lg-8 p-0 mx-auto">
          {!create && !edit && (
            <button className="btn btn-primary" onClick={handleCreate}>
              Create
            </button>
          )}

          {(create || edit) && (
            <button className="btn btn-primary" onClick={handleHide}>
              Hide
            </button>
          )}

          {categories.length === 0 && !create && !edit && <h3 className="my-4">NO CATEGORY</h3>}

          {(create || edit) && (
            <form onSubmit={e => handleSubmit(e)} className="row g-3">
              <h5 className="">{edit ? "Edit Category" : "Create Category"}</h5>
              <div>
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
                  style={{width: 350}}
                />
                <div className="">
                  <button type="submit" className="btn btn-primary my-2">
                    {edit ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </form>
          )}

          {categories.length > 0 && (
            <table className="table table-responsive p-0">
              <thead>
                <tr>
                  <th> No</th>
                  <th> Name</th>
                  <th> </th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td> {index + 1}</td>
                    <td> {category.name}</td>
                    <td className="text-center">
                      <button className="border-0" onClick={() => handleEdit(category)}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>

                    <td className="text-center">
                      <button className="border-0" onClick={() => handleDelete(category._id)}>
                        <i className="fa fa-trash text-danger" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
