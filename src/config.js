module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
 CLIENT_ORIGIN: 'https://oneanother.jtliner925.now.sh' || 'https://oneanother.now.sh' || 'https://oneanother-git-master.jtliner925.now.sh' || 'https://oneanother-git-master.jtliner925.vercel.app' || 'https://oneanother.jtliner925.vercel.app' || 'https://oneanother-qdl72ryna.vercel.app',
  DATABASE_URL: process.env.DATABASE_URL || "postgres://lqgqqqxvwnobwc:c589d6a9b536ccf574cd0ebb3d7828be28f656e7ef2791473a246cef3468d1af@ec2-54-234-44-238.compute-1.amazonaws.com:5432/dastsh6ceocfrf",
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/one-another-test'
}




