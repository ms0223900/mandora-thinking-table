import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MandoraThinkingTableContainer from '../src/components/mandora/MandoraThinkingTableContainer'
import styles from '../styles/Home.module.css'

const Header = () => (
  <Head>
    <title>Mandora Thinking Table</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <meta name="description" content="mandora thinking table :)" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <h1>Write Your Mandora Goals</h1>
      <MandoraThinkingTableContainer />
    </div>
  )
}

export default Home
