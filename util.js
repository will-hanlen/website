import fs from 'fs'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string';


export async function getPublishedEssaySlugs() {
  const filenames = fs.readdirSync('_src');
  return filenames.map( fn => (
      fn.replace(/\.mdx/, '')
  ))
}

export async function getEssayContent(slug) {

    const rawFile = fs.readFileSync('_src/' + slug + '.mdx', 'utf-8')

    const { data: metadata, content: markdown } = matter(rawFile)

    const mdxSource = await renderToString(markdown)

    return {
        metadata: {
            wordCount: 1500,
            ...metadata,
        },
        mdxSource
    }
}

export async function getSummaries() {
    const filenames = fs.readdirSync('_src')

    const summaries = []

    for (let i = 0; i < filenames.length; i++) {
        const file = fs.readFileSync('_src/' + filenames[i], 'utf-8')
        
        const { data: metadata } = matter(file)

        summaries.push({
            ...metadata,
            slug: filenames[i].replace(/\.mdx/, '')
        })
    }

    console.log(summaries)

    return summaries

}