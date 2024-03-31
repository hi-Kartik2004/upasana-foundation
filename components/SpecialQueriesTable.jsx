"use client";

// Import necessary components and functions
import React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/firebase/config";
import {
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

// Define function to convert timestamp to IST date
const convertToISTDate = (timestamp) => {
  const dateObj = new Date(timestamp);
  // Set input date object to UTC time zone
  dateObj.setUTCHours(0, 0, 0, 0);
  const ISTOffset = 330; // Offset in minutes for IST
  const ISTTimestamp = dateObj.getTime() + ISTOffset * 60 * 1000;
  const ISTDate = new Date(ISTTimestamp);
  return ISTDate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
};

// Define columns for the table

// Define the PoojaRegistrationsTable component
export function PoojaRegistrationsTable() {
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = [
    {
      accessorKey: "registeredEmail",
      header: "Email",
    },
    {
      accessorKey: "registeredName",
      header: "Name",
    },
    {
      accessorKey: "registeredPhone",
      header: "Phone",
    },
    {
      accessorKey: "registeredAddress",
      header: "Address",
    },
    {
      accessorKey: "registeredOccupation",
      header: "Occupation",
    },
    {
      accessorKey: "poojaType",
      header: "Type",
    },
    {
      accessorKey: "timestamp",
      header: "Registered On (IST)",
      cell: ({ row }) => (
        <div>{convertToISTDate(row.getValue("timestamp"))}</div>
      ),
    },
    {
      accessorKey: "hobbies",
      header: "hobbies",
    },
    {
      accessorKey: "coursesTaken",
      header: "coursesTaken",
    },
    {
      accessorKey: "whatsapp",
      header: "whatsapp",
    },
    {
      accessorKey: "registeredMessage",
      header: "Message",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">View</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="p-4">{row.getValue("registeredMessage")}</div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          size="sm"
          onClick={() => handleDelete(row)}
          variant="destructive"
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = async (row) => {
    try {
      await deleteDoc(doc(db, "pooja-registrations", row.original.docId));
      // Update table data to remove the deleted record
      setData((prevData) =>
        prevData.filter((item) => item.docId !== row.original.docId)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Fetch data from Firestore on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = collection(db, "pooja-registrations");
        const querySnapshot = await getDocs(
          query(ref, orderBy("timestamp", "desc"))
        );
        const fetchedData = querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define table using useReactTable hook
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Return JSX for rendering the table
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex gap-4 items-center justify-between flex-wrap w-full">
          <div className="flex gap-4 items-center flex-wrap max-w-[800px]">
            <Input
              placeholder="Filter emails..."
              value={table.getColumn("registeredEmail")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table
                  .getColumn("registeredEmail")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Filter by names..."
              value={table.getColumn("registeredName")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table
                  .getColumn("registeredName")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

          <div className="flex flex-col gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Input
              placeholder="Filter by type..."
              value={table.getColumn("poojaType")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("poojaType")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.accessorKey === "timestamp" ||
                      cell.column.accessorKey === "courseExpires" ? (
                        <div>{convertToISTDate(cell.value)}</div>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </div>
  );
}

export default PoojaRegistrationsTable;
