import { Button, Input, InputRef, Space, Table, TableColumnType, TableColumnsType } from "antd";
import { IProductInfo } from "../../types/types";
import { SearchOutlined } from "@ant-design/icons";
import { FC, useRef, useState } from "react";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";

interface ITransactionsTable {
    data: IProductInfo[];
}
export type ITransactionsIndex = keyof IProductInfo;

export const TransactionsTable: FC<ITransactionsTable> = ({ data }) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
    // const navigate = useNavigate();

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps["confirm"],
        dataIndex: ITransactionsIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    // to do вынести в компонент и убрать дубляж из транзакций
    const getColumnSearchProps = (
        dataIndex: ITransactionsIndex
    ): TableColumnType<IProductInfo> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text: string) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<IProductInfo> = [
        {
            title: "Дата",
            dataIndex: "date",
            width: "20%",
            key: "date",

            ...getColumnSearchProps("date"),
            sorter: (a, b) => dayjs(a.date).diff(dayjs(b.date)),

            sortDirections: ["descend", "ascend"],
            render: (_, record) => dayjs(record.date).format("DD/MM/YYYY"),
        },
        {
            title: "Количество",
            dataIndex: "quantity",
            key: "quantity",
            width: "10%",
            ...getColumnSearchProps("quantity"),
        },
        {
            title: "Продавец",
            dataIndex: "sellerId",
            key: "sellerId",
            width: "10%",
            ...getColumnSearchProps("sellerId"),
        },
        {
            title: "Цена за единицу",
            dataIndex: "pricePerUnit",
            key: "pricePerUnit",
            width: "10%",
            ...getColumnSearchProps("pricePerUnit"),
        },
        {
            title: "Склад",
            dataIndex: "country",
            key: "country",
            width: "10%",
            ...getColumnSearchProps("country"),
        },
    ];
    return (
        <>
            <Table dataSource={data} columns={columns} />
        </>
    );
};
