require("dotenv").config({ path: ".env.local" });

// scripts/checkEnv.js
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("DIRECT_URL:", process.env.DIRECT_URL);
