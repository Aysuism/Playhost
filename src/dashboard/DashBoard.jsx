import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import Hero from './Hero'

const Dashboard = () => {
    return (
        <>
            <section className="dashboard">
                <Hero />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <Sidebar />
                        </div>


                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Dashboard