import { useQuery } from "@tanstack/react-query";
import { productService } from "../../api/service/product-service";
import { Button, Input, InputRef, Space, Table, TableColumnType, TableColumnsType } from "antd";
import { IProduct, IProductIndex } from "../../types/types";
import { DeleteOutlined, EditOutlined, LineChartOutlined, SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { Loader } from "../forms/loader";

const ProductsTable = () => {
    const { data, isFetching } = useQuery({
        queryKey: ["products"],
        queryFn: productService.getAllProducts,
    });
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
    const navigate = useNavigate();

    if (isFetching) return <Loader />;

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps["confirm"],
        dataIndex: IProductIndex
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
    const getColumnSearchProps = (dataIndex: IProductIndex): TableColumnType<IProduct> => ({
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
            record[dataIndex]!.toString()
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

    const columns: TableColumnsType<IProduct> = [
        {
            title: "Артикул",
            dataIndex: "article",
            key: "article",
            width: "15%",
            ...getColumnSearchProps("article"),
        },
        {
            title: "Наименование",
            dataIndex: "name",
            key: "name",
            width: "60%",
            ...getColumnSearchProps("name"),
        },
        {
            title: "",
            key: "action",
            render: (_, record: IProduct) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => navigate(`${record._id}/edit`)}>
                        Изменить
                    </Button>
                    <Button icon={<LineChartOutlined />} onClick={() => navigate(`${record._id}`)}>
                        Стасистика
                    </Button>
                    <Button icon={<DeleteOutlined />} danger>
                        Удалить
                    </Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table dataSource={data?.data} columns={columns} />
        </>
    );
};

export default ProductsTable;
