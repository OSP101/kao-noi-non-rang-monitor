import React from 'react'
import { Card, Modal, Grid, Button, Text, Container, Spacer, Switch, } from "@nextui-org/react";


export default function Energy({ isLock, clickLock, addTimeLock, client }) {
    return (
        <Grid.Container css={{  ml: 25,mt: 25 }}>
            <Grid >
                <Grid.Container css={{ }}>
                    <Grid.Container justify="center" alignItems="center" css={{ d: "flex" }}>
                        <Card variant="flat" css={{ mt: 0, p: 20, width: 205, height:250 , pt: 10, backgroundColor: "#000B33", borderRadius: 20 }} >

                            <Grid.Container justify="center" alignItems="center" css={{ d: "flex" }}>
                                <Text size={13} css={{ fontFamily: 'NotoSansThai' }}>พลังงาน</Text>
                            </Grid.Container>

                        </Card>
                    </Grid.Container>
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}
