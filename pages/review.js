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
  <div className="flex text-white h-screen">
  <div className="bg-gray-800 p-4">
    <div className="bg-white text-gray-800 w-12 h-12 rounded-full flex tiems-center justify-center">
      WYB
    </div>
  </div>
  <div className="bg-gray-700 w-60 flex flex-col">
    <div className="p-4"></div>
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
  <div className="bg-gray-600 flex-1">
    <div className="p-4 shadow-md">Pdf Proof</div>
    <div className="p-4 flex-1 bg-black">
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
  </div>
);






}
