// pages/review.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ReviewPage() {
  const router = useRouter();
  const { sessionId, pdfUrl } = router.query;
  const [decodedUrl, setDecodedUrl] = useState(null);

  useEffect(() => {
    if (pdfUrl) {
      // Replace raw=0 or dl=0 with raw=1 if not already set
      let correctedUrl = decodeURIComponent(pdfUrl);
      correctedUrl = correctedUrl.replace(/dl=0|dl=1/g, 'raw=1').replace(/raw=0/g, 'raw=1');
      setDecodedUrl(correctedUrl);
    }
  }, [pdfUrl]);

  const handleResponse = async (decision) => {
    try {
      await fetch('https://hook.us2.make.com/6q6ss97p4n4dhexbbitcz6n9r4o9sb4v', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, decision }),
      });
      alert(`You selected: ${decision}`);
      window.close(); //close window
    } catch (err) {
      console.error('Error submitting decision:', err);
      alert('Something went wrong.');
    }
  };

  if (!decodedUrl) return <p className="text-center mt-10">Loading PDF...</p>;

return (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
    <h1 className="text-3xl font-semibold text-center mb-6">Graphic Proofs</h1>

    <div className="relative w-full max-w-6xl h-[80vh]">
      <iframe
        src={decodedUrl}
        className="w-full h-full border rounded-md shadow-lg"
      />

      {/* Mobile-friendly floating buttons */}
      <div className="absolute top-4 right-4 sm:flex sm:flex-col flex gap-2 sm:gap-3 z-10">
        <button
          onClick={() => handleResponse('approved')}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm sm:text-base"
        >
          Approve
        </button>
        <button
          onClick={() => handleResponse('rejected')}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm sm:text-base"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
);

}
