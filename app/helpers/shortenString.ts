export function shortenString(str: string) {

    if (str.length <= 10) {

        return str;

    } else {

        return str.substring(0, 20) + "...";
        
    }
}

