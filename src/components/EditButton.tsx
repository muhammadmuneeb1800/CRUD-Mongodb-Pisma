"use client";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}



export default function EditButton({ data }: { data: User }) {
  const handleEdit = async () => {
    await Edit(data);
  };

  return (
    <button
      onClick={handleEdit}
      className="px-3 py-2 text-white bg-blue-600 rounded font-semibold"
    >
      Edit
    </button>
  );
}
