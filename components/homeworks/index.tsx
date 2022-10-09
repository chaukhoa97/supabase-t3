import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Homework from './Homework'
import s from './Homeworks.module.css'

const Homeworks = () => {
  const queryClient = useQueryClient()

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
  const { data, status } = useQuery(['homeworks'], fetchHomeworks)

  const handleChange = (e: any) => {
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
      console.log('data', data)
    }
    queryClient.invalidateQueries(['homeworks'])
  }

  return status === 'loading' ? (
    <div>Loading...</div>
  ) : (
    <form onSubmit={handleAddHomework}>
      <label htmlFor="title">Title</label>
      <input
        name="title"
        id="title"
        onChange={handleChange}
        value={formValues.title}
      />
      <label htmlFor="description">Description</label>
      <input
        name="description"
        id="description"
        onChange={handleChange}
        value={formValues.description}
      />
      <label htmlFor="rating">Rating</label>
      <input
        name="rating"
        id="rating"
        type="number"
        onChange={handleChange}
        value={formValues.rating}
      />
      <button className="btn">Add</button>
      <div className={s.homeworks}>
        {data!.data!.map((homework: any) => (
          <Homework
            key={homework.id}
            id={homework.id}
            title={homework.title}
            description={homework.description}
            rating={homework.rating}
          />
        ))}
      </div>
    </form>
  )
}

export default Homeworks
