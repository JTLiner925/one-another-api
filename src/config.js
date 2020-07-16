module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
 CLIENT_ORIGIN:  'https://oneanother.now.sh' || 'https://oneanother.jtliner925.now.sh' ||'https://oneanother-git-master.jtliner925.now.sh' || 'https://oneanother-git-master.jtliner925.vercel.app' || 'https://oneanother.jtliner925.vercel.app' || 'https://oneanother-qdl72ryna.vercel.app',
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres@localhost/one-another",
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/one-another-test'
}




