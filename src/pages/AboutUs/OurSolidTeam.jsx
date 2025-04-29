import React from 'react'
import { useContext } from 'react'
import { LangContext } from '../../context/LangContext'
import { useGetTeamMembersQuery } from '../../dashboard/tools/api/about-team'

const OurSolidTeam = () => {
    const { data: team=[]} = useGetTeamMembersQuery()
    const { lang } = useContext(LangContext)

    return (
        <section className="our-solid-team">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12">
                        <div className="text">
                            <span>{lang === 'AZ' ? 'Möhkəm komandamız' : 'Our solid team'}</span>
                            <h1>{lang === 'AZ' ? 'Səhnə arxasında' : 'Behind the scene'}</h1>
                        </div>
                    </div>
                    {team.map((item)=>(

                    <div key={item._id} className="col-lg-3 col-md-4 col-sm-12" data-aos="fade-up">
                        <div className="profile">
                            <img src={`https://playhost-backend.onrender.com/${item.teamImage}`} alt="" />
                            <h4>{lang==='AZ'? item.fullname: item.fullname}</h4>
                            <p>{lang==='AZ'? item.roleAze: item.roleEng}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurSolidTeam