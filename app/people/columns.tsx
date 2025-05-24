"use client";
import { ColumnDef  } from "@tanstack/react-table";
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
import {  useState } from "react";
import React from "react";
import { deleteCredential } from "@/prismadb";
import { useRouter } from "next/navigation";



// export function PeopleDataTable<TData extends { type: string }, TValue>({
//   tableColumns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   const router = useRouter();
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [open, setOpen] = useState(false);

//   const [filterType, setFilterType] = useState<string | null>(null);
//   const [filteredData, setFilteredData] = useState<TData[]>(data);


// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   type: z.string().min(1, {
//     message: "Please select a type.",
//   }),
//   appId: z.string().min(1, {
//     message: "App ID is required.",
//   }),
//   clientId: z.string().min(1, {
//     message: "Client ID is required.",
//   }),
//   secret: z.string().min(1, {
//     message: "Secret is required.",
//   }),
// });
//  const table = useReactTable({
//     data: filteredData,
//     columns: tableColumns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     onSortingChange: setSorting,
//     state: {
//       sorting,
//     },
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       type: "",
//       appId: "",
//       clientId: "",
//       secret: "",
//     },
//   });
//   const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
//     const res = await fetch("/api/credentials", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(values),
//     });

//     if (res.ok) {
//       const created = await res.json();

//       setOpen(false);
//       form.reset();
//       router.refresh();
//     } else {
//       alert("Failed to save credential");
//     }
//   }, []);

//   const handleDialogClose = useCallback(() => {
//     setOpen(false);
//     form.reset();
//   }, [form]);


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

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [openConfirm, setOpenConfirm] = useState(false);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();

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
                {/* <Form {...form}>
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
              </Form> */}

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
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">{person.name}</span>? This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4 ">
                <Button variant="outline" onClick={() => setOpenConfirm(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-500 hover:bg-red-200 ml-2 "
                 
                  onClick={() => {
                    deleteCredential(person.id);

                    setOpenConfirm(false);
                    router.refresh();
                  }}
                >
                  OK
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-8 h-8 p-0 ml-4 bg-blue-500  hover:bg-blue-700">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-40 rounded-xl border bg-white shadow-lg mt-2 p-0 mr-8 z-50"
              sideOffset={8}
            >
                
              <DropdownMenuLabel className="px-4 py-3 font-semibold border-b">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem className="px-4 py-2 text-base hover:bg-blue-100 focus:bg-blue-100 focus:outline-none transition-colors cursor-pointer">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenConfirm(true)}
                className="px-4 py-2 text-base hover:bg-red-100 focus:bg-red-100 focus:outline-none active:bg-red-100 transition-colors cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
]

