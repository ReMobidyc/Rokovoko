import React from "react";
import { Link } from "react-router-dom";
import mobidycImg from "../images/reMobidycDefault.png";
export default function IndexPage() {
  return (
    <main>
      <section className="py-5 text-center container">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light"> ReMobidyc</h1>
          <p className="lead text-muted">
            Welcome to ReMobidyc, here you will be able to share your model with
            others.
          </p>
          <p>
            <Link to={"/register"} className="btn btn-primary">
              Register a simulation.
            </Link>
            <Link to={"/runs"} className="btn btn-secondary mx-2">
              See others simulations.
            </Link>
          </p>
        </div>
        <div className="py-5">
          <div className="container">
            <div className="d-flex row justify-content-between">
              <div className="col-sm">
                <img
                  src={mobidycImg}
                  className="rounded img-fluid float-start"
                  alt="reMobidycImg"
                />
                <p className=" lead mt-5">
                  Mobidyc is a software project that aims to promote
                  Individual-Based Modelling in the field of ecology, biology
                  and environment. It is the acronym for MOdelling Based on
                  Individuals for the DYnamics of Communities.
                  <br /> Re:Mobidyc is a variation of Mobidyc that inherits the
                  design rationale of Mobidyc. The objective of Re:Mobidyc is to
                  renovate the original Mobidyc keeping its design principles.
                  <br />
                  The base system is changed from VisualWorks to Pharo. They are
                  both Smalltalk systems, and Pharo is today&apos;s most
                  actively developed/used open-source Smalltalk system.
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
