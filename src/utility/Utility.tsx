/** Class to interface with APIs */
export class Utility {
    /** Returns the current school year, i.e. 2020 - 2021 */
    static getCurrentYears(): string {
        const curr = new Date();
        let year = curr.getFullYear();
        // Ad agosto cambio
        if (curr.getMonth() <= 7) {
            year--;
        }
        return `${year} - ${year + 1}`;
    }
}