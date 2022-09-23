import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {
  productReset,
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../../features/products/productSlice";

//Components
import Product from "../../components/Product/Product";
import Form from "../../components/Product/Form";
import {toast, ToastContainer} from "react-toastify";

const Products = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global states
  const {user} = useSelector(store => store.auth);
  const {products, isError, isSuccess, message} = useSelector(store => store.product);

  //Component states
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [inputs, setInputs] = useState({
    id: "",
    name: "",
    price: 0,
    category: "",
    brand: "",
    description: "",
    countInStock: 0,
    image: "",
  });

  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/login");
  }, [dispatch, navigate, user]);

  //fetch on mount
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(productReset());
  }, [dispatch, isError, isSuccess, message]);

  const handleDelete = id => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleChange = e => {
    const name = e.target.name;
    setInputs({...inputs, [name]: e.target.value});
  };

  //update product
  const handleSubmit = e => {
    e.preventDefault();

    if (edit) {
      const updatedProduct = {
        name: inputs.name,
        price: inputs.price,
        category: inputs.category,
        brand: inputs.brand,
        description: inputs.description,
        countInStock: inputs.countInStock,
        image,
      };
      dispatch(updateProduct({id: inputs.id, updatedProduct}));
    } else if (create) {
      dispatch(createProduct({...inputs, image}));
    }
  };

  const handleEdit = product => {
    setEdit(true);
    setCreate(false);
    setInputs({
      id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      brand: product.brand,
      description: product.description,
      image: product.image,
      countInStock: product.countInStock,
    });
  };

  const handleCreate = () => {
    setInputs({
      id: "",
      name: "",
      price: 0,
      category: "",
      brand: "",
      description: "",
      countInStock: 0,
      image: "",
    });

    setEdit(false);
    setCreate(true);
  };

  const handleHide = () => {
    setEdit(false);
    setCreate(false);
  };

  const handleUpload = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const {data} = await axios.post("/api/upload", formData, config);

      setImage(data);
    } catch (error) {
      if (error) {
        toast.error(error.message);
      }
    }
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

          {(create || edit) && (
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              inputs={inputs}
              edit={edit}
              handleUpload={handleUpload}
            />
          )}

          {products.length > 0 && (
            <table className="table table-responsive p-0">
              <thead>
                <tr>
                  <th> ID</th>
                  <th> Name</th>
                  <th> Price</th>
                  <th> Category</th>
                  <th> Brand </th>
                  <th> Edit </th>
                  <th> Remove</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <Product
                    product={product}
                    key={product._id}
                    handleDelete={() => handleDelete(product._id)}
                    handleEdit={handleEdit}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
