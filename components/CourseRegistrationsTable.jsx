"use client";
import React, { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { collection, getDocs } from "firebase/firestore";

const convertToISTDate = (timestamp) => {
  const dateObj = new Date(timestamp);
  // Set input date object to UTC time zone
  dateObj.setUTCHours(0, 0, 0, 0);
  const ISTOffset = 330; // Offset in minutes for IST
  const ISTTimestamp = dateObj.getTime() + ISTOffset * 60 * 1000;
  const ISTDate = new Date(ISTTimestamp);
  return ISTDate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
};

const columns = [
  {
    accessorKey: "docId",
    header: "id",
  },
  {
    accessorKey: "registeredEmail",
    header: "Email",
  },
  {
    accessorKey: "registeredName",
    header: "User Name",
  },
  {
    accessorKey: "registeredPhone",
    header: "Phone",
  },
  {
    accessorKey: "registeredWhatsapp",
    header: "Whatsapp",
  },
  {
    accessorKey: "fees",
    header: "Fees",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "name",
    header: "Course Name",
  },
  {
    accessorKey: "registeredBatch",
    header: "Batch",
    cell: ({ row }) => (
      <div className="flex w-[100px]">{row.getValue("registeredBatch")}</div>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Taken on (IST)",
    cell: ({ row }) => <div>{convertToISTDate(row.getValue("timestamp"))}</div>,
  },
  {
    accessorKey: "courseExpires",
    header: "Expires (IST)",
    cell: ({ row }) => (
      <div>{convertToISTDate(row.getValue("courseExpires"))}</div>
    ),
  },
];

export function CourseRegistrationsTable() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [sortByTimestampAsc, setSortByTimestampAsc] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = collection(db, "course-registrations");
        const querySnapshot = await getDocs(ref);
        const fetchedData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleToggleSortByTimestamp = () => {
    setSorting([
      {
        id: "timestamp",
        desc: sortByTimestampAsc,
      },
    ]);
    setSortByTimestampAsc((prev) => !prev);
  };

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
              placeholder="Filter by course names..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Filter by batches..."
              value={table.getColumn("registeredBatch")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table
                  .getColumn("registeredBatch")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="flex flex-col gap-4 items-start">
            <div className="flex flex-wrap items-center max-w-[500px]">
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

              <Button
                className="ml-4"
                variant="outline"
                onClick={handleToggleSortByTimestamp}
              >
                Sort by Taken on Date{" "}
                <CaretSortIcon
                  className={`h-4 w-4 ${
                    sortByTimestampAsc ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Add the Excel download button */}
            <ReactHTMLTableToExcel
              id="excelButton"
              className="ml-4"
              table="table-to-xls"
              filename="course_registrations"
              sheet="Sheet"
              buttonText="Download as Excel"
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table id="table-to-xls">
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
                      {cell.column.accessorKey === "timestamp" ? (
                        <div>{convertToISTDateTime(cell.value)}</div>
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

export default CourseRegistrationsTable;
