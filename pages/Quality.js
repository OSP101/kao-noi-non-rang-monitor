import React from 'react'
import Image from "next/image";
import { Card, Modal, Grid, Button, Text, Container, Spacer, Switch, } from "@nextui-org/react";
import { useState } from 'react';

import quality from '@/quality';

import { IoWater } from 'react-icons/io5';
import { IconContext } from "react-icons";

const mainSystem = "environment"
quality.map((topic) => {
    topic.topicControl = mainSystem + "/" + "device/" + topic.id + "/" + "control"
    topic.topicData = mainSystem + "/" + "device/" + topic.id + "/" + "data"
    topic.topicAlive = mainSystem + "/" + "device/" + topic.id + "/" + "alive"
})
export default function Quality({ isLock, clickLock, addTimeLock, client }) {
    return (
        <Grid.Container css={{ ml: 25 ,mt: 25}}>
            <Grid >
                <Grid.Container css={{  }}>
                    <Grid.Container justify="center" alignItems="center" css={{ d: "flex" }}>
                        <Card variant="flat" css={{ mt: 0, p: 20, pt: 10, width: 230, backgroundColor: "#000B33", borderRadius: 20 }} >

                            <Grid.Container justify="center" alignItems="center" css={{ d: "flex" }}>
                                <Text size={13} css={{ fontFamily: 'NotoSansThai' }}>คุณภาพน้ำ</Text>
                            </Grid.Container>

                            <Grid xs={15} justify="space-between" css={{ d: 'flex', flexDirection: 'row' }}>

                                <div>
                                    <Grid.Container css={{}} alignItems="center" justify="space-around">
                                        {/* <IconContext.Provider value={{ color: "#09A3FF" }}> */}
                                            <IoWater  color='' style={{ marginTop: 5 }} size={45} />
                                        {/* </IconContext.Provider> */}
                                    </Grid.Container>
                                    <Grid.Container alignItems="center" justify="space-around">
                                        <Text color="" size={13} css={{ fontFamily: 'NotoSansThai' }}>ถังน้ำดิบ 100 %</Text>
                                    </Grid.Container>
                                </div>

                                <div>
                                    <Grid.Container css={{}} alignItems="center" justify="space-around">
                                        {/* <IconContext.Provider value={{ color: "#09A3FF" }}> */}
                                            <IoWater style={{ marginTop: 5 }} size={45} />
                                        {/* </IconContext.Provider>                                     */}
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
