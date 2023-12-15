"use client";
import GAActionBar from "@/components/ui/GAActionBar";
import GABreadCrumb from "@/components/ui/GABreadcrumb";
import GATable from "@/components/ui/GATable";
import { useGetMyOrdersQuery } from "@/redux/features/order/orderApi";
import { OrderStatus } from "@/types/ApiResponse";
import { convertStatusText } from "@/utils/convertStatusText";
import { TableColumnProps } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";

const QuotationRequestsPage = () => {
  const { data: session } = useSession();
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  // const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sort"] = !!sortBy && !!sortOrder && sortOrder === "asc" ? sortBy : sortOrder === "desc" ? `-${sortBy}` : undefined;

  // const debouncedTerm = useDebounced({
  //   searchQuery: searchTerm,
  //   delay: 600,
  // });

  // if (!!debouncedTerm) {
  //   query["searchKey"] = debouncedTerm;
  // }
  const { data, isLoading } = useGetMyOrdersQuery(
    { params: { ...query }, status: [OrderStatus.requestQuotation] },
    {
      refetchOnMountOrArgChange: true,
      skip: !session?.accessToken,
    }
  );

  const orders = data?.orders;
  const meta = data?.meta;

  const columns: TableColumnProps<any>[] = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: function (data: any) {
        return <>{convertStatusText(data)}</>;
      },
    },
    {
      title: "Requested At",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    if (order === undefined || field === undefined) return;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  return (
    <div>
      <GAActionBar title="Quotation Requests" customer>
        {/* <div className="w-full md:w-1/4">
          <Input
            type="text"
            size="middle"
            placeholder="Search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div> */}
        <GABreadCrumb items={[{ label: "Order" }, { label: "Quotation"} , { label: "Requests"}]} />
      </GAActionBar>

      <GATable
        loading={isLoading}
        columns={columns}
        dataSource={orders}
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

export default QuotationRequestsPage;
