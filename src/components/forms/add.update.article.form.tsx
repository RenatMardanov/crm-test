import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { productService } from "../../api/service/product-service";
import { Loader } from "../forms/loader";
import { Button, Form, Input } from "antd";
import { FormItem } from "react-hook-form-antd";
import { useForm } from "react-hook-form";
import { IProduct } from "../../types/types";
import { FC } from "react";

interface IAddUpdateArticleForm {
    data?: IProduct;
}

export const AddUpdateArticleForm: FC<IAddUpdateArticleForm> = ({ data: oldData }) => {
    const { id } = useParams();
    const { data, isError, isSuccess, isFetching } = useQuery({
        queryKey: ["products", id],
        queryFn: () => productService.getProductById(id!),
    });

    console.log(oldData, "ddddddddddddddddddddddd");

    const { control, handleSubmit } = useForm<IProduct>({
        defaultValues: {
            article: data?.data[0].article,
            name: data?.data[0].name || "",
        },
    });
    if (isFetching) {
        return <Loader />;
    }
    if (isError) {
        console.log("Ошибка запроса");
    }
    if (isSuccess) {
        console.log(data.data);
        return (
            <Form
                onFinish={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <FormItem control={control} label="Артикул" name="article">
                    <Input />
                </FormItem>
                <FormItem control={control} label="Наименование" name="name">
                    <Input />
                </FormItem>
                <Button>Изменить</Button>
                <p>{data.data[0].name}</p>
            </Form>
        );
    }
    return <div>Произошла ошибка, обратитесь к администратору</div>;
};
