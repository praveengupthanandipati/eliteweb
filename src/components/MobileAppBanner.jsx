import '../styles/mobileappbanner.scss';
import AppImg from '../assets/appimg.png';
import AppStoreImg from '../assets/appstore.png';
import GooglePlayImg from '../assets/googleplayicon.png';

const MobileAppBanner = () => {
  return (
    <section className=" container-fluid">
      <div className="appbanner-section px-3 px-xl-4 rounded-5">
        <div className="row align-items-center">

          {/* ── Text content ── */}
          <div className="col-12 col-md-7 col-lg-6 appbanner-content">
            <span className="appbanner-label">Download Our App</span>
            <h2 className="appbanner-heading">
              Shop Fresh Groceries<br />
              <span className="appbanner-heading--accent">Anytime, Anywhere</span>
            </h2>
            <p className="appbanner-sub">
              Get exclusive app-only deals, track orders in real time, and enjoy a
              seamless shopping experience right from your pocket.
            </p>
            <div className="appbanner-buttons">
              <a
                href="https://www.apple.com/in/app-store/"
                target="_blank"
                rel="noreferrer"
                className="appbanner-btn"
                aria-label="Download on the App Store"
              >
                <img src={AppStoreImg} alt="App Store" />
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
                className="appbanner-btn"
                aria-label="Get it on Google Play"
              >
                <img src={GooglePlayImg} alt="Google Play" />
              </a>
            </div>
          </div>

          {/* ── Phone mockup ── */}
          <div className="col-12 col-md-5 col-lg-6 appbanner-imgwrap">
            <img src={AppImg} alt="Elite Web mobile app" className="appbanner-phone" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default MobileAppBanner;
