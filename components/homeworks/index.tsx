import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Homework from './Homework'
import s from './Homeworks.module.css'

const Homeworks = () => {
  const [homeworks, setHomeworks] = useState<any>([])

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    rating: 5,
  })

  const fetchHomeworks = async () =>
    supabase
      .from('homeworks')
      .select()
      .order('created_at', { ascending: false })
  const { data, status } = useQuery(['homeworks'], fetchHomeworks, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    setHomeworks((data?.data || []) as any)
  }, [data])

  const handleFormChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddHomework = async (e: any) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('homeworks')
      .insert(formValues)
      .select()
    if (error) {
      throw error
    } else {
      setHomeworks((prev: typeof homeworks) => [{ ...data[0] }, ...prev])
    }
  }

  const handleDeleteHomework = async (id: number) => {
    const { error } = await supabase.from('homeworks').delete().eq('id', id)
    if (error) {
      console.log('error', error)
    } else {
      setHomeworks((prev: typeof homeworks) =>
        prev.filter((h: typeof homeworks) => h.id !== id),
      )
    }
  }

  return status === 'loading' ? (
    <div>Loading...</div>
  ) : (
    <form onSubmit={handleAddHomework}>
      <label htmlFor="title">Title</label>
      <input
        name="title"
        id="title"
        onChange={handleFormChange}
        value={formValues.title}
      />
      <label htmlFor="description">Description</label>
      <input
        name="description"
        id="description"
        onChange={handleFormChange}
        value={formValues.description}
      />
      <label htmlFor="rating">Rating</label>
      <input
        name="rating"
        id="rating"
        type="number"
        onChange={handleFormChange}
        value={formValues.rating}
      />
      <button className="btn">Add</button>
      <div className={s.homeworks}>
        {homeworks.map((homework: any) => (
          <Homework
            key={homework.id}
            id={homework.id}
            title={homework.title}
            description={homework.description}
            rating={homework.rating}
            createdAt={homework.created_at}
            onDelete={handleDeleteHomework}
          />
        ))}
      </div>
    </form>
  )
}

export default Homeworks
