import BlogItem from './BlogItem';
import '../styles/homeblog.scss';

import Blog01 from '../assets/blogs/blog01img.jpg';
import Blog02 from '../assets/blogs/blog02img.jpg';
import Blog03 from '../assets/blogs/blog03img.jpg';
import Blog04 from '../assets/blogs/blog04img.jpg';

const BLOGS = [
  {
    id: 1,
    date: '15 May 2025',
    title: 'Different Types of Lentils and Their Nutritional Value Explained',
    image: Blog01,
    link: '/blog/types-of-lentils',
  },
  {
    id: 2,
    date: '15 May 2025',
    title: 'Best Ways to Cook Pulses for a Healthy Balanced Meal',
    image: Blog02,
    link: '/blog/cook-pulses-healthy-meal',
  },
  {
    id: 3,
    date: '15 May 2025',
    title: 'Why Organic Dal and Pulses Are Better for Your Health',
    image: Blog03,
    link: '/blog/organic-dal-pulses-benefits',
  },
  {
    id: 4,
    date: '15 May 2025',
    title: 'Easy and Delicious Recipes Using Dal and Pulses at Home',
    image: Blog04,
    link: '/blog/dal-pulses-recipes',
  },
];

const HomeBlog = () => {
  return (
    <section className="homeblog-section">
      <div className="container-fluid px-3 px-xl-4">

        <div className="homeblog-head">
          <h2 className="homeblog-title">Blogs &amp; Updates</h2>
          <div className="homeblog-divider" />
        </div>

        <div className="row g-3 g-md-4">
          {BLOGS.map((blog) => (
            <div key={blog.id} className="col-12 col-sm-6 col-lg-3">
              <BlogItem
                date={blog.date}
                title={blog.title}
                image={blog.image}
                link={blog.link}
              />
            </div>
          ))}
        </div>

        <div className="homeblog-footer">
          <a href="/blog" className="homeblog-viewall">
            View All Blogs &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};

export default HomeBlog;
