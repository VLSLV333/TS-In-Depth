import { Book } from "../iterfaces";

export class Reader {
    name: string;
    books: Book[] = []

    take(book: Book):void {
        this.books.push(book)
    }
}