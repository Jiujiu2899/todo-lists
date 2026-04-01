import { UserRound, Trash, SquarePen } from "lucide-react";
import { jarjarUser } from "../../../data";

const Dashboard = () => {
  const userData = jarjarUser.user[0];
  const dataTodo = jarjarUser.todos;

  

  return (
    <div className="w-full h-screen px-20 py-10 bg-gray-300">
      <div className="w-full flex justify-between bg-gray-100 p-7 rounded-4xl">
        <h1 className="text-2xl font-bold">MY To do Dashboard</h1>
        <div className="flex gap-5">
          <UserRound className="text-blue-500" size={25} />
          <h3 className="text-xl font-semibold">{userData.name}</h3>
        </div>
      </div>

      <div className="bg-gray-200 rounded-xl">
        <div>
        <h1 className="text-2xl font-bold mt-3 ml-4 p-3">
          Todos' {userData.name}
        </h1>
        <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Add Todo
        </button>
        </div>
        <table className="w-full text-left border-collapse">
          {/*ส่วนหัวตาราง*/}
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="p-4 font-bold text-gray-700">ID</th>
              <th className="p-4 font-bold text-gray-700">Task Name</th>
              <th className="p-4 font-bold text-gray-700">Date</th>
              <th className="p-4 font-bold text-gray-700">Action</th>
            </tr>
          </thead>

          {/* ส่วนเนื้อหา*/}
          <tbody>
            {dataTodo.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-gray-600">{item.id}</td>
                <td className="p-4 text-gray-800 font-medium">{item.task}</td>
                <td className="p-4 text-gray-500">{item.date}</td>
                <td className="p-4 text-gray-500">
                  <div className="flex gap-2">
                    <SquarePen />
                    <Trash />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
