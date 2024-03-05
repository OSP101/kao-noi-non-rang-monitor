import Image from "next/image";
import Head from 'next/head'
import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic'

import Pump from "./Pump"


import { HiComputerDesktop } from 'react-icons/hi2';
import { IconContext } from 'react-icons';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';


import { Card, Modal, Grid, Button, Text, Container, Spacer, Switch, } from "@nextui-org/react";

const Clock = dynamic(() => import('react-live-clock'), {
  ssr: false,
})

export default function Home() {
  const [textTitle, setTextTitle] = useState("สวัสดี")
  const [isLock, setIsLock] = useState(true)
  const [passwordModal, setPasswordModal] = useState(false)
  const [iconName, setIconName] = useState("")
  const [iconWeahter, setIconWeahter] = useState("http://openweathermap.org/img/wn/03n@2x.png")
  const [weather, setWeather] = useState("")




  const clickLock = () => {
    // setIsLock(!isLock)
    if (isLock) {
      setPasswordModal(true)
    } else {
      setIsLock(true)
    }
  }

  async function fetchWeather() {
    const apiKey = "c47b4ef40e28071d7183e29e5822c006"
    const lat = "16.222807"
    const long = "103.647208"
    try {

      let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + apiKey, {
        method: 'GET'
      })

      const data = await response.json()
      let icon = data.weather[0].icon
      let linkIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      setIconName(icon)
      setIconWeahter(linkIcon)
      setWeather(data)
    } catch (e) {
      console.log(e)
    }
  }

  const clock = () => {
    var today = new Date()
    let hour = today.getHours()
    // console.log(today.getSeconds())
    // console.log(today.getMinutes() % 10 == 0 && today.getSeconds() ==0)
    if (today.getMinutes() % 10 == 0 && today.getSeconds() == 0) {
      fetchWeather()
    }

    if (hour >= 6 && hour <= 9) {
      setTextTitle("สวัสดีตอนเช้า")
    }

    if (hour >= 10 && hour <= 11) {
      setTextTitle("สวัสดีตอนสาย")
    }

    if (hour == 12) {
      setTextTitle("สวัสดีตอนเที่ยง")
    }

    if (hour >= 13 && hour <= 15) {
      setTextTitle("สวัสดีตอนบ่าย")
    }

    if (hour >= 16 && hour <= 18) {
      setTextTitle("สวัสดีตอนค่ำ")
    }

    if (hour >= 19 && hour <= 23 || hour >= 0 && hour <= 5) {
      setTextTitle("ราตรีสวัสดิ์")
    }


    // console.log(duration)

  }

  useEffect(() => {
    clock()
    fetchWeather()

  }, [])

  return (
    <div>
      <Head>
        <title>หน้าแรก</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid.Container justify="center" alignItems="center" css={{ mt: 10, d: 'flex', flexDirection: "column" }}>
        <Text color="#fff" size={25} css={{ mt: 0, fontFamily: 'NotoSansThai' }}>
          Kao Noi Non Rang Plumbing
        </Text>

      </Grid.Container>

      <Grid.Container justify="flex-end" alignItems="center" css={{ mt: -30, pr: 25, d: 'flex', flexDirection: "row" }}>
        <IconContext.Provider value={{ color: "#fff" }}>
          <HiComputerDesktop size={10} />
        </IconContext.Provider>
        <Text size={10} css={{ ml: 3, mt: 3, fontFamily: 'NotoSansThai' }}>
          connectStatus
        </Text>

      </Grid.Container>

      <Grid.Container justify="center" css={{ mt: 2, pl: 20, pr: 20 }}>
        <Card css={{ backgroundColor: "#000B33", display: "flex", flexDirection: "row" }}>

          <Grid xs={5} alignItems="center">
            <Grid.Container justify="flex-start" alignItems="center" css={{ ml: 25, mt: 0 }}>
              <Text size={18} css={{ mt: 0, ml: 0, fontFamily: 'NotoSansThai' }}>
                {textTitle}
              </Text>
              <Text b color="#9E9E9E" weight="normal" size={15} css={{ mt: 0, ml: 0, fontFamily: 'NotoSansThai' }}>
                <Clock
                  format={'DD/MM/YYYY'}
                  style={{ marginLeft: 10, fontSize: '16px' }}
                  ticking={true}
                  timezone="Asia/Bangkok"
                />
              </Text>

              <Grid.Container justify="flex-start" alignItems="center" css={{ pb: 10 }}>
                <Image alt="" src='/images/placeholder.png' width={20} height={20} />
                <div>
                  <Text size={16} css={{ ml: 5, fontFamily: 'NotoSansThai' }}>
                    บ้านเก่าน้อย - โนนรัง
                  </Text>
                </div>
              </Grid.Container>
            </Grid.Container>
          </Grid>



          <Grid xs={2} justify="center">
            <Card id="lock" onPress={() => clickLock()} isPressable css={{ mt: 5, mb: 5, width: 80, height: 80, backgroundColor: isLock ? "#FF5D5D" : "#88EF4D" }} >
              <Grid.Container alignItems="center" justify="space-around">

                <Grid.Container alignItems="center" justify="space-around" css={{ mt: 2 }}>
                  <Text b size={10} color="#101C42" css={{ fontFamily: 'NotoSansThai' }}>{isLock ? "Lock" : "Unlock"}</Text>
                  <Switch size="xs" css={{ $$switchColor: "#fff", $$switchColorHover: "#D2D2D2" }} checked={isLock} />
                </Grid.Container>
                <Grid.Container css={{ mt: 5 }} alignItems="center" justify="space-around">
                  {/* <Image alt="" src='/images/valve.png' width={50} height={50} /> */}
                  {isLock ?
                    <IconContext.Provider value={{ color: "#101C42" }}>
                      <HiLockClosed size={50} />
                    </IconContext.Provider>
                    :
                    <IconContext.Provider value={{ color: "#101C42" }}>
                      <HiLockOpen size={50} />
                    </IconContext.Provider>
                  }

                </Grid.Container>
              </Grid.Container>
            </Card>
          </Grid>


          <Grid xs={5} justify="flex-end" alignItems="center">
            {iconName === "01d" ?
              <Grid css={{ mt: 0 }}>
                <Grid.Container justify="center" alignItems="center" css={{ d: "flex", flexDirection: "column" }}>
                  <Image alt="" src="/images/sun.png" width={50} height={50} />
                  <Text size={15} css={{ mt: -10, fontFamily: 'NotoSansThai' }}>
                    {weather ? weather.weather[0].main : null}
                  </Text>
                </Grid.Container>
              </Grid>
              :
              iconName === "01n" ?
                <Grid css={{ mt: 10 }}>
                  <Grid.Container justify="center" alignItems="center" css={{ d: "flex", flexDirection: "column" }}>
                    <Image alt="" src="/images/moon.png" width={42} height={42} />
                    <Text size={15} css={{ mt: -3, fontFamily: 'NotoSansThai' }}>
                      {weather ? weather.weather[0].main : null}
                    </Text>
                  </Grid.Container>
                </Grid>
                :
                <Grid css={{ mt: -25 }}>
                  <Grid.Container justify="center" alignItems="center" css={{ d: "flex", flexDirection: "column" }}>
                    <Image alt="" src={iconWeahter} width={90} height={90} />
                    <Text size={15} css={{ mt: -25, fontFamily: 'NotoSansThai' }}>
                      {weather ? weather.weather[0].main : null}
                    </Text>
                  </Grid.Container>
                </Grid>
            }
            <Grid>
              <Grid.Container css={{ mr: 20 }}>
                <Clock
                  format={'HH:mm:ss'}
                  style={{ marginLeft: 0, marginTop: 10, fontSize: '12px' }}
                  ticking={true}
                  onChange={() => clock()}
                />
                <Text size={12} css={{ ml: 10, mt: 10, fontFamily: 'NotoSansThai' }}>
                  น.
                </Text>
              </Grid.Container>
              <Grid.Container css={{ mr: 20, d: 'flex', flexDirection: 'row' }}>
                <Text  size={30} css={{ mt: -9, fontFamily: 'NotoSansThai' }}>
                  {weather ? (weather.main.temp - 273.15).toFixed(1) : null}
                </Text>
                <Text size={12} css={{ mt: 0, fontFamily: 'NotoSansThai' }}>
                  °C
                </Text>
              </Grid.Container>
            </Grid>


          </Grid>
        </Card>

            <Pump />

      </Grid.Container>
    </div>
  )
}
