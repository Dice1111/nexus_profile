"use client";

import { Button } from "@/components/ui/button";
import React, { use, useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<any[]>([]);

  // CREATE
  const createData = async () => {
    const res = await fetch("/api/apitest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "apple", color: "red" }),
    });
    const newPost = await res.json();
    readData();
    console.log("Created:", newPost);
  };

  // READ
  const readData = async () => {
    const res = await fetch("/api/apitest");
    const tests = await res.json();
    setData(tests);
    console.log("Read:", tests);
  };

  // UPDATE
  const updateData = async () => {
    if (!data[0]) return alert("No data to update");
    const res = await fetch(`/api/apitest/${data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Updated name",
        color: "Updated Color",
      }),
    });
    const updated = await res.json();
    readData();
    console.log("Updated:", updated);
  };

  // DELETE
  const deleteData = async () => {
    if (!data[0]) return alert("No data to delete");
    await fetch(`/api/apitest/${data[0].id}`, {
      method: "DELETE",
    });
    console.log("Deleted");
    readData();
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <Button className="bg-red-200 text-black" onClick={createData}>
        Create Data
      </Button>
      <Button className="bg-red-200 text-black" onClick={readData}>
        Read Data
      </Button>
      <Button className="bg-red-200 text-black" onClick={updateData}>
        Update Data
      </Button>
      <Button className="bg-red-200 text-black" onClick={deleteData}>
        Delete Data
      </Button>

      {/* Show Posts */}
      <div className="mt-10 space-y-2">
        {data.length > 0 ? (
          data.map((test) => (
            <div
              key={test.id}
              className="border p-3 rounded w-[300px] text-white"
            >
              <p className="font-bold">{test.name}</p>
              <p>{test.color}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No posts yet</p>
        )}
      </div>
    </div>
  );
};

export default Page;
