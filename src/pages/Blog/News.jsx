import React from 'react'
import BlogCard from '../../components/BlogCard'
import { useGetBlogsQuery } from '../../dashboard/tools/api/blog'

const News = () => {
  const { data: blogs=[]} = useGetBlogsQuery();

  return (
    <section className='news-section'>
      <div className="container">
        <div className="row g-4">
          {blogs.map((item) => (
            <BlogCard key={item._id} alldata={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default News