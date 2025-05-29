"use client";
import { useCallback, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useActionCellStore } from "./columns";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.string().min(1, { message: "Please select a type." }),
  appId: z.string().min(1, { message: "App ID is required." }),
  clientId: z.string().min(1, { message: "Client ID is required." }),
  secret: z.string().min(1, { message: "Secret is required." }),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ModalStore<TData> {
  isOpen: boolean;
  sorting: SortingState;
  filterType: string | null;
  filteredData: TData[];
  onOpen: () => void;
  onClose: () => void;
  setSorting: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  setFilterType: (filterType: string | null) => void;
  setFilteredData: (filteredData: TData[]) => void;
}

export const createModalStore = <TData extends { type: string }>() =>
  create<{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    sorting: SortingState;
    setSorting: (
      updater: SortingState | ((prev: SortingState) => SortingState)
    ) => void;
    filterType: string | null;
    setFilterType: (type: string | null) => void;
    filteredData: TData[];
    setFilteredData: (data: TData[]) => void;
  }>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    sorting: [],
    setSorting: (updater) =>
      set((state) => ({
        sorting:
          typeof updater === "function" ? updater(state.sorting) : updater,
      })),
    filterType: null,
    setFilterType: (type) => set({ filterType: type }),
    filteredData: [],
    setFilteredData: (data) => set({ filteredData: data }),
  }));

export const useModalStore = createModalStore<{
  type: string;
  name: string;
  appId: string;
  clientId: string;
  secret: string;
}>();

interface DataTableProps<
  TData extends {
    type: string;
    name: string;
    appId: string;
    clientId: string;
    secret: string;
  }
> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
}

export function PeopleDataTable<
  TData extends {
    id: string;
    name: string;
    type: string;
    appId: string;
    clientId: string;
    secret: string;
  }
>({ columns, data }: DataTableProps<TData>) {
  const router = useRouter();

  const sorting = useModalStore((state) => state.sorting);
  const setSorting = useModalStore((state) => state.setSorting);
  const filterType = useModalStore((state) => state.filterType);
  const setFilterType = useModalStore((state) => state.setFilterType);
  const filteredData = useModalStore((state) => state.filteredData);
  const setFilteredData = useModalStore((state) => state.setFilteredData);
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);
  const onClose = useModalStore((state) => state.onClose);

  const editingId = useActionCellStore((state) => state.editingId);
  const openEdit = useActionCellStore((state) => state.openEdit);
  const deletingId = useActionCellStore((state) => state.deletingId);
  const openConfirm = useActionCellStore((state) => state.openConfirm);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      appId: "",
      clientId: "",
      secret: "",
    },
  });
  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const res = await fetch("/api/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        onClose();
        form.reset();
        router.refresh();
      } else {
        alert("Failed to save credential");
      }
    },
    [form, onClose, router]
  );

  const handleDialogClose = useCallback(() => {
    onClose();
    form.reset();
  }, [form, onClose]);

  useEffect(() => {
    if (!filterType) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(
          (row) => row.type.toLowerCase() === filterType.toLowerCase()
        )
      );
    }
  }, [data, filterType, setFilteredData]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="ml-8 mr-8 mb-3 font-sans">
        <div className="mt-8 text-2xl">
          <h1>Credential Table</h1>
        </div>
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="px-6 py-2 rounded-lg shadow-md mb-3 hover:bg-green-600 mt-3 mr-4">
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-36 rounded-md border bg-white shadow-lg mt-2 px-2 z-50 mr-12"
              sideOffset={8}
            >
              <DropdownMenuLabel className="px-4 py-2 font-semibold border-b">
                Actions
              </DropdownMenuLabel>

              <DropdownMenuItem
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none active:bg-gray-100 transition-colors"
                onClick={() => setFilterType("aws")}
              >
                AWS
              </DropdownMenuItem>
              <DropdownMenuItem
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none active:bg-gray-100 transition-colors"
                onClick={() => setFilterType("azure")}
              >
                Azure
              </DropdownMenuItem>
              <DropdownMenuItem
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none active:bg-gray-100 transition-colors"
                onClick={() => setFilterType("google")}
              >
                Google
              </DropdownMenuItem>
              <DropdownMenuItem
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none active:bg-gray-100 transition-colors"
                onClick={() => setFilterType("s3")}
              >
                S3
              </DropdownMenuItem>
              <DropdownMenuItem
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none active:bg-gray-100 transition-colors text-red-500"
                onClick={() => setFilterType(null)}
              >
                Clear Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isOpen} onOpenChange={onOpen}>
            <DialogTrigger asChild>
              <Button className="px-6 py-2 rounded-lg shadow-md mb-3 hover:bg-green-600 mt-3 mr-4">
                Create
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Credential</DialogTitle>
                <DialogDescription>
                  Create a new credential profile here. Click save when you are
                  done.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter credential name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-64">
                              <SelectValue placeholder="Choose credential type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              <SelectItem value="aws">AWS</SelectItem>
                              <SelectItem value="azure">Azure</SelectItem>
                              <SelectItem value="google">Google</SelectItem>
                              <SelectItem value="s3">S3</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="appId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>App ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter App ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Client ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="secret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter secret"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDialogClose}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Credential</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const person = row.original as TData;
                  const isActive =
                    (openEdit && editingId === person.id) ||
                    (openConfirm && deletingId === person.id);
                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        if (cell.column.id === "name") {
                          let displayName = person.name;

                          return (
                            <TableCell key={cell.id}>{displayName}</TableCell>
                          );
                        }
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-start space-x-2 py-4 pl-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          className="ml-2"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default PeopleDataTable;

//Update DataTable component to use the new modal system.




// "use client";
// import { 
//   ColumnDef, 
//   flexRender, 
//   getCoreRowModel, 
//   useReactTable 
// } from "@tanstack/react-table";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { useModalStore } from "@/hooks/useModalStore";
// import BaseModal from "@/components/ui/modals/BaseModal";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

// export function PeopleDataTable<TData, TValue>({
//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   const { onOpen } = useModalStore();

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <>
//       <div className="ml-8 mr-8 mb-3 font-sans">
//         <div className="mt-8 text-2xl">
//           <h1>Credential Table</h1>
//         </div>
//         <div className="flex justify-end">
//           <Button onClick={() => onOpen("createCredential")} className="mr-4">
//             Create
//           </Button>
//         </div>
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <TableHead key={header.id}>
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow key={row.id}>
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} className="text-center">
//                     No results
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//       <BaseModal />
//     </>
//   );
// }