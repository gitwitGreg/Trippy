export function parseDate(dateString: string){
    
    const months : { [key: string]: number }  = {
        'jan': 0,'feb': 1,'mar': 2,'apr': 3,
        'may': 4,'jun': 5,'jul': 6,'aug': 7,
        'sep': 8,'oct': 9,'nov': 10,'dec': 11
    }

    const [monthStr, dayStr, yearStr] = dateString.toLowerCase().split(' ');

    const month = months[monthStr.slice(0,3)];

    const day = parseInt(dayStr);

    const year = parseInt(yearStr);

    if (month === undefined) {

        console.log('Invalid month');

        return 0;
    }

    const date = new Date(year, month, day);

    if(isNaN(date.getTime())){

        console.log('something went wrong convereting date');

        return 0
    }

    return date;
}