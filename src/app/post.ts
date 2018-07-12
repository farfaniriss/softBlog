export class Post {
    constructor(
        public id: number,
        public title: string,
        public preview: string,
        public content: string,
        public category: string,
        public coverImage: string,
        public date: string,
        public location: string,
        public thumb: string
    ){}
}
