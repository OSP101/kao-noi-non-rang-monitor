import React from 'react'
import Image from "next/image";
import { Card, Modal, Grid, Button, Text, Container, Spacer, Switch, } from "@nextui-org/react";
import { useState } from 'react';

import chemicals from '../chemicals';

import { IoWater } from 'react-icons/io5';
import { IconContext } from "react-icons";
const mainSystem = "environment"
chemicals.map((topic) => {
    topic.topicControl = mainSystem + "/" + "device/" + topic.id + "/" + "control"
    topic.topicData = mainSystem + "/" + "device/" + topic.id + "/" + "data"
    topic.topicAlive = mainSystem + "/" + "device/" + topic.id + "/" + "alive"
})

export default function Chemicals({ isLock, clickLock, addTimeLock, client }) {

    const [ chemicalsData, setChemicalsData ] = useState(chemicals)
    return (
        <Grid.Container css={{ml:25, mt: 25 }}>
            <Grid >
                <Grid.Container css={{ }}>
                    <Grid.Container justify="center" alignItems="center" css={{ d: "flex" }}>
                    <Grid>
                            <Grid.Container justify="center" alignItems="center" css={{ d: "flex", flexDirection: "column" }}>
                                <Card id="pump" onPress={() => clickPump()} isPressable css={{ width: 100, height: 100, pt:5, backgroundColor: chemicalsData[0].value ? "#88EF4D" : "#000B33" }} >
                                    <Grid.Container alignItems="center" justify="space-around">

                                        <Grid.Container alignItems="center" justify="space-around">
                                            <Text size={13} color={chemicalsData[0].value ? "#101C42" : ""} css={{ fontFamily: 'NotoSansThai' }}>{chemicalsData[0].value ? "เปิด" : "ปิด"}</Text>
                                            <Switch size="xs" css={{ $$switchColor: "white", $$switchColorHover: "#D2D2D2" }} checked={chemicalsData[0].value} />
                                        </Grid.Container>
                                        <Grid.Container css={{ mt: 2 }} alignItems="center" justify="space-around">
                                            <Image alt="" src='/images/water-pump.png' width={50} height={50} />
                                        </Grid.Container>
                                <Text size={13} css={{  fontFamily: 'NotoSansThai' }}>{chemicalsData[0].name}</Text>

                                    </Grid.Container>
                                </Card>
                            </Grid.Container>
                        </Grid>
                    </Grid.Container>
                </Grid.Container>
            </Grid>

            <Grid css={{ml:25}}>
                <Grid.Container css={{}}>
                    <Grid.Container justify="center" alignItems="center" css={{ d: "flex" }}>
                    <Grid>
                            <Grid.Container justify="center" alignItems="center" css={{ d: "flex", flexDirection: "column" }}>
                                <Card id="pump" onPress={() => clickPump()} isPressable css={{ width: 100, height: 100, pt:5, backgroundColor: chemicalsData[1].value ? "#88EF4D" : "#000B33" }} >
                                    <Grid.Container alignItems="center" justify="space-around">

                                        <Grid.Container alignItems="center" justify="space-around">
                                            <Text size={13} color={chemicalsData[1].value ? "#101C42" : ""} css={{ fontFamily: 'NotoSansThai' }}>{chemicalsData[1].value ? "เปิด" : "ปิด"}</Text>
                                            <Switch size="xs" css={{ $$switchColor: "white", $$switchColorHover: "#D2D2D2" }} checked={chemicalsData[1].value} />
                                        </Grid.Container>
                                        <Grid.Container css={{ mt: 2 }} alignItems="center" justify="space-around">
                                            <Image alt="" src='/images/water-pump.png' width={50} height={50} />
                                        </Grid.Container>
                                <Text size={13} css={{  fontFamily: 'NotoSansThai' }}>{chemicalsData[1].name}</Text>

                                    </Grid.Container>
                                </Card>
                            </Grid.Container>
                        </Grid>
                    </Grid.Container>
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}
