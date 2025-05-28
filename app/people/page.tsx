
import React from 'react'

import PeopleDataTable from './data-table'
import { columns } from './columns';
import { getCredentialTables } from '@/prismadb'
import DataTable from '@/data-table';




const People = async () => {
  const person = await getCredentialTables()
  console.log(person)

  return (

    
    //  <DataTable
    //   columns={columns}
    //   data={person}
    // />
    
             <PeopleDataTable 
      columns={columns}
      data={person}
    />
 
 
  )
}

export default People