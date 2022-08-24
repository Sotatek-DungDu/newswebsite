import React, { useEffect, useState } from 'react'
import { getUserData, getAdvertise } from "../../../services/newServices";
import HeaderMobile from './HeaderMobile'
import MainNav from './MainNav'
import MenuMobile from './MenuMobile'
import Topbar from './Topbar'
import Logo from './Logo'
import Weather from './Weather';
import axios from 'axios';
const API_KEY = "7dd44990511c474a9b982354220305"
const BASE_URL = "http://api.weatherapi.com/v1"

function Header() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  let [weather, setWeather] = useState();

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q='Hanoi'`);
        setWeather(response)
        console.log("responseWe", response);
      } catch (error) {
        console.log("err", error);
      }
    }
    getWeather()

    async function getUser() {
      try {
        const response = await getUserData()

        setUser(response)

      } catch (error) {
        console.log("err", error);
      }
    }
    getUser()

    async function getAds() {
      setLoading(true)
      try {
        const response = await getAdvertise()
        setAds(response[1])
        console.log("ads", response[1]);
      } catch (error) {
        console.log("err", error);

      } finally {

        setTimeout(
          () => setLoading(false),
          500
        );
      }
    }
    getAds()
  }, [])

  console.log("user", user);

  return (
    <header>
      <div className="container-menu-desktop">
        {/*Topbar*/}
        <Topbar userdata={user} weather={weather} />

        {/* Header Mobile */}
        <HeaderMobile />
        {/* Logo moblie */}
        {/* Menu Mobile */}
        <MenuMobile />
        {/*  */}

        {/* Logo desktop */}
        <Logo banner={ads} />
        {/* Banner */}

        {/*  */}
        <MainNav />
      </div>
    </header>
  )
}

export default Header