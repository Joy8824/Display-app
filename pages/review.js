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
  <div className="flex flex-col min-h-screen w-screen bg-gray-100 overflow-hidden">
    {/* Main content row (avatar + comments + PDF) */}
    <div className="flex flex-1 text-white overflow-hidden">
      {/* Sidebar Avatar */}
      <div className="bg-gray-800 p-4">
        <div className="bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center">
          WYB
        </div>
      </div>

      {/* Comments Panel */}
      <div className="bg-gray-700 w-60 flex flex-col">
        <div className="p-4 shadow-md font-semibold">Comments</div>
        <div className="p-4 flex-1 flex flex-col">
          <label htmlFor="comments" className="font-semibold mb-2 text-gray-100">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            rows={12}
            placeholder="Add feedback here..."
            className="w-full p-2 border border-gray-300 rounded resize-none text-white"
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
      </div>

      {/* PDF Panel */}
      <div className="bg-gray-600 flex-1 flex flex-col">
        {/* Header + Buttons */}
        <div className="bg-gray-700 flex flex-col">
          <div className="p-4 shadow-md font-semibold justify-between items-center">Graphic Proof</div>
          <div className="p-4 flex gap-2">
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

        {/* PDF Viewer */}
        <div className="flex-1">
          <iframe
            src={decodedUrl}
            className="w-full h-9/10 border-none"
            title="PDF Preview"
          />
        </div>
      </div>
    </div>

    {/*  Fixed Footer */}
    <footer className="bg-gray-800 text-white text-center py-3">
      &copy; {new Date().getFullYear()} JoyDisplays. All rights reserved.
    </footer>
  </div>
);



}
