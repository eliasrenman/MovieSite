import ajax from './ajax';
import Errors from './error';

export class Form {

    errors: Errors;
    data: any;

    constructor(data: string) {
        this.errors = new Errors();
        this.data = JSON.parse(data);
    }

    public reset() {
        this.data = {};
    }
    public submit(url: string) {
        ajax.post(url, this.data)
            .then(response => {
                this.onSuccess(response);
            })
            .catch(error => {
                this.onFail(error.response);
            });
    }

    public onSuccess(response: any) {
        this.reset();
    }

    public onFail(error: any) {
        this.errors.record(error.response.data.errors)
    }

    public clear(field: string) {
        this.errors.clear(field);
    }
}