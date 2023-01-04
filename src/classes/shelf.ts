
//      ======================  Generic Class!

import { ShelfItem } from "../iterfaces";

export default class Shelf <T extends ShelfItem>{
    private items : T[] = [];

    add(item: T) : void{
        this.items.push(item)
    }

    getFirst(): T{
        return this.items[0]
    }

    find(title: string): T{
        // return this.items.filter( item => item.title === title)[0]
        return this.items.find( item => item.title === title)
    }

    printTitles(): void{
        this.items.forEach( item => console.log(item.title))
    }

}

// import { Book, Magazine } from "../iterfaces";

// class Shelf2 {
//     private items : Book[] | Magazine[] = [];

//     add(item: Magazine) : void{
//         this.items.push(item)
//     }

//     getFirst(): T{
//         return this.items[0]
//     }
// }