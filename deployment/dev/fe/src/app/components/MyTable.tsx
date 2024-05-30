import { current } from "@reduxjs/toolkit";
import { Table } from "antd";
import { useEffect, useState } from 'react'

const MyTable = (props: any) => {

    const { totalRecords, dataTable, columns } = props;

    const [page, setPage] = useState(1);
    const [pageSize, setPagesize] = useState(5);
    const [loadingTable, setLoadingTable] = useState(true);

    const changePageSize = (page: number, pageSize: number) => {
        setPagesize(pageSize);
        setPage(page);
    };

    const pagination = {
        pageSizeOptions: [5, 10, 20],
        current: page,
        total: totalRecords,
        pageSize: pageSize,
        onChange: setPage,
        onShowSizeChange: changePageSize,
        showTotal: (total: any, range: any) => `${total} Kết quả`,
    }


    return (
        <Table
            style={{ width: "100%" }}
            columns={columns}
            pagination={pagination}
            dataSource={dataTable}
        />

    )
}

export default MyTable;