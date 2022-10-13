import { supabase } from '../utils/supabaseClient'
import { useQuery } from '@tanstack/react-query'

const SupabaseCRUD = () => {
  const fetchHomeworks = async () =>
    supabase
      .from('homeworks')
      .select()
      // .in('id', [2, 3, 4, 5])
      .order('created_at', { ascending: false })
  const { data, status } = useQuery(['homeworks'], fetchHomeworks)

  const handleAddHomework = async () => {
    const { data, error } = await supabase.from('homeworks').insert([
      {
        // `id` & `created_at` are generated automatically
        title: 'New homework',
        description: 'New homework description',
        rating: 7,
      },
    ])
    if (error) {
      console.log('error', error)
    } else {
      console.log('data', data)
    }
  }

  const handleUpdateHomework = async () => {
    const { data, error } = await supabase
      .from('homeworks')
      .update({ title: 'Updated homework' })
      .eq('id', 3)
      .select() // Update a record and return the updated record
    if (error) {
      console.log('error', error)
    } else {
      console.log('data', data)
    }
  }

  const handleDeleteHomework = async () => {
    const { data, error } = await supabase
      .from('homeworks')
      .delete()
      .eq('id', 2)
      .select()
    if (error) {
      console.log('error', error)
    } else {
      console.log('data', data)
    }
  }

  return status === 'loading' ? (
    <div>Loading...</div>
  ) : (
    <>
      <button className="btn" onClick={handleAddHomework}>
        Add
      </button>
      <button className="btn" onClick={handleUpdateHomework}>
        Update
      </button>
      <button className="btn" onClick={handleDeleteHomework}>
        Delete
      </button>
      <pre>{JSON.stringify(data!.data, null, 2)}</pre>
    </>
  )
}

export default SupabaseCRUD
