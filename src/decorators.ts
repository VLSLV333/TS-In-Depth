//  ======================    Class decorator
export function sealed(param: string) {
    return function(constructor: Function): void{
        console.log(`Sealing the constructor ${param}`)
        console.log(constructor);

        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }
}

//  ======================    Class decorator
export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
    let newConstructor: Function = function(){
        console.log('Creating new instance');
        console.log(constructor);
        this.age = 30;
    }

    newConstructor.prototype = Object.create(constructor.prototype)

    newConstructor.prototype.printLibrarian = function(): void {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`)
    }

    return newConstructor as TFunction;
}

//  ==========================    Method decorator
export function writable(isWritable: boolean){
    return function(target: Object|Function, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor{
        console.log(target);
        console.log(methodName);
        console.log(descriptor);

        descriptor.writable = isWritable;
        return descriptor;
    }
}

//  ==========================    Method decorator
export function timeout(ms: number) {
    return function (target: Object|Function, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor{
        let originalMethod = descriptor.value

        descriptor.value = function(...args: unknown[]) {
            if (window.confirm('Are you sure?')){
                setTimeout( () => {
                    originalMethod.apply(this, args)
                }, ms)
            }
        };

        return descriptor;
    }
}

//  ==========================    Parametr decorator
export function logParametr(target: Object|Function, methodName: string, index: number){
    const key = `${methodName}_decor_params_indexes`;
    const proto = typeof target === 'function' ? target.prototype : target;

    (proto[key] ??= []).push(index);

}

//  ==========================    Parametr decorator
export function logMethod(target: Object|Function, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor{
    let originalMethod = descriptor.value
    
    descriptor.value = function(...args: any[]) {
        const key = `${methodName}_decor_params_indexes`;
        const proto = typeof target === 'function' ? target.prototype : target;
        const indexes = proto[key];

        if (Array.isArray(indexes)) {
            args.forEach( (arg, index) => {
                if (indexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            })
        }
        return originalMethod.apply(this, args)
    };
    return descriptor;
}

//  ==========================    Property decorator
function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer?: (value: any) => T,
    setTransformer?: (value: any) => T
){
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value))
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}

//  ==========================    Property decorator
export function format(pref: string = 'Mr./Mrs.') {
    return function (target: Object|Function, propName: string) {
        makeProperty(target, propName, value => `${pref} ${value}`, value => value)
    }
}

//  ==========================    Geter|Seter  'Accessor' decorator
export function positiveInteger(target: Object|Function, propName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalSet = descriptor.set

    descriptor.set = function(value: number){
        if(value < 1 || !Number.isInteger(value)){
            throw new Error('invalid value');
        }
        if (originalSet) {
            originalSet.call(this, value);
        };
    };
    return descriptor
}