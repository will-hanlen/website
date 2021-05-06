import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string';


export async function getEssaySlugs() {
    const dir = path.join('src')
    const filenames = fs.readdirSync(dir);
    return filenames.map( fn => (
        fn.replace(/\.mdx/, '')
    ))
}

export async function getEssayContent(slug) {

    const filename = path.join('src', (slug + '.mdx'))

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

export async function readFile(path) {

    const rawFile = fs.readFileSync(path, 'utf-8')

    const { data: metadata, content: markdown } = matter(rawFile)

    const mdxSource = await renderToString(markdown)

    return {
	metadata: {
	    ...metadata,
	},
	mdxSource
    }
}

export async function getEssayMetadata(include_drafts) {

    include_drafts = include_drafts || false

    const dir = path.join('src')

    const files = fs.readdirSync(dir)

    const datum = []

    for (let i = 0; i < files.length; i++) {
        const file = fs.readFileSync(path.join(dir, files[i]), 'utf-8')

        const { data: metadata } = matter(file)

        const published = metadata.published || false

        const lastReview = metadata.lastReview || null

        const title = metadata.title || "No title"

        const description = metadata.description || null

        const slug = files[i].replace(/\.mdx/, '')

        if (include_drafts || published) {
            datum.push({
                title,
                description,
                lastReview,
                slug,
            })
        }
    }

    return datum

}
