"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Person } from "@/people";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

const handleView = (person: Person) => {
  alert(` Username is: ${person.name}`);
};

export const columns: ColumnDef<Person>[] = [


  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "App ID",
    accessorKey: "app_ID",
  },
  {
    header: "Client ID",
    accessorKey: "client_ID",
  },
  {
    header: "Secret",
    accessorKey: "secret",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => {
      const personName = row.original as Person;

      return (
        <div>
          <Button
            onClick={() => handleView(personName)}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            View
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-8 h-8 p-0 ml-4 bg-red-400  hover:bg-red-600">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger >
            <DropdownMenuContent >
              <DropdownMenuLabel className="font-semibold">Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button
                        className="px-3 ml-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        . . .
                    </Button> */}
        </div>
      );
    },
  },
];
