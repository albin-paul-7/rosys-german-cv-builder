const HOST_PIN = process.env.HOST_PIN || 'rosys1971';
const HOST_SECRET_TOKEN = 'rosys-host-session-key-1971';

function verifyHost(req, res, next) {
  const token = req.headers['x-host-token'] || req.query.host_token;

  if (token === HOST_SECRET_TOKEN) {
    return next();
  }

  return res.status(401).json({
    success: false,
    error: 'Unauthorized: Only the host (administrator) is authorized to access other students\' CV records.'
  });
}

function handleHostLogin(req, res) {
  const { pin } = req.body;
  if (!pin) {
    return res.status(400).json({ success: false, error: 'Host PIN is required' });
  }

  if (pin.trim() === HOST_PIN) {
    return res.json({
      success: true,
      token: HOST_SECRET_TOKEN,
      message: 'Host authentication successful'
    });
  } else {
    return res.status(401).json({
      success: false,
      error: 'Invalid Host PIN. Access restricted to Rosy\'s German School administrators.'
    });
  }
}

module.exports = {
  verifyHost,
  handleHostLogin,
  HOST_PIN
};
