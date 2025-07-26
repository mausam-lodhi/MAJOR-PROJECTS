// copyMongoDatabase.js
import { MongoClient } from "mongodb";

// ✅ Replace with your own MongoDB connection strings
const sourceUri = "mongodb+srv://harprasadlodhi1984:SGWXgJrUKGoVM6rG@ioet.0jdmv.mongodb.net/?retryWrites=true&w=majority&appName=IoET";
const targetUri = "mongodb+srv://harprasadlodhi1984:cNrhshd1PXMuz6H6@ioet.bjvcbld.mongodb.net/";

// ✅ Replace with your database names
const sourceDbName = "test";
const targetDbName = "test";

async function copyDatabase() {
	const sourceClient = new MongoClient(sourceUri, { useNewUrlParser: true, useUnifiedTopology: true });
	const targetClient = new MongoClient(targetUri, { useNewUrlParser: true, useUnifiedTopology: true });

	try {
		console.log("🔗 Connecting to databases...");
		await sourceClient.connect();
		await targetClient.connect();
		console.log("✅ Connected to both source and target databases.");

		const sourceDb = sourceClient.db(sourceDbName);
		const targetDb = targetClient.db(targetDbName);

		const collections = await sourceDb.listCollections().toArray();
		console.log(`📚 Found ${collections.length} collections in source database.`);

		for (const { name: collName } of collections) {
			try {
				console.log(`📦 Copying collection: ${collName}...`);
				const docs = await sourceDb.collection(collName).find().toArray();

				if (docs.length === 0) {
					console.log(`⚠️  Skipped "${collName}" (no documents)`);
					continue;
				}

				// Optional: Clear the target collection first
				await targetDb.collection(collName).deleteMany({});

				const result = await targetDb.collection(collName).insertMany(docs);
				console.log(`✅ Copied ${result.insertedCount} documents to "${collName}"`);
			} catch (collErr) {
				console.error(`❌ Error copying collection "${collName}":`, collErr.message);
			}
		}

		console.log("🎉 Database copy completed successfully!");
	} catch (err) {
		console.error("❌ Failed to copy database:", err.message);
	} finally {
		await sourceClient.close();
		await targetClient.close();
		console.log("🔒 Connections closed.");
	}
}

copyDatabase();
