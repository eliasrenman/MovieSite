import ajax from './ajax';
import Errors from './error';

/**
 * This class contains the data and errors generated from sending a post request.
 */
export class Form {
    errors: Errors;
    data: any;
    /**
     * Constructor for creating a form object.
     *
     *
     * @param data contains a object array with the data fields
     */
    constructor(data: string) {
        this.errors = new Errors();
        this.data = JSON.parse(data);
    }

    /**
     * Resets the data in the form.
     */
    public reset() {
        this.data = {};
    }

    /**
     * This submits a axios post reqeust for this form class.
     *
     * @param url url endpoint for submitting axios post.
     */
    public submit(url: string) {
        ajax.post(url, this.data)
            .then(response => {
                this.onSuccess(response);
            })
            .catch(error => {
                this.onFail(error.response);
            });
    }
    /**
     * This resets the form when a successfull ajax request is sent.
     * @param response unused
     */
    public onSuccess(response: any) {
        this.reset();
    }

    /**
     * This adds the recived errors from the endpoint and adds them to the errors list.
     *
     * @param error new errors
     */
    public onFail(error: any) {
        this.errors.record(error.response.data.errors);
    }

    /**
     * This clears the value of a specified field in the data object.
     * 
     * @param field specified field in the data object.
     */
    public clear(field: string) {
        this.errors.clear(field);
    }
}
