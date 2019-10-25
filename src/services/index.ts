import FireBase from "../firebase/FirebaseAuthAdapter";
import {IExam} from "../models/exam.model";
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

    add: async function (collectionName:string , data:IExam) {
      return await db.collection(collectionName).add(data); 
    },

    remove: async function (collectionName:string, docId: string ) {
       return await db.collection(collectionName).doc(docId).delete(); 
    },

    update: async function (collectionName:string , docId: string , data:IExam) {
        const docRef = db.collection(collectionName).doc(docId);
        return await docRef.update(data);
    },

    upload: async function (file: File) {
        const metadata = { contentType: file.type};
        await storage.ref().child(file.name).put(file, metadata);
        return await storage.ref().child(file.name).getDownloadURL();
    }
};
export default service;