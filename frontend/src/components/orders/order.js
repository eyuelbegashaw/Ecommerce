import {Link} from "react-router-dom";

const Order = ({order}) => {
  return (
    <tr>
      <td>{order._id}</td>
      <td>{order.user && order.user.name}</td>

      <td> {order.createdAt.substring(0, 10)} </td>

      <td> {order.totalPrice} </td>
      <td>
        {order.isPaid ? (
          order.paidAt.substring(0, 10)
        ) : (
          <i className="fa-solid fa-xmark text-danger"></i>
        )}
      </td>

      <td>
        {order.isDelivered ? (
          order.deliveredAt.substring(0, 10)
        ) : (
          <i className="fa-solid fa-xmark text-danger"></i>
        )}
      </td>

      <td>
        <Link to={`/order/${order._id}`}>Details</Link>
      </td>
    </tr>
  );
};

export default Order;
