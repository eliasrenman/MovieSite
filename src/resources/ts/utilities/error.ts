/**
 * Contains Errors for used by the Form class.
 */
export default class Errors {
    public err: any;

    /**
     * creates a empty list of errors.
     */
    public constructor() {
        this.err = {};
    }

    /**
     * This returns if a specified field has errors.
     * @param field the specified field
     * @returns a object array of properties that a field contains.
     */
    public has(field: string): boolean {
        return this.err.hasOwnProperty(field);
    }

    /**
     * This returns true if errors exist else false.
     * @returns true if errors exist else false.
     */
    public any() {
        return Object.keys(this.err).length > 0;
    }

    /**
     * Gets the error for a specified field.
     * @param field
     * @returns {string} with the description of a error.
     */
    public get(field: string) {
        if (this.has(field)) {
            return this.err[field][0];
        }
    }

    /**
     * Adds a new error to the list of errors.
     * 
     * @param errors a new error.
     */
    public record(errors: string): void {
        this.err = JSON.parse(errors);
    }

    /**
     * This removes errors from the specified field.
     *
     * @param field field to remove error from.
     */
    public clear(field: string): void {
        if (this.has(field)) delete this.err[field];
    }
}
