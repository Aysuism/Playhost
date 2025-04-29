import { useContext } from "react";
import { LangContext } from "../../context/LangContext";
import { useParams } from "react-router";
import slugify from "slugify";
import Hero from "./Hero";
import CommentSection from "./CommentSection";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaStumbleupon } from "react-icons/fa";
import { FaDelicious } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { useGetBlogsQuery } from "../../dashboard/tools/api/blog";

const BlogDetails = () => {
    const { data: blogs=[] } = useGetBlogsQuery()
    const { lang } = useContext(LangContext);
    const { url_id } = useParams();

    const findBlog = blogs.find((blog) => {
        const englishSlug = slugify(blog.titleEng, { lower: true });
        return englishSlug === url_id;
    });

    return (
        <div className="blog-details">
            <Hero />
            {findBlog ? (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <div className="about-blog">
                                <img src={`https://playhost-backend.onrender.com/${findBlog.imageUrl}`} alt={lang === 'AZ' ? findBlog.titleAze : findBlog.titleEng} />
                                <p>{lang === "AZ" ? findBlog.descriptionAze : findBlog.descriptionEng}</p>
                            </div>
                            <CommentSection />
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="right-side">
                                <h3>Share With Friends</h3>
                                <div className="icons">
                                    <a href="https://x.com/steam"><FaTwitter className="social-media-icon" /></a>
                                    <a href="https://www.facebook.com/Steam/"><FaFacebook className="social-media-icon" /></a>
                                    <a href="https://discord.com/invite/steam"><FaDiscord className="social-media-icon" /></a>
                                    <a href="https://www.linkedin.com/pulse/steam-gaming-platform-gaurav-pathak/"><FaLinkedin className="social-media-icon" /></a>
                                    <a href="https://www.pinterest.com/kostrovrnik/steam-game/"><FaPinterest className="social-media-icon" /></a>
                                    <a href="https://store.steampowered.com/app/1677740/Stumble_Guys/"><FaStumbleupon className="social-media-icon" /></a>
                                    <a href="https://store.steampowered.com/bundle/2398/Delicious_8in1_Bundle/"><FaDelicious className="social-media-icon" /></a>
                                    <a href="https://www.tiktok.com/discover/steam"><FaTiktok className="social-media-icon" /></a>
                                </div>

                                <h3>Recent Posts</h3>
                                <div className="posts">
                                    <div className="post">
                                        <span>10 Jun</span>
                                        <p>6 Make Mobile Website Fastet</p>
                                    </div>
                                    <div className="post">
                                        <span>22 Jun</span>
                                        <p>Experts Web Design Tips</p>
                                    </div>
                                    <div className="post">
                                        <span>20 Jun</span>
                                        <p>Imposrtance OF Web Design</p>
                                    </div>

                                    <div className="post">
                                        <span>12 Jun</span>
                                        <p>Avoid These Errors in UI Design</p>
                                    </div>
                                </div>

                                <h3>About Us</h3>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni</p>

                                <h3>Tags</h3>
                                <div className="tags">
                                    <span>Art</span>
                                    <span>Application</span>
                                    <span>Design</span>
                                    <span>Entertainment</span>
                                    <span>Internet</span>
                                    <span>Marketing</span>
                                    <span>Multipurpose</span>
                                    <span>Music</span>
                                    <span>Print</span>
                                    <span>Programming</span>
                                    <span>Responsive</span>
                                    <span>Website</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Blog not found</div>
            )}
        </div>
    );
};

export default BlogDetails;