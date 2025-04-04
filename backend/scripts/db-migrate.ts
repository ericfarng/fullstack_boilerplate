import fs from "node:fs";
import { db } from "../src/model/db-client";

try {
	db.transaction(() => {
		// run all migrations in the ./migrations folder
		const migrations = fs
			.readdirSync("./migrations")
			.filter((file) => file.endsWith(".sql"))
			.sort((a, b) => a.localeCompare(b));

		for (const migration of migrations) {
			const rawSql = fs.readFileSync(`./migrations/${migration}`, "utf8");

			console.log(`--- Begin SQL from ${migration} ---`);
			console.log(rawSql);
			console.log(`--- End SQL ---`);

			console.log(`--> Running migration: ${migration}`);
			db.exec(rawSql);
			console.log("<-- completed successfully.");
		}
	})();

	console.log("Database migrations ran successfully!");
} catch (err) {
	console.error("Error running migrations:", err);
} finally {
	db.close();
}
