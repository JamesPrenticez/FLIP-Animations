import Head from 'next/head'
// import DNDGrid from '../components/DNDGrid'
//import FramerGrid from '../components/DNDFramerGrid'
import FramerMotionGrid from "../components/FramerMotionGrid/FramerMotionGrid";
//import WTF from '../components/WTF';



export default function Home() {
  return (
    <>
      <Head>
        <title>James' Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <List /> */}
      {/* <DNDGrid /> */}
      <FramerMotionGrid />



    </>
  )
}