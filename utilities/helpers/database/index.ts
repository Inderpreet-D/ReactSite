import Admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize app only once
if (!Admin.apps.length) {
  const credential = Admin.credential.cert({
    projectId: "react-site-inder",
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  });

  const databaseURL = "https://react-site-inder.firebaseio.com";

  Admin.initializeApp({ credential, databaseURL });
}

const Database = Admin.database();

// Gets a value from the database
export const get = async (path: string): Promise<any> => {
  return await new Promise(async (res, rej) => {
    try {
      await Database.ref(path).once("value", (snap) => res(snap.val()));
    } catch (err) {
      rej(err);
    }
  });
};

// Writes some data to the database
export const set = async (path: string, data: any): Promise<void> =>
  await Database.ref(path).set(data);

export default Database;
