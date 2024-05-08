import React, { useState } from "react";
import { Segmented } from "antd";

export const SegmentController: React.FC = () => {
    const [value, setValue] = useState<string | number>("Неделя");

    return <Segmented options={["Неделя", "Месяц", "Год"]} value={value} onChange={setValue} />;
};
