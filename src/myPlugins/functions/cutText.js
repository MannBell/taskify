export default function cutText({ text, length=45 }) {
  return text.length > length ? `${text.slice(0, length)}...` : text
}