import "dotenv/config";
import { defineConfig } from "drizzle-kit";


export default defineConfig({
schema: './src/db/schema.ts',
out:'./migrations',
dialect: 'sqlite',
driver:'turso',
dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN  as string
},
verbose: true,
})