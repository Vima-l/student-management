'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/v1/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, dob }),
      });

      if (res.ok) {
        alert('Student added successfully!');
        router.push('/');
      } else {
        const error = await res.text();
        alert('Error: ' + error);
      }
    } catch (err) {
      alert('Failed to add student.');
      console.error(err);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Student
        </button>
      </form>
    </main>
  );
}
