import React from 'react'
import Image from "next/image";
import { Card, Modal, Grid, Button, Text, Container, Spacer, Switch, } from "@nextui-org/react";
import { useState } from 'react';

import lavel from '../lavel';

const mainSystem = "environment"
lavel.map((topic) => {
    topic.topicControl = mainSystem + "/" + "device/" + topic.id + "/" + "control"
    topic.topicData = mainSystem + "/" + "device/" + topic.id + "/" + "data"
    topic.topicAlive = mainSystem + "/" + "device/" + topic.id + "/" + "alive"
})

export default function Lavel({ isLock, clickLock, addTimeLock, client }) {

    const [lavelData, setLavelData] = useState(lavel);

    return (
        <Grid.Container css={{width: 450, ml: 25 }}>
            <Grid >
                <Grid.Container css={{ mt: 10 }}>
                    <Grid.Container justify="center" alignItems="center" css={{ d: "flex" }}>
                        <Card variant="flat" css={{ mt: 0, p: 20, pt:10,  width: 465, backgroundColor: "#000B33", borderRadius: 20 }} >

                            <Grid.Container justify="center" alignItems="center" css={{ d: "flex" }}>
                                <Text size={13} css={{ fontFamily: 'NotoSansThai'}}>ปริมาณน้ำ</Text>
                            </Grid.Container>


                            <Grid xs={15} justify="space-between" css={{ d: 'flex', flexDirection: 'row' }}>

                                <div>
                                    <Grid.Container css={{}} alignItems="center" justify="space-around">
                                        <Image alt="" priority src='/images/water-tank.png' width={80} height={80} />
                                    </Grid.Container>
                                    <Grid.Container alignItems="center" justify="space-around">
                                        <Text color="" size={13} css={{ fontFamily: 'NotoSansThai' }}>ถังน้ำดิบ 100 %</Text>
                                    </Grid.Container>
                                </div>

                                <div>
                                    <Grid.Container css={{}} alignItems="center" justify="space-around">
                                        <Image alt="" priority src='/images/water-tank.png' width={80} height={80} />
                                    </Grid.Container>
                                    <Grid.Container alignItems="center" justify="space-around">
                                        <Text color="" size={13} css={{ fontFamily: 'NotoSansThai' }}>ถังน้ำดิบ 100 %</Text>
                                    </Grid.Container>
                                </div>

                                <div>
                                    <Grid.Container css={{}} alignItems="center" justify="space-around">
                                        <Image alt="" priority src='/images/water-tank.png' width={80} height={80} />
                                    </Grid.Container>
                                    <Grid.Container alignItems="center" justify="space-around">
                                        <Text color="" size={13} css={{ fontFamily: 'NotoSansThai' }}>ถังน้ำดิบ 100 %</Text>
                                    </Grid.Container>
                                </div>

                                <div>
                                    <Grid.Container css={{}} alignItems="center" justify="space-around">
                                        <Image alt="" priority src='/images/water-tank.png' width={80} height={80} />
                                    </Grid.Container>
                                    <Grid.Container alignItems="center" justify="space-around">
                                        <Text color="" size={13} css={{ fontFamily: 'NotoSansThai' }}>ถังน้ำดิบ 100 %</Text>
                                    </Grid.Container>
                                </div>

                            </Grid>

                        </Card>
                    </Grid.Container>
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}
