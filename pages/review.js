// pages/review.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ReviewPage() {
  const router = useRouter();
  const { sessionId, pdfUrl } = router.query;
  const [decodedUrl, setDecodedUrl] = useState(null);

  useEffect(() => {
    if (pdfUrl) {
      setDecodedUrl(decodeURIComponent(pdfUrl));
    }
  }, [pdfUrl]);

  const handleResponse = async (decision) => {
    try {
      await fetch('https://hook.us2.make.com/6q6ss97p4n4dhexbbitcz6n9r4o9sb4v', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, decision }),
      });
      alert(`You selected: ${decision}`);
    } catch (err) {
      console.error('Error submitting decision:', err);
      alert('Something went wrong.');
    }
  };

  if (!decodedUrl) return <p className="text-center mt-10">Loading PDF...</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-4 h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-center">Artwork Review</h1>
      <iframe
        src={decodedUrl}
        className="w-full h-[600px] border rounded-md"
      />
      <div className="flex justify-center gap-6 mt-4">
        <button
          onClick={() => handleResponse('approved')}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={() => handleResponse('rejected')}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
