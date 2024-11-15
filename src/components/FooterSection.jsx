import React from 'react';
import '../styles/footer.css';

function FooterSection() {
  return (
    <footer className="nb-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="about">
              <img src="images/logo.png" className="img-responsive center-block" alt="" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, dignissimos! Culpa deleniti magni quasi provident quod. Cupiditate asperiores quisquam est repellat molestiae tenetur voluptas qui repudiandae rerum veniam, error adipisci?                  </p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="footer-info-single">
              <h2 className="title">Help Center</h2>
              <ul className="list-unstyled">
                <li><a><i className="fa fa-angle-double-right"></i> How to Pay</a></li>
                <li><a><i className="fa fa-angle-double-right"></i> FAQ's</a></li>
                <li><a><i className="fa fa-angle-double-right"></i> Sitemap</a></li>
                <li><a><i className="fa fa-angle-double-right"></i> Delivery Info</a></li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="footer-info-single">
              <h2 className="title">Security &amp; privacy</h2>
              <ul className="list-unstyled">
                <li><a><i className="fa fa-angle-double-right"></i> Terms Of Use</a></li>
                <li><a><i className="fa fa-angle-double-right"></i> Privacy Policy</a></li>
                <li><a><i className="fa fa-angle-double-right"></i> Return / Refund Policy</a></li>
                <li><a><i className="fa fa-angle-double-right"></i> Store Locations</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="footer-info-single">
              <h2 className="title">Payment</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit sed suscipit accusantium cupiditate maiores totam impedit natus blanditiis! Quo voluptatibus tempore fugiat error illo cum, cumque molestias inventore vitae atque.</p>
            </div>
          </div>
        </div>
      </div>
      <section className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <p>Copyright © 2024.PAPPU SINGH.</p>
            </div>
            
          </div>
        </div>
      </section>

    </footer>
  );
}

export default FooterSection;
