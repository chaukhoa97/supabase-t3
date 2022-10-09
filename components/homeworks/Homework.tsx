import { supabase } from '../../utils/supabaseClient'
import { useQueryClient } from '@tanstack/react-query'

import s from './Homeworks.module.css'

export default function Homework({
  id,
  title,
  description,
  rating,
}: {
  id: number
  title: string
  description: string
  rating: number
}) {
  const queryClient = useQueryClient()

  const handleDeleteHomework = async () => {
    const { error } = await supabase.from('homeworks').delete().eq('id', id)
    if (error) {
      console.log('error', error)
    }
    queryClient.invalidateQueries(['homeworks'])
  }

  return (
    <div className={s.card}>
      <h3>Title: {title}</h3>
      <p>ID: {id}</p>
      <p>Description: {description}</p>
      <p>Rating: {rating}</p>
      <button type="button" className="btn" onClick={handleDeleteHomework}>
        Delete
      </button>
    </div>
  )
}
