import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'

export default function Home() {
  function CloseMenu() {
    const elem = document.getElementById("menu__toggle");
    if (elem) {
      elem.checked = false;
    }
    const elem2 = document.getElementById("menu__toggle_profile");
    if (elem2) {
      elem2.checked = false;
    }
  }



  return (
    <div >
      <Head>
        <title>Casino</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className='wrapper-content' onClick={() => CloseMenu()}>
        <Hero />
      </div>
    </div>
  )
}
