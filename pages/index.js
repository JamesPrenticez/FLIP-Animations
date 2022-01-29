import Head from 'next/head'
import DNDGrid from '../components/DNDGrid'


export default function Home() {
  return (
    <>
      <Head>
        <title>James' Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <List /> */}
      <DNDGrid />


    </>
  )
}