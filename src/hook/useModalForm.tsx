import { FC } from "react";
import { useModalStore } from "../store/modal";
import { Modal } from "antd";

interface IFormComponent<T> {
    onClose: () => void;
    data?: T;
}

export const useModalForm = <T,>(FormComponent: FC<IFormComponent<T>>) => {
    const { modal, setModal } = useModalStore();

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const ModalWrapper = (data: T) => (
        <Modal open={modal} onCancel={closeModal} footer={null}>
            <FormComponent onClose={closeModal} data={data} />
        </Modal>
    );

    return { openModal, ModalWrapper };
};
