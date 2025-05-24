import React from 'react'
import PeopleDataTable from './data-table'
import { columns } from './columns'
import { getCredentialTables } from '@/prismadb'


const People = async () => {
  const person = await getCredentialTables()
  console.log(person)

  return (
    <PeopleDataTable 
      columns={columns}
      data={person}
    />
  )
}

export default People