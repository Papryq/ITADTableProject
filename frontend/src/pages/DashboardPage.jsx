import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

import fire from "../assets/fire.png"

const DashboardPage = () => {
  const { fetchOrders, orders, isLoading, error } = useAuthStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="flex justify-between">
      <div>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : orders && orders.length > 0 ? ( // Upewnij się, że orders nie jest pustą tablicą
          <ul>
            {orders.map((order) => (
              <table className="table-auto bg-white mx-auto border-2 border-black">
                <tbody>
                  <tr className="">
                    <td className="py-4 px-8">
                      <button className="border-2 border-black w-8 h-8 rounded-lg" />{" "}
                    </td>
                    <td><img src={fire} className="w-8 h-8"  /></td>
                    <td className="py-4 pr-4">{order.orderNumber}</td>
                    <td className="py-4 px-16">{order.orderStatus}</td>
                    <td className="py-4 px-8">
                      {order.orderNotebookCount}/{order.orderSystemCount}
                    </td>
                    <td className="py-4 px-8">{order.orderDateExpiresAt}</td>
                    <td className="py-4 pl-8 pr-2">
                      <button className="border-2 border-black w-8 h-8 rounded-lg" />{" "}
                    </td>
                    <td className="">
                      <button className="border-2 border-black w-8 h-8 rounded-lg" />{" "}
                    </td>
                    <td className="py-4 px-16">
                      <select id="options">
                        <option>--</option>
                        <option value="abc">ABC</option>
                        <option value="xyz">XYZ</option>
                      </select>
                    </td>
                    <td><img src={fire} className="w-8 h-8"  /></td>
                    <td><img src={fire} className="w-8 h-8"  /></td>
                  </tr>
                </tbody>
              </table>
            ))}
          </ul>
        ) : (
          <p>No orders available.</p> // Jeśli orders jest pustą tablicą
        )}
      </div>
      <div>123</div>
    </div>
  );
};

export default DashboardPage;
