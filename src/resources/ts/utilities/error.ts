
export default class Errors {
    public err: any;

    public constructor(){
        this.err = {};
    }

    public has(field: string) : boolean {
        return this.err.hasOwnProperty(field);
    }

    public any() {
        return Object.keys(this.err).length > 0;
    }

    public get(field: string){
        if (this.has(field)) {
            return this.err[field][0];
        }
    }
    
    public record(errors: string) : void{
        this.err = JSON.parse(errors);
    }

    public clear(field: string): void{
        if(this.has(field))
            delete this.err[field];
    }
}