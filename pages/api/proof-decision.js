export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { sessionId, decision } = req.body;

  if (!sessionId || !decision) {
    return res.status(400).json({ error: 'Missing sessionId or decision' });
  }

  try {
    // webhook URL for response
    const makeWebhookUrl = 'https://hook.us2.make.com/h1du6cy25ge2whmbkuqruicmj3eackr1';

    const response = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, decision }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Make error:', errText);
      return res.status(500).json({ error: 'Failed to notify Make', details: errText });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}
