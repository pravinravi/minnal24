export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    site: 'Minnal24.com',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    region: 'Batticaloa, Sri Lanka',
  });
}
