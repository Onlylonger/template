import { Button } from "@/components/ui/button";
import { getUserList } from "@/utils/api";
import { useRequest } from "@/utils/useRequest";
import { DataTable, Form, FormItem, Input } from "@shilong/react";
import { useState } from "react";
import { Link } from "react-router";

export const columns: DataTable.ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("company")}</div>
    ),
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("contact")}</div>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("country")}</div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <Link to={`/user/${row.id}`}>编辑</Link>,
  },
];

export const UserPage = () => {
  const [list, setList] = useState([]);

  const table = DataTable.useReactTable({
    data: list,
    columns,
    getCoreRowModel: DataTable.getCoreRowModel(),
    getFilteredRowModel: DataTable.getFilteredRowModel(),
  });

  useRequest(getUserList, {
    onSuccess(res) {
      setList(
        res?.data?.records?.map((v) => ({
          ...v,
          company: `company-${v.id}`,
          contact: `contact-${v.id}`,
          country: `country-${v.id}`,
        })),
      );
    },
  });

  const handleSearch = (v) => {
    table.getColumn("company")?.setFilterValue(v?.company);
  };

  return (
    <div className="flex flex-col gap-4 px-2">
      <Form onSubmit={handleSearch}>
        <div className="flex gap-5">
          <div className="flex-1">
            <FormItem
              label="Company"
              name="company"
              vertical
              render={<Input placeholder="please input" />}
            />
          </div>
          <div className="flex-1">
            <FormItem
              label="Contact"
              name="contact"
              vertical
              render={<Input placeholder="please input" />}
            />
          </div>
        </div>
        <div className="text-right">
          <Button type="submit">Search</Button>
        </div>
      </Form>
      <DataTable.Table table={table} />
    </div>
  );
};
