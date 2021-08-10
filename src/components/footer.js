import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

/**
 * Component to display the footer content
 * @returns display the footer content
 */
export default function Footer() {
  return (
    <footer className="mt-auto bg-light text-muted text-center text-lg-start">
      <section className="Link">
        <div className="container text-center text-md-start mt-1">
          <div className="row mt-3">
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <Link to={"/"} className="text-reset">
                <h6 className="mb-2">
                  <img src={logo} alt="reMobidyc logo" /> reMobidycServer
                </h6>
              </Link>
              <p>Share your model with other research teams</p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="mb-4">University Link</h6>
              <p>
                <a
                  href="https://wwp.shizuoka.ac.jp/dgtalaqualab/news/"
                  className="text-reset"
                >
                  DGtalAquaLab
                </a>
              </p>
              <p>
                <a href="http://fil.univ-lille1.fr/" className="text-reset">
                  University of Lille
                </a>
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="mb-4">Usefuls Link</h6>
              <p>
                <a href="https://github.com/ReMobidyc" className="text-reset">
                  ReMobidyc Github
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center p-2 bg-dark">
        <span> &copy; 2021 DGtalAquaLab</span>
      </div>
    </footer>
  );
}
