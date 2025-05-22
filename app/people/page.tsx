"use client"
import React from 'react'
import PeopleDataTable from './data-table'
import { columns } from './columns'
import { people } from '@/people'



const People = () => {
  return (
    <PeopleDataTable columns={columns}
    data={people}></PeopleDataTable>
  )
}

export default People

