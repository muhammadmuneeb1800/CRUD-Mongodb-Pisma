"use client";

const Delete = async (id: string): Promise<void> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ _id: id });

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };

    const response = await fetch(
      "http://localhost:3000/api/users",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    alert("User deleted successfully!");
  } catch (error) {
    console.error("Error from delete function:", error);
    alert("Failed to delete user.");
  }
};

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await Delete(id);
    } catch (error) {
      console.error("Error from delete on submit:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-2 text-white bg-red-600 rounded font-semibold"
    >
      Delete
    </button>
  );
}
