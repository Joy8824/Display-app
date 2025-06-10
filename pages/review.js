// pages/review.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ReviewPage() {
  const router = useRouter();
  const { sessionId, pdfUrl } = router.query;
  const [decodedUrl, setDecodedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pdfUrl) {
      setDecodedUrl(decodeURIComponent(pdfUrl));
    }
  }, [pdfUrl]);

  const handleResponse = async (decision) => {
    setLoading(true);
    try {
      const res = await fetch('https://hook.us2.make.com/6q6ss97p4n4dhexbbitcz6n9r4o9sb4v', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, decision }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      alert(`You selected: ${decision}`);
    } catch (err) {
      console.error('Error submitting decision:', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!decodedUrl) return <p className="text-center mt-10">Loading PDF...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6 text-center">Artwork Review</h1>

      <div className="w-full max-w-6xl h-[80vh] mb-6">
        <iframe
          src={decodedUrl}
          className="w-full h-full border rounded-lg shadow-md"
          title="PDF Preview"
        />
      </div>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => handleResponse('approved')}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          Approve
        </button>
        <button
          onClick={() => handleResponse('rejected')}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
          disabled={loading}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
