const requests = new Map();

export const apiLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowTime = 15 * 60 * 1000;
  const limit = 200;

  const record = requests.get(ip);

  if (!record) {
    requests.set(ip, { count: 1, time: now });
    return next();
  }

  if (now - record.time > windowTime) {
    record.count = 1;
    record.time = now;
    return next();
  }

  if (record.count >= limit) {
    return res.status(429).json({ message: "Too many requests" });
  }

  record.count++;
  next();
};
