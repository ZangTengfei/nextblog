import Head from 'next/head'
import PageTitle from '@/components/PageTitle'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

export const mdxComponents = {
  pre: ({ className, ...props }) => (
    <pre className={`${className} rounded-md bg-gray-800 py-3 px-4 overflow-x-auto`} {...props} />
  ),
  'pre.code': ({ className, ...props }) => (
    <code className={`${className} text-gray-200`} {...props} />
  ),
}

const postDateTemplate = (t) => dayjs(t).format('YYYY-MM-DD HH:mm')

export default function Post({ meta, children, posts }) {
  const router = useRouter()
  const postIndex = posts.findIndex((post) => post.link === router.pathname)
  const previous = posts[postIndex + 1]
  const next = posts[postIndex - 1]

  return (
    <article className="xl:divide-y xl:divide-gray-200">
      <Head>
        <title>{meta.title} – 臧腾飞的博客</title>
        <meta name="description" content={meta.description}></meta>
      </Head>
      <header className="pt-6 xl:pb-10">
        <div className="space-y-1 text-center">
          <dl className="space-y-10">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base leading-6 font-medium text-gray-500">
                <time dateTime={meta.date}>{postDateTemplate(new Date(meta.date))}</time>
              </dd>
            </div>
          </dl>
          <div>
            <PageTitle>{meta.title}</PageTitle>
          </div>
        </div>
      </header>
      <div
        className="divide-y xl:divide-y-0 divide-gray-200 xl:grid xl:grid-cols-4 xl:col-gap-6 pb-16 xl:pb-20"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        {
          meta.tags && meta.tags.length &&
          <div className='flex justify-center m-6'>
            {
              meta.tags.map(tag => {
                return <span key={tag.text} className={`bg-${tag.color}-400 rounded-full p-0.5 px-2 text-xs text-white font-bold mr-4`}>{tag.text}</span>
              })
            }
          </div>
        }
        <div className="divide-y divide-gray-200 xl:pb-0 xl:col-span-3 xl:row-span-2">
          <div className="prose max-w-none pt-10 pb-8">
            <MDXProvider components={mdxComponents}>{children}</MDXProvider>
          </div>
          {meta.footer && (
            <div className="pt-6 pb-16" dangerouslySetInnerHTML={{ __html: meta.footer }} />
          )}
          {!meta.footer && meta.discussion && (
            <div className="pt-6 pb-16">
              <p>
                Want to talk about this post?{' '}
                <a href={meta.discussion} className="font-medium text-red-500 hover:text-red-600">
                  Discuss this on GitHub &rarr;
                </a>
              </p>
            </div>
          )}
        </div>
        <footer className="text-sm font-medium leading-5 divide-y divide-gray-200 xl:col-start-1 xl:row-start-2">
          {(next || previous) && (
            <div className="space-y-8 py-8">
              {next && (
                <div>
                  <h2 className="text-xs tracking-wide uppercase text-gray-500">下一篇</h2>
                  <div className="text-red-500 hover:text-red-600">
                    <Link href={next.link}>
                      <a>{next.title}</a>
                    </Link>
                  </div>
                </div>
              )}
              {previous && (
                <div>
                  <h2 className="text-xs tracking-wide uppercase text-gray-500">
                    前一篇
                  </h2>
                  <div className="text-red-500 hover:text-red-600">
                    <Link href={previous.link}>
                      <a>{previous.title}</a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="pt-8">
            <Link href="/">
              <a className="text-red-500 hover:text-red-600">&larr; 返回首页</a>
            </Link>
          </div>
        </footer>
      </div>
    </article>
  )
}
