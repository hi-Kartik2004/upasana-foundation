"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

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
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { revalidatePath } from "next/cache";

const convertToISTDate = (timestamp) => {
  const dateObj = new Date(timestamp);
  dateObj.setUTCHours(0, 0, 0, 0);
  const ISTOffset = 330; // Offset in minutes for IST
  const ISTTimestamp = dateObj.getTime() + ISTOffset * 60 * 1000;
  const ISTDate = new Date(ISTTimestamp);
  return ISTDate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
};

export function MusicRegistrationsTable() {
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [sortByTimestampAsc, setSortByTimestampAsc] = React.useState(false);
  const [startFilterDate, setStartFilterDate] = React.useState("");
  const [stopFilterDate, setStopFilterDate] = React.useState("");
  const [submitting, setSubmiting] = React.useState(false);

  const columns = [
    {
      accessorKey: "registeredEmail",
      header: "Email",
    },
    {
      accessorKey: "courseName",
      header: "Course Name",
    },
    {
      accessorKey: "expiry",
      header: "Expiry Date",
      cell: ({ row }) => (
        <div>
          {new Date(
            row.original.expiry.seconds * 1000 +
              Math.floor(row.original.expiry.nanoseconds / 1000000)
          ).toLocaleString("en-IN", {
            timeZone: "IST",
          })}
        </div>
      ),
    },
    {
      accessorKey: "fees",
      header: "Fees",
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
      accessorKey: "batch",
      header: "Batch",
      cell: ({ row }) => (
        <p className="w-[200px]">
          Batch From: {row.original?.batch?.date}, {row.original?.batch?.time}{" "}
          IST
        </p>
      ),
      filterFn: (row, columnId, filterValue) => {
        const batchInfo = `Batch From: ${row.original?.batch?.date}, ${row.original?.batch?.time} IST`;
        return batchInfo.toLowerCase().includes(filterValue.toLowerCase());
      },
    },
    {
      accessorKey: "timestamp",
      header: "Activated On",
      cell: ({ row }) => (
        <div>
          {new Date(
            row.original.expiry.seconds * 1000 +
              Math.floor(row.original.expiry.nanoseconds / 1000000)
          ).toLocaleString("en-IN", {
            timeZone: "IST",
          })}
        </div>
      ),
    },
    {
      accessorKey: "Delete",
      header: "Delete",
      cell: ({ row }) => (
        <Button
          onClick={() => handleDelete(row)}
          size="sm"
          variant="destructive"
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = async (row) => {
    setSubmiting(true);
    try {
      if (!row.original.id) {
        console.error("Error: docId is undefined");
        return;
      }
      try {
        await deleteDoc(doc(db, "course-music-registrations", row.original.id));
        alert("Record deleted successfully");
      } catch (err) {
        console.error(err);
      }
    } catch (error) {
      console.error("Error approving record:", error);
    }

    setSubmiting(false);
  };

  const handleFilterByExpiryDate = (row) => {
    console.log("filtering", row);
    if (!row.original || !row.original.expiry) {
      return false; // If row or expiry is undefined, exclude the row
    }

    const expiryDate = row.original.expiry.toDate(); // Convert Firestore Timestamp to JavaScript Date
    if (startFilterDate && stopFilterDate) {
      const startDate = new Date(startFilterDate);
      const stopDate = new Date(stopFilterDate);
      return startDate <= expiryDate && expiryDate <= stopDate;
    }
    return true;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = collection(db, "course-music-registrations");
        const querySnapshot = await getDocs(ref);
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [submitting]);

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
    const sortingState = [
      {
        id: "expiry",
        desc: sortByTimestampAsc,
        compare: (a, b) => {
          const aTimestamp = new Date(
            a.original.expiry.seconds * 1000 +
              Math.floor(a.original.expiry.nanoseconds / 1000000)
          ).getTime();
          const bTimestamp = new Date(
            b.original.expiry.seconds * 1000 +
              Math.floor(b.original.expiry.nanoseconds / 1000000)
          ).getTime();
          return sortByTimestampAsc
            ? aTimestamp - bTimestamp
            : bTimestamp - aTimestamp;
        },
      },
    ];
    setSorting(sortingState);
    setSortByTimestampAsc((prev) => !prev);
  };

  const filteredData = data.filter(handleFilterByExpiryDate);

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
              placeholder="Filter by batch..."
              value={table.getColumn("batch")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("batch")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />

            <ReactHTMLTableToExcel
              id="excelButton"
              className="ml-4"
              table="table-to-xls"
              filename="course_registrations"
              sheet="Sheet"
              buttonText="Download as Excel"
            />
          </div>

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

          <Button variant="outline" onClick={handleToggleSortByTimestamp}>
            Sort by Timestamp{" "}
            <CaretSortIcon
              className={`ml-2 h-4 w-4 ${
                sortByTimestampAsc ? "rotate-180" : ""
              }`}
            />
          </Button>
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
                      {cell.column.accessorKey === "timestamp" ? (
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

export default MusicRegistrationsTable;
