import FireBase from "../firebase";
const db = FireBase.getFireStore();
const storage = FireBase.getStorage();

const service = {
    get: async function (collectionName) {
        const snapshot = await db.collection(collectionName).get();
        const exams = [];
        snapshot.forEach((doc) => {
            const exam = { key: doc.id, ...doc.data() };
            exams.push(exam);
        });
        return exams;
    },

    getDoc: async function (collectionName, docId) {
        let data = null;
        const doc = await db.collection(collectionName).doc(docId).get();
        if (doc.exists) {
            data = { id: doc.id, ...doc.data() };
            console.log(data);
        }
        return data;
    },

    add: async function (collectionName, data) {
        return await db.collection(collectionName).add(data);
    },

    addBatch: async function (collectionName, dataArray) {
        const batch = db.batch();
        dataArray.forEach((doc) => {
            batch.set(db.collection(collectionName).doc(), doc);
        });
        return batch.commit();
    },

    removeBatch: async function (collectionName, key, op, val) {
        const batch = db.batch();
        const snapshot = await db.collection(collectionName).where(key, op, val).get();
        snapshot.forEach(doc => batch.delete(db.collection(collectionName).doc(doc.id)))
        return batch.commit();
    },

    remove: async function (collectionName, docId) {
        return await db.collection(collectionName).doc(docId).delete();
    },

    update: async function (collectionName, docId, data) {
        const docRef = db.collection(collectionName).doc(docId);
        return await docRef.update(data);
    },

    upload: async function (file) {
        const metadata = { contentType: file.type };
        await storage.ref().child(file.name).put(file, metadata);
        return await storage.ref().child(file.name).getDownloadURL();
    },

    find: async function (collectionName, key, op, val) {
        const docRef = await db.collection(collectionName).where(key, op, val).get();
        let list = [];
        docRef.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
        })
        return list;
    },

    filter: async function (collectionName, uid) {
        const querySnapshot = await db.collection(collectionName).where("users", "array-contains", uid).get();
        const exams = [];
        querySnapshot.forEach((doc) => {
            const exam = { key: doc.id, ...doc.data() };
            exams.push(exam);
        });
        return exams;
    },

    getDocRef: function (docId) {
        return db.doc(docId).ref;
    }
};
export default service;