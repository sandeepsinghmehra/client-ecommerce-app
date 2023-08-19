"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CartsColumn = {
    name: string,
    quantity: string,
    price: string,    
}

export const columns: ColumnDef<CartsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price.$numberDecimal",
    header: "Price",
  },
]
