"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Person } from "@/people";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import React from "react";
import { deleteCredential } from "@/prismadb";
import { useRouter } from "next/navigation";


// const handleView = (person: Person) => {};

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
    accessorKey: "appId",
  },
  {
    header: "Client ID",
    accessorKey: "clientId",
  },
  {
    header: "Secret",
    accessorKey: "secret",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => {
      const person = row.original as Person;
     
       const  [openConfirm, setOpenConfirm] = useState(false)
      
     
    
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const router = useRouter()

      return (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                // onClick={() => handleView(personName)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {" "}
                View
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Displaying the content</DialogTitle>
                <DialogDescription>
                  Details of the selected person.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex justify-center">
                <div className="bg-gray-50 rounded-lg shadow p-6 w-full max-w-md">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-3 flex justify-between">
                      <dt className="font-semibold text-gray-700">Name</dt>
                      <dd className="text-gray-900">{person.name}</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="font-semibold text-gray-700">Type</dt>
                      <dd className="text-gray-900">{person.type}</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="font-semibold text-gray-700">App ID</dt>
                      <dd className="text-gray-900">{person.appId}</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="font-semibold text-gray-700">Client ID</dt>
                      <dd className="text-gray-900">{person.clientId}</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="font-semibold text-gray-700">Secret</dt>
                      <dd className="text-gray-900">{person.secret}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </DialogContent>
          </Dialog>

         <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-semibold">{person.name}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpenConfirm(false)} >
              Cancel
            </Button>
            <Button variant="destructive"  onClick={() =>{
              deleteCredential(person.id)
              
               setOpenConfirm(false)
              router.refresh()}
            }
              >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-8 h-8 p-0 ml-4 bg-red-400  hover:bg-red-600">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="font-semibold">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={()=> setOpenConfirm(true)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
         
        </div>
      );
    },
  },
];
