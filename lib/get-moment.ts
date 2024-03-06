import moment from "moment";

export default function getMoment(timeString: string) {
  const m = moment(timeString).fromNow();
  return m;
}
