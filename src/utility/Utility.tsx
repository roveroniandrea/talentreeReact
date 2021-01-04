/** Class to interface with APIs */
export class Utility {
    private static formatOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric", hour12: false, minute: "numeric", hour: 'numeric' };

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

    /** Formats a date to a human readable string */
    static formatDate(date: Date) {
        return date.toLocaleDateString(undefined, this.formatOptions);
    }

    /** Returns the path to load the image */
    static getImagePath(fileName: string): string {
        return `${process.env.PUBLIC_URL}/assets/${fileName}`;
    }

    /** Returns the url to query the google maps api */
    static getMapsUrl(): string{
        return `https://www.google.com/maps/embed/v1/place?q=Via%20asiago%203%2C%20noale&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    }
}