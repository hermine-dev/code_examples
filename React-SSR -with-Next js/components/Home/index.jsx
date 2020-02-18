import React from 'react';
import { Container, Row } from 'react-bootstrap';

export const Home = () => {

    return (
        <Container>
            <Title
                renderTag="h2"
                align="center"
                color="dark"
                size="lg"
                subtitle="Our Services"
                uppercase
                underline
            >
                Featured Service that We Provide
            </Title>
            <Row className="mt-5">
            </Row>
        </Container>
    );
};
