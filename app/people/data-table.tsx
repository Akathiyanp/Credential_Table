"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FaPlus, FaFilter } from "react-icons/fa";

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="ml-8 mr-8 mb-8 font-sans ">
      <div className="mt-8 text-2xl ">
        <h1>Credential Table</h1>
      </div>
      <div className="flex justify-end ">
        <Button className="  px-6 py-2 rounded-lg shadow-md mb-3 hover:bg-red-500 mt-3 mr-4">
          <FaFilter /> Filter
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="  px-6 py-2 rounded-lg shadow-md mb-3 hover:bg-red-500 mt-3 mr-4">
              {" "}
              <FaPlus />
              Create
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create profile</DialogTitle>
              <DialogDescription>
                Create profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue=""
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <select
                  id="type"
                  name="type"
                  className="col-span-3 border rounded px-2 py-1"
                >
                  
                  <option value="AWS">AWS</option>
                  <option value="S3">S3</option>
                  <option value="Azure">Azure</option>
                  <option value="Google">Google</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="appID" className="text-right">
                  App ID
                </Label>
                <Input
                  id="appID"
                  name="appID"
                  defaultValue=""
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="clientID" className="text-right">
                  Client ID
                </Label>
                <Input
                  id="clientID"
                  name="clientID"
                  defaultValue=""
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="secret" className="text-right">
                  Secret
                </Label>
                <Input
                  id="secret"
                  name="secret"
                  defaultValue=""
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button  type="submit">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default PeopleDataTable;
