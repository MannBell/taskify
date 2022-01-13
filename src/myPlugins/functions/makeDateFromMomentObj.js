import months from "../constants/monthsArray";

export default function makeDateFromMomentObj (momentObj) {
  return `${momentObj.date} ${months[momentObj.months]} ${momentObj.years}`;
}