export const parseTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    seconds = Math.floor(seconds - hours * 3600 - minutes * 60);
    return (
        (hours > 0 ? hours + "h " : "") +
        (minutes > 0 ? minutes + "m " : "") +
        seconds +
        "s"
    );
};
