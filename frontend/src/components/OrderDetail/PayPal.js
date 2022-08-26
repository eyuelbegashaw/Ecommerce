import {useRef, useEffect} from "react";

function PayPal({price, setPaymentError, handlePayment}) {
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Product Payment",
                amount: {
                  currency_code: "USD",
                  value: price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          handlePayment(order);
        },
        onError: err => {
          setPaymentError({value: true, message: err.message});
        },
      })
      .render(paypalRef.current);
  }, []);

  return (
    <div>
      <div ref={paypalRef}> </div>
    </div>
  );
}

export default PayPal;
