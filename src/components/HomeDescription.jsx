import '../styles/homedescription.scss';

const STATS = [
  { value: '40,000+', label: 'Products' },
  { value: '1,000+',  label: 'Brands' },
  { value: '10M+',    label: 'Happy Customers' },
  { value: '300+',    label: 'Cities & Towns' },
];

const HomeDescription = () => {
  return (
    <section className="homedesc-section">
      <div className="container-fluid px-3 px-xl-4">

        <h2 className="homedesc-title">Elite Agro foods – online grocery store</h2>

        {/* Stats strip */}
        <div className="homedesc-stats">
          {STATS.map((s) => (
            <div key={s.label} className="homedesc-stat">
              <span className="homedesc-stat__value">{s.value}</span>
              <span className="homedesc-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Body copy */}
        <div className="homedesc-body py-4">
          <h4>Elite Agro foods – online grocery store</h4>
          <p>
            Did you ever imagine that the freshest of fruits and vegetables, top-quality pulses and
            food grains, dairy products, and hundreds of branded items could be handpicked and
            delivered to your home, all at the click of a button? In today's fast-paced world,
            Elite Agro Foods, India's pioneering online grocery store, continues to bring a
            staggering array of over 40,000 products from more than 1,000 brands to the doorsteps
            of over 10 million satisfied customers. From essential household cleaning products to
            the latest beauty and makeup trends, Elite Agro Foods remains your one-stop shop for
            daily needs.
          </p>
          <p>
            In these times, we've eliminated the stress associated with shopping for daily
            essentials. You can now effortlessly order all your household products and groceries
            online. Plus, the added convenience of finding all your requirements at a single source,
            coupled with substantial savings, demonstrates that Elite Agro Foods, India's largest
            online supermarket, has transformed the way we shop for groceries. Online grocery
            shopping has become second nature. And when it comes to freshness, whether it's fruits
            and vegetables or dairy and meat, we've got you covered! Easily obtain fresh eggs, meat,
            fish, and more with just a few clicks.
          </p>
          <p>
            We now serve 300+ cities and towns across India and ensure swift delivery times,
            guaranteeing that all your groceries, snacks, and branded foods reach you on time.
            Slotted Delivery: Choose the most convenient delivery slot to receive your groceries,
            ranging from early morning delivery for early birds to late-night delivery for those on
            the night shift. Elite Agro Foods caters to every schedule.
          </p>
          <p>
            <strong>Instant delivery from Elite Now:</strong> In response to the ever-increasing
            demand for convenience, Elite Now by Elite Agro Foods offers lightning-fast grocery
            delivery, ensuring that your essentials are at your doorstep within{' '}
            <strong>15–30 minutes</strong>. Our quick delivery service has revolutionized the way
            you shop for groceries. Choose from 5,000+ grocery essentials. Elite Now is available
            only in select cities.
          </p>
          <p>
            Whether it's a last-minute dinner party or you simply need something urgently, we've
            got you covered. This service exemplifies our commitment to providing you with not just
            the widest range of products but also the fastest and most efficient shopping experience,
            making Elite Agro Foods the go-to destination for all your immediate grocery needs.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HomeDescription;
