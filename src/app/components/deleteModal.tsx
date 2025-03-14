import { useState } from "react";

const Modal = ({ onClose, fetchUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    if (!username || !password) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password }),
      });

      fetchUsers()

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete user");

      alert("User deleted successfully!");
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="p-6 border border-gray-500 bg-zinc-700 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-white">Delete User</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 text-white bg-zinc-800 border border-gray-500 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-white bg-zinc-800 border border-gray-500 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between mt-5">
          <button
            onClick={handleDeleteUser}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
