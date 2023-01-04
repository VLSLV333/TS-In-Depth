/*eslint-disable no-redeclare */

import { Category } from "./enums";
import { BookOrUndefined, BookProperties } from "./types";
import { Book, Logger, Author, TOptions, ShelfItem, Callback, LibMgrCallback} from "./iterfaces";
import RefBook from './classes/encyclopedia'

export function getAllBooks(): readonly Book[] {
    const books = <const>[
        { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available:
        true},
        { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available:
        false },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author:
        'Andrea Chiarelli', available: true }
    ]
    return books;
}

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`)
    // const title = books.find( book => book.available).title
    const title = books.find( ({available}) => available)?.title
    console.log(`First available's book title: ${title}`)
}

// logFirstAvailable(getAllBooks())

export function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[]{
    const answerArray = getAllBooks().filter( book => book.category === inputCategory)?.map( ({ title }) => title);
    return answerArray;
}

export function logBookTitles(titles : Array<string>): void{
    // console.log(titles);
    titles.forEach( title => console.log(title));
}

// logBookTitles(getBookTitlesByCategory(Category.CSS))

export function getBookAuthorByIndex(index: number): [title: string, author: string]{
    // let book = getAllBooks()[index];
    // return [book.title, book.author]
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author]
}

// getBookAuthorByIndex(3)

export function calcTotalPages(): void{
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];

    const answer = data.reduce( (acc: bigint, obj) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n)

    console.log(answer)
}
// calcTotalPages()

// console.log(getBookAuthorByIndex(2))

// console.log(getBookTitlesByCategory(0))

// console.log(getAllBooks())


// ============================================================ Lesson 2 export Functions

export function createCustomerID(name: string, id: number): string{
    return name+id;
}

const myID:string = createCustomerID('Ann',10)
// console.log(myID)


// let IdGenerator: (name: string, id: number) => string
let IdGenerator: typeof createCustomerID
IdGenerator = (name: string, id: number) => name+id;

IdGenerator = createCustomerID;

// console.log(IdGenerator('Julia', 20))



export function createCustomer(name: string, age?: number, city?: string): void{
    console.log(`Customer name:${name}`);
    if(age){
        console.log(`Customer name:${age}`)
    }
    if(city){
        console.log(`Customer name:${city}`)
    }
}

// createCustomer('Vladyslav')
// createCustomer('Yuliana', 20)
// createCustomer('Yuliana', 20, 'Kyiv')

// console.log(getBookTitlesByCategory(Category.CSS))
// logFirstAvailable()

export function getBookById(id: Book['id']): BookOrUndefined {
    // let answer = getAllBooks().find( (x) => x.id === id)
    // return answer
    let books = getAllBooks()
    return books.find( (x) => x.id === id)
}

// console.log(getBookById(1))

export function checkoutBooks(customer: string, ...booksIDs: number[]):string[]{
    console.log(customer)
    let answerArray = booksIDs.map( (num) => getBookById(num)).filter( ({available}) => available).map( ({title}) => title)
    return answerArray
}
// console.log(checkoutBooks('Vlad', 1,2,3,4))
// console.log(checkoutBooks('Vlad', ...[1,2,3,4]))

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles( id:number, available: boolean): string[];
export function getTitles(...args: [string | boolean] | [number, boolean]): string[]{
    const books = getAllBooks();

    if (args.length === 1){
        const [arg] = args;

        if (typeof arg === 'string'){
            return books.filter( (book) => book.author === arg).map( ({title}) => title)
        } else {
            return books.filter( (book) => book.available === arg).map( ({title}) => title)
        }
        
    } else if (args.length === 2){
        // return books.filter( (book) => book.id === args[0]).filter( (book) => book.available === args[1]).map( ({title}) => title)
        return books.filter( (book) => book.id === args[0] && book.available === args[1]).map( ({title}) => title)
    }
}

// console.log(getTitles(1, true))



// ==============================================           Assertion export Functions

export function assertStringValue(data: any): asserts data is string{
    if (typeof data !== 'string'){
        throw new Error('value should have been a string')
    }
}

// export function assertRefBookInstance(condition: any): asserts condition{
//     if (!condition){
//         throw new Error ('It is not an instance of RefBook')
//     }
// }



export function bookTitleTransform(title: any):string{
    assertStringValue(title)
    return [...title].reverse().join("")
}

// console.log(bookTitleTransform('julia'))
// console.log(bookTitleTransform(123))

export function printBook(book: Book): void{
    console.log(`${book.title} by ${book.author}`)
}


const myBook: Book = {
    id:5,
    title: 'Colors, Backgrounds and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    // year: 2015,
    // copies: 3
    pages: 200,
    // markDamaged: (reason: string) => console.log(`Damaged: ${reason}`)
    markDamaged(reason: string) {
        console.log(`Damaged: ${reason}`)
    }
}

// myBook.markDamaged('missing cover')

// console.log(myBook.markDamaged.name)

// printBook(myBook)

let logDamage: Logger;

export function damageLogger(input: string): void{
    console.log(`${input} works!`)
}

// logDamage = damageLogger

// logDamage('It')


let favoriteAuthor: Author = {
    name: 'Julia',
    email: 'example@gmail.com',
    numBooksPublished: 777
}

// let favoriteLibrarian: Librarian = {
//     name: 'Karl',
//     email: 'Karl@gmail.com',
//     department: 'TOP SECRET',
//     assistsCustomer(cust, book){
//         console.log(`${this.name} is helping ${cust} with book "${book}"`)
//     }
// }

// favoriteLibrarian.assistsCustomer('Julia', 'Eng')

const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};

// console.log(offer.magazine)
// console.log(offer.magazine?.getTitle())
// console.log(offer.book.getTitle?.())
// console.log(offer.book.authors?.[0])
// console.log(offer.book.authors?.[10]?.name)
export function getProperty(book: Book, property: BookProperties): any {
    let value = book[property]
    return typeof value === 'function' ? value.name : value;
}

//      ==============   Generic function
export function getObjectProperty <TObject, TKey extends keyof TObject>(object: TObject, property: TKey): TObject[TKey] | string{
    let value = object[property]
    return typeof value === 'function' ? value.name : value;
}

export function setDefaultConfig(options: TOptions){
    options.duration ??= 100;
    options.speed ??= 60;
    return options;
}

// console.log(getProperty(myBook, "title"))
// console.log(getProperty(myBook, "markDamaged"))
// console.log(getProperty(myBook, 'isbn'))



// let ref = new ReferenceItem(1, 'Julia wifi', 2020)

// console.log(ref)

// ref.printItem()
// ref.publisher = 'Vlslv'
// console.log(ref.publisher)
// console.log(ref.getID())

export function assertRefBookInstance(condition: any): asserts condition{
    if (!condition){
        throw new Error ('It is not an instance of RefBook')
    }
}


export function printRefBook(data:any):void {
    assertRefBookInstance(data instanceof RefBook)
    data.printItem()
}


export function purge<T>(inventory: Array<T>): T[]{
    return inventory.slice(2);
}

// =============================                Function with a callback
export function getBooksByCategory(category: Category, callback: Callback<string[]>){
// export function getBooksByCategory(category: Category, callback: LibMgrCallback){
    setTimeout( () => {
        try{
            let titles = getBookTitlesByCategory(category)

            if (titles.length > 0){
                callback(null, titles)
            } else {
                throw new Error('No books found')
            }
        } catch (error) {
            callback(error, null)
        }
    }, 2000)
}

// =======================          The callback
export function logCategorySearch<T>(err: Error | null, titles: T[] | null): void{
    if (err){
        console.log(err.message)
    } else {
        titles.forEach( tit => console.log(tit))
    }
}

// ======================               Promise function
export function getBooksByCategoryPromise(category:Category): Promise<string[]>{
    let promis: Promise<string[]> = new Promise((resolve, reject) => {
        setTimeout( () => {
            let titles = getBookTitlesByCategory(category)
    
            if (titles.length > 0){
                resolve(titles)
            } else {
                reject('No books found')
            }
        }, 2000)
    })
    return promis
}

//      ========================            Asynchronous function
export async function logSearchResults(category:Category): Promise<string[]>{
    let titles = await getBooksByCategoryPromise(category);

    //  if we have 2 and more async functions we can wait for then one by one (in case they depend on results of each other)
    // let titleNames = await getTitleNames(titles)
    // let titleNamesByAuthor = await titleNamesByAuthor(titleNames, author)

    console.log(titles.length)

    //  if we have 2 and more async functions which can be run at same time (don't depend on each other) we use:
    // await Promise.all(promis1, promis2, promis3...)


    return titles;
}