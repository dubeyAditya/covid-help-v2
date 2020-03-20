
export class Exam  {
  
    constructor({ name, subject, file, topic, className, url, visibility }) {
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

    serializeFile(file) {
        return {
            fileName: file.name,
            fileType: file.type
        }
    }

    toString() {
        return JSON.stringify(this);
    }
}