'use client';
import { useEffect, useState } from 'react';

type Student = {
  id: number;
  name: string;
  email: string;
  dob: string;
};

export default function GetStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/student')
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul className="space-y-2">
          {students.map((s) => (
            <li key={s.id} className="border px-4 py-2 rounded shadow-sm">
              <p><strong>ID:</strong> {s.id}</p>
              <p><strong>Name:</strong> {s.name}</p>
              <p><strong>Email:</strong> {s.email}</p>
              <p><strong>DOB:</strong> {s.dob}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
