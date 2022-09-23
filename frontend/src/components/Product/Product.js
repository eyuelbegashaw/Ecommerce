const Product = ({product, handleDelete, handleEdit}) => {
  return (
    <tr>
      <td>{product._id}</td>
      <td>{product.name}</td>
      <td>{product.price} </td>
      <td>{product.category} </td>
      <td>{product.brand} </td>

      <td className="text-center">
        <button className="border-0" onClick={() => handleEdit(product)}>
          <i class="fas fa-edit"></i>
        </button>
      </td>

      <td className="text-center">
        <button className="border-0" onClick={handleDelete}>
          <i className="fa fa-trash text-danger" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
};

export default Product;
