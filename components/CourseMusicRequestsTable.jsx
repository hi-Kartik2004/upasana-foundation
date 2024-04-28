"use client";

import * as React from "react";
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
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import CourseMusicRegistrations from "@/app/(admin)/course-music-registrations/page";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const convertToISTDate = (timestamp) => {
  const dateObj = new Date(timestamp);
  // Set input date object to UTC time zone
  dateObj.setUTCHours(0, 0, 0, 0);
  const ISTOffset = 330; // Offset in minutes for IST
  const ISTTimestamp = dateObj.getTime() + ISTOffset * 60 * 1000;
  const ISTDate = new Date(ISTTimestamp);
  return ISTDate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
};

export function CourseMusicRequestsTable() {
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [sortByTimestampAsc, setSortByTimestampAsc] = React.useState(false);

  const columns = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "name",
      header: "User Name",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "fees",
      header: "Fees",
    },
    {
      accessorKey: "musicCourseName",
      header: "Course",
    },
    {
      accessorKey: "isRegistered",
      header: "course taken",
    },
    {
      accessorKey: "status",
      header: "status",
    },
    {
      accessorKey: "timestamp",
      header: "Taken on (IST)",
      cell: ({ row }) => (
        <div>{convertToISTDate(row.getValue("timestamp"))}</div>
      ),
    },
    {
      accessorKey: "comments",
      header: "comments",
      cell: ({ row }) => (
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="outline">View</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <p>Comments by {row.getValue("name")}</p>
            {row.getValue("comments")}
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
    {
      accessorKey: "Approve",
      header: "Approve",
      cell: ({ row }) =>
        (row.original.status === "Pending" ||
          row.original.status === "Rejected") && ( // Only render if status is Pending
          <Button size="sm" onClick={() => handleApprove(row)}>
            Approve
          </Button>
        ),
    },
    {
      accessorKey: "actions",
      header: "Reject",
      cell: ({ row }) =>
        (row.original.status === "Pending" ||
          row.original.status === "Approved") && ( // Only render if status is Pending
          <Button
            size="sm"
            onClick={() => handleDelete(row)}
            variant="destructive"
          >
            Reject
          </Button>
        ),
    },
  ];

  // async function addMemberToFirebase(email) {
  //   const membersRef = collection(db, "members");
  //   const member = {
  //     email: email,
  //     isMember: true,
  //     isAdmin: false,
  //     timestamp: new Date(),
  //   };
  //   // check if the person with same email has already registered
  //   const checker = await getDocs(
  //     query(membersRef, where("email", "==", email))
  //   );

  //   if (checker.docs.length > 0) {
  //     await updateDoc(checker.docs[0].ref, member);

  //     alert("Membership renewed");

  //     return;
  //   }

  //   try {
  //     await addDoc(membersRef, member);
  //     console.log("Document written with ID: ", member.email);
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }
  // }
  const handleApprove = async (row) => {
    try {
      if (!row.original.docId) {
        console.error("Error: docId is undefined");
        return;
      }
      await updateDoc(doc(db, "course-music-requests", row.original.docId), {
        status: "Approved",
      });

      // Update table data record status to approved
      setData((prevData) =>
        prevData.map((item) =>
          item.docId === row.original.docId
            ? { ...item, status: "Approved" }
            : item
        )
      );
      alert("Approved to proceed for payment!");
    } catch (error) {
      console.error("Error approving record:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      if (!row.original.docId) {
        console.error("Error: docId is undefined");
        return;
      }
      await updateDoc(doc(db, "course-music-requests", row.original.docId), {
        status: "Rejected",
      });

      // Update table data record status to approved
      setData((prevData) =>
        prevData.map((item) =>
          item.docId === row.original.docId
            ? { ...item, status: "Rejected" }
            : item
        )
      );
      alert("Rejected to proceed for payment");
    } catch (error) {
      console.error("Error approving record:", error);
    }
  };

  // Fetch data from Firestore on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = collection(db, "course-music-requests");
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
              value={table.getColumn("email")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Filter by names..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
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

export default CourseMusicRequestsTable;
