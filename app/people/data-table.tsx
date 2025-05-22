"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FaPlus,FaFilter } from "react-icons/fa";

import {
  
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PeopleDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
  <div className="ml-8 mr-8 mb-8 font-sans">
    <div className="mt-8 text-2xl " >
      <h1>Credential Table</h1>
    </div>
    <div className="flex justify-end ">
          <Button  className="  px-6 py-2 rounded-lg shadow-md mb-3 hover:bg-red-500 mt-3 mr-4"><FaFilter/> Filter</Button>
         <Button   className=" px-6 py-2  rounded-lg shadow-md hover:bg-blue-500 mb-3 mt-3 " ><FaPlus/>Create</Button>
    </div>
   
         <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHeader>

        <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row =>(
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell, cell.getContext()
                                )}

                            </TableCell>
                        ))}
                    </TableRow>
                ))
            ):(
                <TableRow>
                        <TableCell>
                            No results
                        </TableCell>
                    </TableRow>
            ) }
        </TableBody>
      </Table>
    </div>

  </div>
   
  );
}

export default PeopleDataTable;
