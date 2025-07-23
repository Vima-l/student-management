'use client';

import React, { useState } from 'react';

export default function UpdateStudent() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      setMessage('Student ID is required');
      return;
    }

    try {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (email) params.append('email', email);

      const res = await fetch(`http://localhost:8080/api/v1/student/${id}?${params}`, {
        method: 'PUT',
      });

      if (res.ok) {
        setMessage('Student updated successfully!');
        setId('');
        setName('');
        setEmail('');
      } else {
        const data = await res.json();
        setMessage(data.message || 'Failed to update student');
      }
    } catch (error) {
      setMessage('Error updating student');
      console.error(error);
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Update Student</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Student ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          placeholder="New Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="email"
          placeholder="New Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </main>
  );
}
