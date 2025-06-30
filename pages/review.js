// pages/review.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ReviewPage() {
  const router = useRouter();
  const { sessionId, pdfUrl } = router.query;
  const [decodedUrl, setDecodedUrl] = useState(null);
  const [comments, setComments] = useState('');

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
        body: JSON.stringify({ sessionId, decision, comments }),
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
  <div className="min-h-screen flex flex-col bg-white">
  <div className="flex flex-col items-center w-full p-6 bg-white">
    <h1 className="text-3xl font-semibold text-center mb-6">Graphic Proofs</h1>

    <div className="flex-auto flex-col md:flex-row w-full max-w-6xl gap-6 h-[100vh]">
      
      {/* Left side: PDF + Buttons (2/3 width) */}
      <div className="w-2/3 flex flex-col border border-gray-300 rounded bg-white shadow overflow-hidden">
        {/* Buttons */}
        <div className="flex justify-center gap-4 p-4 border-b border-gray-200 bg-white">
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

        {/* PDF Viewer */}
        <div className="flex-1">
          <iframe
            src={decodedUrl}
            className="w-full h-full border-none"
            title="PDF Preview"
          />
        </div>
      </div>

      {/* Right side: Comments (1/3 width) */}
    </div>
    <div className="w-1/3 flex flex-col border border-gray-300 rounded p-4 bg-white shadow">
        <label htmlFor="comments" className="font-semibold mb-2">
          Comments
        </label>
        <textarea
          id="comments"
          name="comments"
          rows={16}
          placeholder="Add feedback here..."
          className="w-full p-2 border border-gray-300 rounded resize-none"
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
  </div>
</div>
);






}
