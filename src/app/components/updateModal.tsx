import { useState } from "react";

const UpdateModal = ({ onClose, fetchUsers }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async () => {
    if (!id || !name || !username || !password) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/users`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id, name, username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update user");

      fetchUsers()

      alert("User updated successfully!");
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
        <h2 className="text-2xl font-bold mb-4 text-white">Update User</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-4 py-2 text-white bg-zinc-800 border border-gray-500 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 text-white bg-zinc-800 border border-gray-500 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            onClick={handleUpdateUser}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
