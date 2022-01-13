import { isEmpty } from "react-redux-firebase";

export default function filterAndSortDate(arr, params={}) {
  const {
    asc=false
    , sortBy="createdAt"
  } = params;

  return (
    arr
    .filter(arrElement => !isEmpty(arrElement)) // filter falsy out
    // REPLACED ">" & "<" with "-", to make it work on chrome
    .sort((a, b) => asc ? a[sortBy].seconds - b[sortBy].seconds : b[sortBy].seconds - a[sortBy].seconds )
  );
}