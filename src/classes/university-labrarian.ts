/* eslint-disable no-underscore-dangle */
import { format, logger, logMethod, logParametr, sealed, writable } from '../decorators';
import * as Interfaces from './../iterfaces'

// @sealed('UniversityLibrarian')
// @logger
class UniversityLibrarian implements Interfaces.Librarian {
    @format('VLad')
    name: string;
    email: string;
    department: string;

    @logMethod
    assistsCustomer(@logParametr custName: string, @logParametr bookTitle: string):void {
        console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`)
    };

    // @writable(true)
    // static assistFaculty(): void{
    assistFaculty(): void{
        console.log('Assisting faculty')
    }

    // @writable(false)
    teachComunity(): void{
        console.log('Teaching community')
    }

}
export {UniversityLibrarian}