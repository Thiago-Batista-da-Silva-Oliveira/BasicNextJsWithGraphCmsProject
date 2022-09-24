import { gql } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import client from '../apolloClient'
import Link from "next/link"

const Home: NextPage = ({streams}: any) => {
  return (
    <div>
      <Head>
        <title>Learning Quick</title>
        <meta name="description" content="Learning Quick Streams" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Learning Quick</h1>
      <ul>
        {streams.map((stream: any, i: number) => (
          <li key={i}>
             <Link href={`streams/${stream.slug}`}>{stream.title}</Link>
          </li>
        ))}
      </ul>

     </div>
  )
}

export default Home

export async function  getStaticProps() {
  const {data} = await client.query({
    query: gql `
      query {
        streams {
          title
          slug
          streamDate
          coverImage {
            url
          }
          guestName
          description {
            raw
          }
        }
      }
    `
  })

  const {streams} = data

  return {
    props: {
     streams
    }
  }
}
