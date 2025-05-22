"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Person } from "@/people"

const handleView = (person: Person) => {
    alert(`Viewing details for ${person.name}`);
};
// const handleDot = (person:Person) => {
//     alert(`Edit or Delete ${person.type}`)
// }

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
         cell: ({ row }) => (
            <div>

                <button
                    onClick={() => handleView(row.original)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    View
                </button>

                {/* <button onClick={() => handleDot(row.orginal)} 
                    className=" ml-4 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        . . .
 
                </button> */}
                
            </div>
        
    ),
    },
    
]