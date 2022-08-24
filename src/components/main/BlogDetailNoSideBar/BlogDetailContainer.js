import React from 'react';
import Search from './Search.js'
import BlogDetailContent from './Blogdetailcontent/BlogDetailContent.js';
const BlogDetailContainer = () => {
  return (
    <section className='bg0 p-b-70 p-t-5'>
      <Search />
      <BlogDetailContent />
    </section>
  );
};

export default BlogDetailContainer;