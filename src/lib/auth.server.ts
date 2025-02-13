const SESSION_NAME = 'session';
const SESSION_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7d

const getSessionExpiratationDate = () => {
  return new Date(Date.now() + SESSION_EXPIRATION_TIME);
};

export { SESSION_NAME, getSessionExpiratationDate };
