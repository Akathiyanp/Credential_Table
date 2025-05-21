import { ColumnDef } from "@tanstack/react-table"
import { Person } from "@/people"
export const columns: ColumnDef<Person>[] =[
    {
        header: "ID",
        accessorKey:"id"
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
    }
]