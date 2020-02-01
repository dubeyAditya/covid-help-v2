
export interface IFileMetaData {
    fileName: string;
    fileType: string;
}


export interface IExam {
    name: string;
    subject: string;
    topic: string;
    class: number;
    file: IFileMetaData;
    url: string;
}

export class Exam implements IExam {
    name: string;
    subject: string;
    topic: string;
    class: number;
    file: IFileMetaData;
    url: string;
    visibility: string[];
    constructor({ name, subject, file, topic, className, url, visibility }: any) {
        this.name = name;
        this.subject = subject;
        this.topic = topic;
        this.class = className | 0;
        this.url = url;
        this.file = this.serializeFile(file.file);
        this.visibility = visibility;
    }

    serialize() {
        return JSON.parse(JSON.stringify(this));
    }

    serializeFile(file: File) {
        return {
            fileName: file.name,
            fileType: file.type
        }
    }

    toString() {
        return JSON.stringify(this);
    }
}