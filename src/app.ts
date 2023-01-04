import { Category } from "./enums";
import { Book, Logger, Person, Author, Librarian, TOptions, Magazine } from "./iterfaces";
import { ReferenceItem, UL, RefBook, Shelf } from "./classes";
import { BookOrUndefined, PersonBook, BookProperties, BookRequiredFields, UpdatedBook, CreateCustomerFunctionType } from "./types";
import { damageLogger, getAllBooks, printRefBook, purge, getObjectProperty, createCustomer, getBookTitlesByCategory, getBooksByCategory, logCategorySearch, getBooksByCategoryPromise, logSearchResults } from "./functions";
import { Library } from "./classes/library"

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}
//  =======================================================================


// let refBook: RefBook = new RefBook(1, 'Julia wifi', 2020, 2);

// refBook.printItem()

// console.log(refBook)

// refBook.printCitation()

// interface A {
//     a: number;
// }


// let favoriteLibrarian: Librarian /* & A */ = new UL.UniversityLibrarian()
// favoriteLibrarian.name = 'Julia'
// favoriteLibrarian.assistsCustomer('Vladyslav', 'How to be the best?')
// console.log(favoriteLibrarian.a) 


// const personBook: PersonBook = {
//     name: 'Julia',
//     email: 'julia@mail.com',
//     id: 77,
//     title: 'Julia`s secrets of happines',
//     author: 'Julia',
//     available: true,
//     category: Category.Angular
// } 

// const options = {};
// const options2 = setDefaultConfig(options)
// const options2 = {};

// console.log(options)
// console.log(options2)

// let logDamage = damageLogger
// logDamage('It')
// let logDamage2 = damageLogger

// printRefBook(refBook)
// printRefBook(favoriteLibrarian)

//          =======================  Dynamic import (depending on some flag)
// const flag = true;
// const flag = false;

// if (flag){
//     import('./classes')
//         .then(someObject => {
//            const reader = new someObject.Reader();
//            reader.name = 'Julia'
//            reader.take(getAllBooks()[0]);

//            console.log(reader);
//         })
//         .catch( (e) => console.log(e))
//         .finally( () => console.log('Finally done!'))
// }

// if (flag){
//     const someObject = await import('./classes')
//     const reader = new someObject.Reader();
//     reader.name = 'Julia'
//     reader.take(getAllBooks()[0]);

//     console.log(reader);
// }

// let library: Library = {
//     id: 1,
//     name: 'Julia',
//     address: 'Heaven'
// }

// console.log(library)

// let inventory: Book[] = [
//     {
//         id: 10, title: 'The C Programing Language', author: 'Julia', available: true, category: Category.Software
//     },
//     {
//         id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software
//     },
//     {
//         id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software
//     },
//     {
//         id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software
//     }
// ]

// let numbers = [1,2,3,4,5,6,7]
// const result = purge<Book>(inventory)
// const result = purge<number>(inventory)
// const result2 = purge<number>(numbers)
// const result2 = purge(numbers)
// console.log(result)
// console.log(result2)

// let bookShelf: Shelf<Book> = new Shelf<Book>()
// let bookShelf = new Shelf<Book>()

// inventory.forEach( (book) => bookShelf.add(book))
// console.log(bookShelf.getFirst().title)

// let magazines: Magazine[] = [
//     {
//     title: 'Programing Language Monthly', publisher: 'Code Mags'
//     },
//     {
//         title: 'Literary Fiction Quarterly', publisher: 'College Press'
//     },
//     {
//         title: 'Five Points', publisher: 'GSU'
//     }
// ]

// let magazineShelf: Shelf<Magazine> = new Shelf<Magazine>()

// magazines.forEach( magazine => magazineShelf.add(magazine))
// console.log(magazineShelf.getFirst())

// magazineShelf.printTitles()
// console.log(magazineShelf.find('Five Points'))

// console.log(getObjectProperty(magazines[0], 'publisher'));
// console.log(getObjectProperty(inventory[0], 'author'));
// console.log(getObjectProperty<Book, 'id'>(inventory[0], 'author'));
// console.log(getObjectProperty<Book, 'author'>(inventory[0], 'author'));
// console.log(getObjectProperty<Book, 'author' | 'title'>(inventory[0], 'title'));

// let bookRequiredFields: BookRequiredFields = {
//     id: 777,
//     title: 'Dream On',
//     author: 'Julia',
//     available: true,
//     category: Category.TypeScript,
//     pages: 777,
//     markDamaged: damageLogger
// }

// let updatedBook: UpdatedBook = {
//     title: 'MY ROAD TO FIRST MILLION DOLARS',
//     author: 'Vladyslav'
// }

// let params: Parameters<CreateCustomerFunctionType>;
// params = ['Vlad', 20, 'Kyiv']
// createCustomer(...params)



//  =============================       Decorated Class

// let favoriteLibrarian = new UL.UniversityLibrarian()
// favoriteLibrarian['a'] = 1
// UL.UniversityLibrarian['a'] = 2     // decorator "Sealed" will not let this happened
// UL.UniversityLibrarian.prototype['a'] = 3     // decorator "Sealed" will not let this happened

// let fLibrarian = new UL.UniversityLibrarian()

// console.log(fLibrarian)

// fLibrarian.name = 'Juliana'
// fLibrarian['printLibrarian']()


// let favoriteLibrarian = new UL.UniversityLibrarian()
// console.log(favoriteLibrarian)

// favoriteLibrarian.assistFaculty = null
// favoriteLibrarian.teachComunity = undefined


// let refBook: RefBook = new RefBook(1, 'Julia wifi', 2020, 2)
// refBook.printItem()


// let favoriteLibrarian = new UL.UniversityLibrarian()
// console.log(favoriteLibrarian)
// favoriteLibrarian.name = 'Vladyslav'
// favoriteLibrarian.assistsCustomer('Juliana', 'Best WiFi Tips')

// let favoriteLibrarian = new UL.UniversityLibrarian()
// favoriteLibrarian.name = 'Juliana'
// console.log(favoriteLibrarian.name)
// favoriteLibrarian.assistsCustomer('Vladyslav', 'Dream on!')
// console.log(favoriteLibrarian)

// let refBook: RefBook = new RefBook(1, 'Julia wifi', 2020, 2)
// refBook.copies = 3
// refBook.copies = 3.2
// console.log(refBook)


//   ============================               CAllback used for Async FUnctions
// console.log('Begin')
// getBooksByCategory(Category.JavaScript, logCategorySearch)
// getBooksByCategory(Category.Software, logCategorySearch)
// console.log('End')

//  =============================               Promise used for Async FUnctions
// console.log('Begin')
// getBooksByCategoryPromise(Category.JavaScript)
//     .then(titles => {
//         titles.forEach( tit => console.log(tit))
//         return titles.length})
//     .then(titlesLength => console.log(titlesLength))
//     .catch(reason => console.log(reason))
// getBooksByCategoryPromise(Category.Software)
//     .then(titles => titles.forEach( tit => console.log(tit)))
//     .catch(reason => console.log(reason));
// console.log('End')


// =============================            Async AWAIT function
// console.log('Begin')
// logSearchResults(Category.JavaScript)
// logSearchResults(Category.Software).catch( err => console.log(err))
// console.log('End')