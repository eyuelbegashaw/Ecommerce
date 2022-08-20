import axios from "axios";

const createOrder = async (newOrder, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.post("/api/orders/", newOrder, config);
  return data;
};

//GET - Get order by Id
const getOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const {data} = await axios.get(`/api/orders/${orderId}`, config);
  return data;
};

const orderPay = async (newData, token) => {
  const {orderId, paymentResult} = newData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
  return data;
};

const orderService = {
  createOrder,
  getOrder,
  orderPay,
};

export default orderService;
