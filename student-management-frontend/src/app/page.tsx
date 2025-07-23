// src/app/page.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-40 h-40 bg-amber-300">
<div style="width: 300px; margin: 0 auto; background: lightgreen;">
  Centered horizontally
</div>    </div>
  );
}
