import moment from "moment";

const formatTime = (date: string) => {
    const now = moment();
    const blogDate = moment(date);

    const duration = moment.duration(now.diff(blogDate));
    const hours = duration.asHours();
    const days = duration.asDays();

    if (hours < 24) {
      if (hours < 1) {
        return `${Math.floor(duration.asMinutes())}m ago`;
      }
      return `${Math.floor(hours)}h ago`;
    }

    return blogDate.format('MMM D, YYYY'); // Show the date if it's older than 24 hours
  };

  export {formatTime}