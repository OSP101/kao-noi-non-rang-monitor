import React, { useEffect } from 'react'
import Image from "next/image";
import pump from '../pump';
import { Card, Modal, Grid, Button, Text, Container, Spacer, Switch, } from "@nextui-org/react";
import { useState } from 'react';
import { GoDotFill } from "react-icons/go";
import { SlSpeedometer } from 'react-icons/sl';
import { IconContext } from "react-icons";
import { GiElectric } from "react-icons/gi";
import { FaTemperatureHigh } from "react-icons/fa";
import { BiWater } from 'react-icons/bi';


const mainSystem = "tabwater"
pump.map((topic) => {
    topic.topicControl = mainSystem + "/" + "device/" + topic.id + "/" + "control"
    topic.topicData = mainSystem + "/" + "device/" + topic.id + "/" + "data"
    topic.topicAlive = mainSystem + "/" + "device/" + topic.id + "/" + "alive"
})

const initFlow = [
    {
        "topicData": mainSystem + "/" + "device/" + "15" + "/" + "data",
    },
]


export default function Pump({ isLock, clickLock, addTimeLock, client }) {

    const [pumpData, scalePumpData] = useState(pump);
    const [flow, setFlow] = useState(initFlow);


    const [mixfertilizerWaterLevel, setMixfertilizerWaterLevel] = useState("0")

    const toppicSub = []
    pumpData.map((topic) => {
        toppicSub.push(topic.topicControl)
        toppicSub.push(topic.topicData)
        toppicSub.push(topic.topicAlive)
    })

    toppicSub.push(flow[0].topicData);


    useEffect(() => {
        if (client) {

            client.subscribe(toppicSub, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Subscribed");
                    // console.log(toppicSub); 
                }
            });
            console.log('test');

            client.on('message', (topic, message) => {
                var msg = message.toString()

                // console.log(topic,msg,'test');

                const setValue = pumpData.map((item) => {
                    if (item.topicData === topic) {
                        msg = JSON.parse(msg);
                        item.overload = msg.overload;
                        item.voltage = msg.voltage;
                        item.current = msg.current;
                        item.power = msg.power;
                        item.energy = msg.energy;
                        item.frequency = msg.frequency;
                        item.pf = msg.pf;
                        item.temperature = msg.temperature;
                        item.value = msg.status;
                        // console.log(msg.status);
                    } if (item.topicAlive === topic) {
                        item.alive = msg
                    }
                    if (flow[0].topicData === topic) {
                        // msg = JSON.parse(msg);
                        item.flowRate = JSON.parse(msg).flowRate;
                        // console.log(JSON.parse(msg).flowRate);
                    }
                    return item

                })
                scalePumpData(setValue);
            });

        }
    }, [client])

    const clickPumpControl = (id, value) => {
        if (isLock) {
            clickLock()
        }
        else {
            // const result = valueControl.find(x => x.id == id);
            const setValue = pumpData.map((item, val) => {
                // console.log(val)
                if (item.id == id) {
                    // item.value = !item.value
                    // item.animation = item.value ? 1 : 0
                    const datamsg = JSON.stringify({ "id": id, "value": value })
                    client.publish("controlmonitor", datamsg)
                    console.log("Value", datamsg)
                }
                return item
            })
            addTimeLock()
        }


    }



    return (
        <Grid.Container css={{ height: 450, width: 492 }}>
            <Grid >
                <Grid.Container css={{ mt: 10 }}>
                    {pumpData.map((item) => (
                        <Grid.Container key={item.id} justify="center" alignItems="center" css={{ d: "flex" }}>
                            <Card variant="flat" css={{ mt: 0, p: 10, height: 170, backgroundColor: item.overload === "1" ? "#FFC300" : item.value === "close" ? "#000B33" : "#008000", borderRadius: 20 }} >

                                <Grid.Container alignItems="center" justify="space-between" css={{ mt: 10 }}>
                                    <Grid css={{ d: "flex", flexDirection: "row" }}>
                                        <Grid.Container justify="center" alignItems="center" css={{ d: "flex", flexDirection: "column" }}>
                                            <Image alt="" src='/images/water-pump.png' width={70} height={70} />
                                            {/* <IconContext.Provider value={{ color: item.alive === "online" ? "#5CC853" : "red" }}> */}
                                            <GoDotFill style={{}} size={20} color={`${item.alive === "online" ? "#5CC853" : "red"}`} />
                                            {/* </IconContext.Provider> */}


                                            <Button.Group size="xs" color="success" disabled={item.overload === "1"}>
                                                <Button onPress={() => clickPumpControl(item.id, "close")} css={{ fontFamily: 'NotoSansThai', backgroundColor: item.value === "close" ? "success" : "#31406D" }}>ปิด</Button>
                                                <Button onPress={() => clickPumpControl(item.id, "open")} css={{ fontFamily: 'NotoSansThai', backgroundColor: item.value === "open" ? "success" : "#31406D" }}>เปิด</Button>
                                                <Button onPress={() => clickPumpControl(item.id, "auto")} css={{ fontFamily: 'NotoSansThai', backgroundColor: item.value === "auto" ? "success" : "#31406D" }}>อัตโนมัติ</Button>
                                            </Button.Group>
                                        </Grid.Container>

                                        <Grid.Container justify="space-around" alignItems="center">
                                            <div>
                                                <Grid.Container justify="center" alignItems="center" css={{ d: "flex", flexDirection: "row", mb: 5 }}>
                                                    <div>
                                                        <Card variant="flat" css={{ mt: 0, width: 40, height: 40, backgroundColor: "white", borderRadius: 15 }} >
                                                            <Grid.Container justify="center" alignItems="center">
                                                                {/* <IconContext.Provider value={{ color: "black"}}> */}
                                                                <GiElectric color='orange' style={{ marginTop: 6 }} size={25} />
                                                                {/* </IconContext.Provider> */}
                                                            </Grid.Container>
                                                        </Card>
                                                    </div>
                                                    <div>
                                                        <Grid.Container css={{ d: "flex", flexDirection: "column" }}>
                                                            <Text size={13} css={{ ml: 15, fontFamily: 'NotoSansThai' }}>กำลังไฟฟ้า</Text>
                                                            <Grid.Container alignItems="center">
                                                                <Text b size={15} css={{ ml: 15, mb: 5, mt: -5, fontFamily: 'NotoSansThai' }}>{item.power} W</Text>
                                                                {/* <Text size={20} css={{ ml: 15, fontFamily: 'NotoSansThai' }}>lux</Text> */}
                                                            </Grid.Container>
                                                        </Grid.Container>
                                                    </div>

                                                </Grid.Container>


                                            </div>

                                            <div>
                                                <Grid.Container justify="center" alignItems="center" css={{ d: "flex", flexDirection: "row" }}>
                                                    <div>
                                                        <Card variant="flat" css={{ mt: 0, width: 40, height: 40, backgroundColor: "white", borderRadius: 15 }} >
                                                            <Grid.Container justify="center" alignItems="center">
                                                                {/* <IconContext.Provider value={{ color: "black"}}> */}
                                                                <GiElectric color='orange' style={{ marginTop: 6 }} size={25} />
                                                                {/* </IconContext.Provider> */}
                                                            </Grid.Container>
                                                        </Card>
                                                    </div>
                                                    <div>
                                                        <Grid.Container css={{ d: "flex", flexDirection: "column" }}>
                                                            <Text size={13} css={{ ml: 15, mt: 5, fontFamily: 'NotoSansThai' }}>กระแสไฟฟ้า</Text>
                                                            <Grid.Container alignItems="center">
                                                                <Text b size={15} css={{ ml: 15, mb: 5, mt: -5, fontFamily: 'NotoSansThai' }}>{item.current} A</Text>
                                                                {/* <Text size={20} css={{ ml: 15, fontFamily: 'NotoSansThai' }}>lux</Text> */}
                                                            </Grid.Container>
                                                        </Grid.Container>
                                                    </div>

                                                </Grid.Container>


                                            </div>


                                        </Grid.Container>

                                        <Grid.Container justify="space-around" alignItems="center">
                                            <div>
                                                <Grid.Container justify="center" alignItems="center" css={{ d: "flex", flexDirection: "row", mb: 5 }}>
                                                    <div>
                                                        <Card variant="flat" css={{ mt: 0, width: 40, height: 40, backgroundColor: "white", borderRadius: 15 }} >
                                                            <Grid.Container justify="center" alignItems="center">
                                                                {/* <IconContext.Provider value={{ color: "black"}}> */}
                                                                <FaTemperatureHigh color='red' style={{ marginTop: 6 }} size={25} />
                                                                {/* </IconContext.Provider> */}
                                                            </Grid.Container>
                                                        </Card>
                                                    </div>
                                                    <div css={{ width: 40 }}>
                                                        <Grid.Container css={{ d: "flex", flexDirection: "column" }}>
                                                            <Text size={13} css={{ ml: 15, fontFamily: 'NotoSansThai' }}>อุณหภูมิมอเตอร์</Text>
                                                            <Grid.Container alignItems="center">
                                                                <Text b size={15} css={{ ml: 15, mb: 5, mt: -5, fontFamily: 'NotoSansThai' }}>{item.temperature} °C</Text>
                                                                {/* <Text size={20} css={{ ml: 15, fontFamily: 'NotoSansThai' }}>lux</Text> */}
                                                            </Grid.Container>
                                                        </Grid.Container>
                                                    </div>

                                                </Grid.Container>


                                            </div>

                                            <div>
                                                <Grid.Container justify="center" alignItems="center" css={{ d: "flex", flexDirection: "row" }}>
                                                    <div>
                                                        <Card variant="flat" css={{ mt: 0, width: 40, height: 40, backgroundColor: "white", borderRadius: 15 }} >
                                                            <Grid.Container justify="center" alignItems="center">
                                                                {/* <IconContext.Provider value={{ color: "black" }}> */}
                                                                <BiWater color='blue' style={{ marginTop: 6 }} size={25} />
                                                                {/* </IconContext.Provider> */}
                                                            </Grid.Container>
                                                        </Card>
                                                    </div>
                                                    <div css={{ width: 40 }}>
                                                        <Grid.Container css={{ d: "flex", flexDirection: "column", width: 91 }}>
                                                            <Text size={13} css={{ ml: 15, mt: 5, fontFamily: 'NotoSansThai' }}>อัตราการไหล</Text>
                                                            <Grid.Container alignItems="center">
                                                                <Text b size={15} css={{ ml: 15, mb: 5, mt: -5, fontFamily: 'NotoSansThai' }}>{item.flowRate} L/min</Text>
                                                                {/* <Text size={20} css={{ ml: 15, fontFamily: 'NotoSansThai' }}>lux</Text> */}
                                                            </Grid.Container>
                                                        </Grid.Container>
                                                    </div>

                                                </Grid.Container>


                                            </div>


                                        </Grid.Container>
                                    </Grid>



                                </Grid.Container>
                            </Card>
                            <Text size={13} css={{ fontFamily: 'NotoSansThai', pt: 9, pb: 12 }}>{item.name}</Text>
                        </Grid.Container>
                    ))}
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}
