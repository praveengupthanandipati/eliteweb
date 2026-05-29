import '../styles/homeblog.scss';

const BlogItem = ({ date, title, image, link }) => {
  return (
    <a href={link} className="blog-card" aria-label={title}>
      <img src={image} alt={title} className="blog-card__img" />
      <div className="blog-card__overlay">
        <span className="blog-card__date">{date}</span>
        <h3 className="blog-card__title">{title}</h3>
      </div>
    </a>
  );
};

export default BlogItem;
