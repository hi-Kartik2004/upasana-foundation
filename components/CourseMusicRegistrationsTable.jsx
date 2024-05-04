"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export function MusicRegistrationsTable() {
  const [data, setData] = React.useState([]);
  const [startFilterDate, setStartFilterDate] = React.useState("");
  const [stopFilterDate, setStopFilterDate] = React.useState("");

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
  }, []);

  const handleFilterByExpiryDate = (row) => {
    const expiryTimestamp =
      row.original.expiry.seconds * 1000 +
      Math.floor(row.original.expiry.nanoseconds / 1000000);
    const expiryDate = new Date(expiryTimestamp);
    if (startFilterDate && stopFilterDate) {
      const startTimestamp = new Date(startFilterDate).getTime();
      const stopTimestamp = new Date(stopFilterDate).getTime();
      return (
        expiryTimestamp >= startTimestamp && expiryTimestamp <= stopTimestamp
      );
    }
    return true;
  };

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

  const filteredData = data.filter(handleFilterByExpiryDate);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex gap-4 items-center flex-wrap max-w-[800px]">
          <Input
            placeholder="Filter by course expiry date between start and stop"
            value={startFilterDate}
            onChange={(event) => setStartFilterDate(event.target.value)}
            className="max-w-sm"
            type="date"
          />

          <Input
            placeholder="Stop Date"
            value={stopFilterDate}
            onChange={(event) => setStopFilterDate(event.target.value)}
            className="max-w-sm"
            type="date"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessorKey}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.accessorKey}>
                    {column.cell
                      ? column.cell({ row })
                      : row[column.accessorKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
