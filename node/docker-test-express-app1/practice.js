class MyClass {
    constructor() {
        console.log('constructor called');
        this.instance = null;
    }
    static getInstance() {
        if(this.instance==null) {
            this.instance = new MyClass();
        }
        return this.instance;
    }
    displayPublicAlert() {
        console.log('public allert function called')
        this.#displayPrivateAlert();
    }
    #displayPrivateAlert() {
        console.log('private alert function called');
    }
}
const obj = MyClass.getInstance();
obj.displayPublicAlert();
const obj1 = MyClass.getInstance();
obj1.displayPublicAlert();