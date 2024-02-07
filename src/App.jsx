import { Descriptions, Typography, Table, Spin, Input, Space, Button, message } from "antd";
import { useState } from "react";

import { useGetDeviceQuery } from "./api/api";

const { Title, Text } = Typography;

function App() {
    const [value, setValue] = useState("");

    const { data, isLoading, isFetching, error } = useGetDeviceQuery(
        { uuid: value },
        { pollingInterval: 30000, refetchOnMountOrArgChange: true }
    );

    const columns = [
        {
            title: "датчик ID",
            dataIndex: "detector_id",
            key: "detector_id",
        },
        {
            title: "позиция шин",
            dataIndex: "tyre_position",
            key: "tyre_position",
        },
        {
            title: "давление",
            dataIndex: "pressure",
            key: "pressure",
        },
        {
            title: "температура",
            dataIndex: "temp",
            key: "temp",
        },
    ];

    return (
        <div style={{ position: "relative" }}>
            {(isFetching || isLoading) && (
                <Spin style={{ position: "absolute", top: "50%", left: "50%" }} size="large" />
            )}
            <div
                style={{
                    padding: 100,
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    opacity: isFetching ? 0.5 : 1,
                }}
            >
                <div style={{ fontSize: 56, fontWeight: 500, textAlign: "center", fontFamily: "sans-serif" }}>
                    «Tyreman» <br />
                    Detector data processor (Wialon Combine)
                </div>
                <Space.Compact>
                    <Input.Search
                        style={{ width: 300 }}
                        size="large"
                        placeholder="imei"
                        onSearch={(value) => setValue(value)}
                        enterButton="Поиск"
                    />
                </Space.Compact>
                <div>
                    <Title level={4} style={{ marginBottom: 20 }}>
                        Пакет
                    </Title>
                    <Descriptions bordered layout="vertical">
                        <Descriptions.Item label="imei">{!error && data?.last_packet.imei}</Descriptions.Item>
                        <Descriptions.Item label="Скорость">{!error && data?.last_packet.speed}</Descriptions.Item>
                        <Descriptions.Item label="Широта">{!error && data?.last_packet.lat}</Descriptions.Item>
                        <Descriptions.Item label="Долгота">{!error && data?.last_packet.lon}</Descriptions.Item>
                        <Descriptions.Item label="Значение снижения точности в горизонтальной плоскости (HDOP)">
                            {!error && data?.last_packet.hdop}
                        </Descriptions.Item>
                        <Descriptions.Item label="Направление движения (COURSE)">
                            {!error && data?.last_packet.course}
                        </Descriptions.Item>
                        <Descriptions.Item label="Количество видимых спутников (SATS)">
                            {!error && data?.last_packet.sats}
                        </Descriptions.Item>
                        <Descriptions.Item label="Высота над уровнем моря (ALT)">
                            {!error && data?.last_packet.alt}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <div>
                    <Title level={4} style={{ marginBottom: 20 }}>
                        Шины
                    </Title>
                    <Table columns={columns} dataSource={error ? [] : data?.tyres_data} key="detector_id" />
                </div>
            </div>
        </div>
    );
}

export default App;
