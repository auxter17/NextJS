'use client';

import { useEffect, useState } from 'react'
import Modal from "./components/createModal"
import DeleteModal from "./components/deleteModal"
import UpdateModal from "./components/updateModal"


export default function Home() {
  const [users, setUsers] = useState<{ id: string; name: string, username: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen ,deleteIsModalOpen] = useState(false);
  const [updateModalOpen ,updateIsModalOpen] = useState(false);

  const fetchUsers = () => {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:border-[5px]">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='actions flex p-8 justify-center gap-x-[30px]'>
          <button onClick={() => setIsModalOpen(true)} className='border-[1px] p-2 rounded hover:bg-white hover:text-black'>CREATE USER</button>
          <button onClick={() => deleteIsModalOpen(true)} className='border-[1px] p-2 rounded hover:bg-white hover:text-black'>DELETE USER</button>
          <button onClick={() => updateIsModalOpen(true)} className='border-[1px] p-2 rounded hover:bg-white hover:text-black'>UPDATE USER</button>
      </div>
      {isModalOpen &&  <Modal onClose={() => setIsModalOpen(false)} fetchUsers={fetchUsers} />}
      {deleteModalOpen && <DeleteModal onClose={() => deleteIsModalOpen(false)}  fetchUsers={fetchUsers} />}
      {updateModalOpen && <UpdateModal onClose={() => updateIsModalOpen(false)}  fetchUsers={fetchUsers} />}
    </div>
  );  
  
}
