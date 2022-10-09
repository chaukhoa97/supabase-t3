import s from './Homeworks.module.css'

export default function Homework({
  id,
  title,
  description,
  rating,
  onDelete,
}: {
  id: number
  title: string
  description: string
  rating: number
  onDelete: (id: number) => void
}) {
  return (
    <div className={s.card}>
      <h3>Title: {title}</h3>
      <p>ID: {id}</p>
      <p>Description: {description}</p>
      <p>Rating: {rating}</p>
      <button type="button" className="btn" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  )
}
