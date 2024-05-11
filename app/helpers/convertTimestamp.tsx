export function convertTimestampToTime(timestamp: number) {
    // Create a new Date object with the timestamp (in milliseconds)
    const date = new Date(timestamp * 1000);

    // Get the hours, minutes from the Date object
    let hours = date.getHours();
    const minutes = "0" + date.getMinutes();

    // Determine AM or PM
    const meridiem = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Format the time as HH:MM AM/PM
    const formattedTime = hours + ':' + minutes.substr(-2) + ' ' + meridiem;

    return formattedTime;
}