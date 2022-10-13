import s from './Homeworks.module.css'

export default function Homework({
  id,
  title,
  description,
  rating,
  createdAt,
  onDelete,
}: {
  id: number
  title: string
  description: string
  rating: number
  createdAt: string
  onDelete: (id: number) => void
}) {
  return (
    <div className={s.card}>
      <h3>Title: {title}</h3>
      <p>ID: {id}</p>
      <p>Description: {description}</p>
      <p>Rating: {rating}</p>
      <p>Created at: {new Date(createdAt).toLocaleString()}</p>
      <button type="button" className="btn" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  )
}
