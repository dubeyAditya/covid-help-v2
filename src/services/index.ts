import FireBase from "../firebase/FirebaseAuthAdapter";
const db = FireBase.getFireStore();

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

    add: function () {

    },

    remove: function () {

    },

    update: function () {

    },

    upload: function () {

    }
};
export default service;