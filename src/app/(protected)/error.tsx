'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
error,
reset,
}: {
error: Error & { digest?: string };
reset: () => void;
}) {
useEffect(() => {
console.error(error);
}, [error]);

return (
<div
style={{
position: 'relative',
minHeight: '100vh',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
background: '#0a0a0f',
overflow: 'hidden',
}}
>
{/* Ambient blobs */}
<div
style={{
position: 'absolute',
width: '600px',
height: '600px',
background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
borderRadius: '50%',
filter: 'blur(80px)',
opacity: 0.2,
top: '-10%',
left: '-10%',
pointerEvents: 'none',
zIndex: 0,
}}
/>
<div
style={{
position: 'absolute',
width: '500px',
height: '500px',
background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
borderRadius: '50%',
filter: 'blur(80px)',
opacity: 0.2,
bottom: '-10%',
right: '-10%',
pointerEvents: 'none',
zIndex: 0,
}}
/>
<div
style={{
position: 'absolute',
width: '400px',
height: '400px',
background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
borderRadius: '50%',
filter: 'blur(80px)',
opacity: 0.2,
top: '40%',
left: '50%',
pointerEvents: 'none',
zIndex: 0,
}}
/>

);
}
