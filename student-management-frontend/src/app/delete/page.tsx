'use client';

import React, { useState } from 'react';

const DeleteStudent = () => {
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId) {
      setMessage("Please enter a student ID.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/v1/student/${studentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage("Student deleted successfully!");
        setStudentId('');
      } else {
        const err = await res.json();
        setMessage(`Error: ${err.message || "Failed to delete student"}`);
      }
    } catch (error) {
      setMessage("Network error while trying to delete.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Delete Student</h2>
      <form onSubmit={handleDelete} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default DeleteStudent;
