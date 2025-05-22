"use client"   
import { ColumnDef } from "@tanstack/react-table"
import { Person } from "@/people"


const handleView = (person: Person)=> {
    alert(` Username is: ${person.name}`)
}
 

export const columns: ColumnDef<Person>[] =[
    {
        header: "ID",
        accessorKey:"id",
    },

    {
        header: "Name",
        accessorKey:"name"
    }
    ,
    {
        header: "Type",
        accessorKey: "type"
    },
    {
        header: "App ID",
        accessorKey: "app_ID"
    },
    {
        header: "Client ID",
        accessorKey: "client_ID"
    },
    {
        header: "Secret",
        accessorKey: "secret"
    },
    {
        header: 'Action',
        accessorKey:'action',
   cell: ({ row }) => {
            const person = row.original as Person;
            return (
                <div>
                    <button
                        onClick={() => handleView(person)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        View
                    </button>
                    <button
                        className="px-3 ml-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        . . .
                    </button>
                </div>
            );
        },
    },
    
]