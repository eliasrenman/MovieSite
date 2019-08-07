import axios from 'axios';
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

    public post(url: string) {
        return this.submit('post', url);
    }

    public delete(url: string) {

        return this.submit('delete', url);
        
    }

    public submit(requestType: string, url: string) {
        let token = document.querySelector('meta[name="csrf-token"]');
        let csrf: string | null = "";

        if(token != null)
            csrf = token.getAttribute('content');
        else
            csrf = "";
            
        axios.defaults.headers.common['CSRF-Token'] = csrf;
        
        return new Promise((resolve, reject) => {
            if(requestType == 'post'){
                axios.post(url, this.data)
                .then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data);
                    reject(error.response.data);
                });
            }
            if(requestType == 'get'){
                axios.get(url)
                .then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data);
                    reject(error.response.data);
                });
            }
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