import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string';


export async function getEssaySlugs(type) {
    const dir = path.join('src', type)
    const filenames = fs.readdirSync(dir);
    return filenames.map( fn => (
        fn.replace(/\.mdx/, '')
    ))
}

export async function getEssayContent(type, slug) {

    const filename = path.join('src', type, (slug + '.mdx'))

    const rawFile = fs.readFileSync(filename, 'utf-8')

    const { data: metadata, content: markdown } = matter(rawFile)

    const mdxSource = await renderToString(markdown)

    return {
        metadata: {
            ...metadata,
        },
        mdxSource
    }
}

export async function getEssayMetadata(type) {

    const dir = path.join('src', type)

    const files = fs.readdirSync(dir)

    const datum = []

    for (let i = 0; i < files.length; i++) {
        const file = fs.readFileSync(path.join(dir, files[i]), 'utf-8')
        
        const { data: metadata } = matter(file)

        const lastReview = metadata.lastReview || null

        const title = metadata.title || "No title"

        const description = metadata.description || null

        const slug = files[i].replace(/\.mdx/, '')

        datum.push({
            title,
            description,
            lastReview,
            slug,
        })
    }

    return datum

}