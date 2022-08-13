import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

var About = (prop) => {

    return (
        <div className="container">

            <div className="row">
                <div className="col"> Project by</div>
            </div>
            <div className="row">
                <div className="col-6">

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Hassan Ali</h5>
                        </div>
                    </div>

                </div>
                <div className="col-6">

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Ramsha</h5>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
}


export default About;