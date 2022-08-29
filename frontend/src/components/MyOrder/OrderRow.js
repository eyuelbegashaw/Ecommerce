const OrderRow = ({order}) => {
  return (
    <tr>
      <td>{order._id}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>{order.totalPrice} </td>
      <td className="text-center">
        {order.isPaid ? (
          <span className="text-success">{order.paidAt.substring(0, 10)}</span>
        ) : (
          <i className="fa-solid fa-xmark text-danger"></i>
        )}
      </td>

      <td className="text-center">
        {order.isDelivered ? (
          <span className="text-success">{order.deliveredAt.substring(0, 10)}</span>
        ) : (
          <i className="fa-solid fa-xmark text-danger"></i>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;
