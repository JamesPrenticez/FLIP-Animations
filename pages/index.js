import Head from 'next/head'
import List from '../components/List'


export default function Home() {
  return (
    <>
      <Head>
        <title>James' Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <List />

    </>
  )
}