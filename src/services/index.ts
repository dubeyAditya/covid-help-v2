import FireBase from "../firebase/FirebaseAuthAdapter";
const db = FireBase.getFireStore();
const storage = FireBase.getStorage();
const service = {
    get: async function (collectionName: string) {
        const snapshot = await db.collection(collectionName).get();
        const exams: any = [];
        snapshot.forEach((doc: any) => {
            const exam = { key: doc.id, ...doc.data() };
            exams.push(exam);
        });
        return exams;
    },

    add: async function (collectionName: string, data: any) {
        return await db.collection(collectionName).add(data);
    },

    remove: async function (collectionName: string, docId: string) {
        return await db.collection(collectionName).doc(docId).delete();
    },

    update: async function (collectionName: string, docId: string, data: any) {
        const docRef = db.collection(collectionName).doc(docId);
        return await docRef.update(data);
    },

    upload: async function (file: File) {
        const metadata = { contentType: file.type };
        await storage.ref().child(file.name).put(file, metadata);
        return await storage.ref().child(file.name).getDownloadURL();
    },

    find: async function (collectionName: string, key: string, op: string, val: any) {
        return await db.collection(collectionName).where(key, op, val).get();
    },
    filter: async function (collectionName:string, uid:string){
        const querySnapshot = await db.collection(collectionName).where("visibility", "array-contains", uid).get();
        const exams:any =[];
        querySnapshot.forEach((doc: any) => {
            const exam = { key: doc.id, ...doc.data() };
            exams.push(exam);
        });
        return exams;
    }
};
export default service;