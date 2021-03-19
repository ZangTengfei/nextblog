import dayjs from 'dayjs'
import Link from 'next/link'
import Head from 'next/head'
import getAllPostPreviews from '@/getAllPostPreviews'

const posts = getAllPostPreviews()

const postDateTemplate = (t) => dayjs(t).format('YYYY-MM-DD')

export default function Home() {
  return (
    <div className="divide-y divide-gray-200">
      <Head>
        <title>臧腾飞的博客</title>
        <meta name="description" content="热爱生活" />
      </Head>

      <ul className="divide-y divide-gray-200">
        {posts.map(({ link, module: { default: Component, meta } }) => {
          return (
            <li key={link} className="py-12">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500">
                    <time dateTime={meta.date}>{postDateTemplate(new Date(meta.date))}</time>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="">
                    <h2 className="text-2xl leading-8 font-bold tracking-tight">
                      <Link href={link}>
                        <a className="text-gray-900">{meta.title}</a>
                      </Link>
                    </h2>
                    {
                      meta.tags && meta.tags.length &&
                      <div className='mt-1 space-x-4'>
                        {
                          meta.tags.map(tag => {
                            return <span key={tag.text} className={`bg-${tag.color}-400 rounded-full p-0.5 px-2 text-xs text-white font-bold`}>{tag.text}</span>
                          })
                        }
                      </div>
                    }
                    <div className="prose max-w-none text-gray-500 mt-6">
                      <Component />
                    </div>
                  </div>
                  <div className="text-base leading-6 font-medium">
                    <Link href={link}>
                      <a
                        className="text-red-500 hover:text-red-600"
                        aria-label={`Read "${meta.title}"`}
                      >
                        阅读全文 &rarr;
                      </a>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
