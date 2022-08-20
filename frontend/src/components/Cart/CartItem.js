const CartItem = ({item, handleDelete, handleQuantity}) => {
  return (
    <tr>
      <td>
        <img className="img-fluid" src={item.image} alt={item.name} style={{width: 85}} />
      </td>
      <td>{item.name}</td>
      <td>{item.price} ብር</td>
      <td>
        <select
          value={item.quantity}
          style={{width: 70}}
          onChange={e => handleQuantity(e, item.product)}
        >
          {[...Array(item.countInStock).keys()].map(value => (
            <option value={value + 1} key={value + 1}>
              {value + 1}
            </option>
          ))}
        </select>
      </td>

      <td className="text-center">
        <button className="border-0" onClick={() => handleDelete(item.product)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
