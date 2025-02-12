import { Flex, Switch, Card, Avatar } from "antd";
import styled from "styled-components";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from "react";


export default function CardProduct() {

    const [loading, setLoading] = useState<boolean>(true);
    const CardContainer = styled.div`
    height: auto;
    background-color: red;
  `;

    return (
        <CardContainer>
            <Switch
                checked={!loading}
                onChange={(checked) => setLoading(!checked)}
            />
            <Card loading={loading} style={{ minWidth: 300 }}>
                123
            </Card>
        </CardContainer>
    );
}
