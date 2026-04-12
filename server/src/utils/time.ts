export const convertSec2DayHourMin = (sec: number) => {
    var day = sec / (24 * 3600);

    sec = sec % (24 * 3600);
    var hour = sec / 3600;

    sec %= 3600;
    var minutes = sec / 60;

    sec %= 60;
    var seconds = sec;

    return (
        Math.floor(day) +
        " " +
        "days " +
        Math.floor(hour) +
        " " +
        "hours " +
        Math.floor(parseFloat(minutes.toFixed()))+
        " " +
        "minutes " +
        Math.floor(parseFloat(seconds.toFixed()))+
        " " +
        "seconds "
    );
};
