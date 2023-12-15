"use client";

import { Table, TableColumnProps } from "antd";

type GATableProps = {
  loading?: boolean;
  columns: TableColumnProps<any>[];
  dataSource: any;
  pageSize?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
  showPagination?: boolean;
};

const GATable = ({
  loading = false,
  columns,
  dataSource,
  pageSize,
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
}: GATableProps) => {
  const paginationConfig = showPagination
    ? {
        size: "small",
        showLessItems: true,
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;

  return <Table loading={loading} columns={columns} dataSource={dataSource} pagination={paginationConfig as any} onChange={onTableChange} scroll={{x: true}}/>;
};

export default GATable;
