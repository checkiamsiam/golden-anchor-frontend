"use client";
import GAActionBar from "@/components/ui/GAActionBar";
import GABreadCrumb from "@/components/ui/GABreadcrumb";
import GAButton from "@/components/ui/GAButton";
import GATable from "@/components/ui/GATable";
import { useDebounced } from "@/hooks/useDebounced";
import { Link, useRouter } from "@/lib/router-events";
import { useGetBrandsQuery } from "@/redux/features/brand/brandApi";
import { Button, Input, TableColumnProps } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";

const ManageBrandPage = () => {
  const { data: session } = useSession();
  const query: Record<string, any> = {};
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sort"] = !!sortBy && !!sortOrder && sortOrder === "asc" ? sortBy : sortOrder === "desc" ? `-${sortBy}` : undefined;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchKey"] = debouncedTerm;
  }

  const { data, isLoading } = useGetBrandsQuery(
    { params: { ...query } },
    {
      refetchOnMountOrArgChange: true,
      skip: !session?.accessToken,
    }
  );

  const brands = data?.brands;
  const meta = data?.meta;

  const columns: TableColumnProps<any>[] = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "id",
      className: "text-center",
      render: function (data: string) {
        return (
          <div className="flex justify-center items-center gap-5">
            <GAButton size="small" onClick={() => router.push(`/admin/manage-brand/details/${data}`)}>
              view
            </GAButton>
            <GAButton size="small" onClick={() => router.push(`/admin/manage-brand/edit/${data}`)}>
              edit
            </GAButton>
          </div>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    if (!(order === undefined || field === undefined)) {
      setSortBy(field as string);
      setSortOrder(order === "ascend" ? "asc" : "desc");
    }
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <GAActionBar title="Manage Brand">
        <div className="flex md:flex-row flex-col gap-5 md:gap-0  justify-between items-center">
          <GABreadCrumb items={[{ label: "Management" }, { label: "Brand" }]} />
          <div className="w-full md:w-1/4">
            <Input
              type="text"
              size="middle"
              value={searchTerm}
              placeholder="Search..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <Link href="/admin/manage-brand/create">
            <GAButton type="primary">Add Brand</GAButton>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button style={{ margin: "0px 5px" }} type="primary" onClick={resetFilters}>
              <AiOutlineReload />
            </Button>
          )}
        </div>
      </GAActionBar>

      <GATable
        loading={isLoading}
        columns={columns}
        dataSource={brands}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ManageBrandPage;
