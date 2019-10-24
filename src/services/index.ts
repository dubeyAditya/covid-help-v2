import FireBase from "../firebase/FirebaseAuthAdapter";
const db = FireBase.getFireStore();
const storage =  FireBase.getStorage();
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

    add: function (data:any) {

    },

    remove: function () {

    },

    update: function () {

    },

    upload: async function (file: any) {
        const metadata = { contentType: file.type};
        await storage.ref().child(file.name).put(file, metadata);
        return await storage.ref().child(file.name).getDownloadURL();
    }
};
export default service;