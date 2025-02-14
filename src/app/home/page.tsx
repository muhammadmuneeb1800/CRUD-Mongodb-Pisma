import Link from "next/link";
import { prisma } from "../../../config/prisma";
import DeleteButton from "@/components/DeleteButton";

const Users = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default async function Home() {
  const Data = await Users();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Home Page
        </h1>
        <div className="my-5 flex justify-end">
          <Link
            href="/addUsers"
            className="bg-blue-600 px-3 py-2 text-white rounded font-semibold"
          >
            Add User
          </Link>
        </div>
        {Data?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Password</th>
                  <th className="py-3 px-6 text-left">Edit</th>
                  <th className="py-3 px-6 text-left">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Data.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.password}</td>
                    <td className="py-3 px-6">
                      <Link
                        href={`/updateUser?id=${user.id}`}
                        className="px-3 py-2 text-white bg-blue-600 rounded font-semibold"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="py-3 px-6">
                      <DeleteButton id={user.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">No data found</div>
        )}
      </div>
    </div>
  );
}
