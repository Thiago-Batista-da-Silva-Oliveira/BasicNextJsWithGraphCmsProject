import { gql } from '@apollo/client'
import React from 'react'
import client from '../../apolloClient'

type Props = {
  title: string;
  coverImage: {
    url: string
  }
  description: {
    html: any
  }
}

export default function StreamPage ({stream}: {stream: Props} ) {
    return (
        <div>
           <h1>{stream.title}</h1>
           <img style={{maxWidth: '500px', maxHeight: '500px'}} src={stream.coverImage.url} alt={`${stream.title} Cover Image`} />
           <div dangerouslySetInnerHTML={{__html:stream.description.html}} />
        </div>
    )
}

export async function getStaticPaths() {
    const {data} = await client.query({
        query: gql `
          query {
            streams {
              slug
            }
          }
        `
      })
    
      const {streams} = data
      const paths = streams.map((stream : {slug: string}) => ({
        params: {slug:[stream.slug]}
      }))

      return {paths, fallback: false}
    
}

export async function getStaticProps({params}: {params: {slug: string[]}}) {
    const slug = params.slug[0]
    const {data} = await client.query({
        query: gql `
          query StreamBySlug($slug: String!) {
            streams (where: {slug:$slug}) {
              title
              slug
              streamDate
              coverImage {
                url
              }
              guestName
              description {
                raw
                html
              }
            }
          }
        `,
        variables: {slug}
      })
    
      const {streams} = data;
      const stream = streams[0];
      return { props: {stream}}
}