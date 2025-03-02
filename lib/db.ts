import postgres from "postgres";

//Singleton db file
const sql = postgres(process.env.POSTGRES_URL!, {
  max: 100, // Limit connections to 10
  idle_timeout: 180, // Close idle connections after 30 sec of inactivity
  connection: {
    application_name: "nextjs-app",
  },
});

export default sql;
