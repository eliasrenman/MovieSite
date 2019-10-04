import axios from 'axios';

/**
 * For sending Ajax requests with Axios.
 */
export default class Ajax {
    /**
     * This will send a axios post request.
     *
     * @param url url endpoint
     * @param data payload data.
     */
    public static post(url: string, data: any) {
        let token = document.querySelector('meta[name="csrf-token"]');
        let csrf: string | null = '';
        if (token != null) csrf = token.getAttribute('content');
        else csrf = '';
        axios.defaults.headers.common['CSRF-Token'] = csrf;

        return new Promise((resolve, reject) => {
            axios
                .post(url, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    }
}
