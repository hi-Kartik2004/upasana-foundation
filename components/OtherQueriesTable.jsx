"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { deleteDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Input } from "./ui/input";

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

// Define the ContactUsTable component
export function ContactUsTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contact-us"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        fetchedData.sort((a, b) => b.timestamp - a.timestamp);
        // remove +91 if present in phone number
        fetchedData.forEach((item) => {
          if (item.phone.startsWith("+91")) {
            item.phone = item.phone.slice(3);
          }
        });
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const emailMatch = item.email
        .toLowerCase()
        .includes(filters.email.toLowerCase());
      const nameMatch = item.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      return emailMatch && nameMatch;
    });
    setFilteredData(filtered);
  }, [data, filters]);

  const handleDelete = async (row) => {
    try {
      await deleteDoc(doc(db, "contact-us", row.id));
      setData((prevData) => prevData.filter((item) => item.id !== row.id));
      setFilteredData((prevData) =>
        prevData.filter((item) => item.id !== row.id)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="rounded-md mb-10">
      <div className="flex gap-4 items-center mb-6 flex-wrap">
        <Input
          placeholder="Filter emails..."
          value={filters.email}
          onChange={(event) =>
            setFilters({ ...filters, email: event.target.value })
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter by names..."
          value={filters.name}
          onChange={(event) =>
            setFilters({ ...filters, name: event.target.value })
          }
          className="max-w-sm"
        />
      </div>

      {filteredData.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">View</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="p-4">{row.message ?? "Not provided"}</div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>{convertToISTDate(row.timestamp)}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(row)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center">No records found.</p>
      )}
    </div>
  );
}
