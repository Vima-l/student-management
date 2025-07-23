'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Student Management System</h1>
      <div className="space-y-2">
        <button
          onClick={() => router.push('/get-students')}
          className="block text-blue-500"
        >
          Get Students
        </button>
        <button
          onClick={() => router.push('/add-student')}
          className="block text-blue-500"
        >
          Add Student
        </button>
        <button
          onClick={() => router.push('/delete-student')}
          className="block text-blue-500"
        >
          Delete Student
        </button>
        <button
          onClick={() => router.push('/update-student')}
          className="block text-blue-500"
        >
          Update Student
        </button>
      </div>
    </main>
  );
}
