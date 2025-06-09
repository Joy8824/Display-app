// pages/api/proof-decision.js
export default function handler(req, res) {
  console.log('PROOF-HANDLER called', req.body);
  res.status(200).json({ ok: true });
}
