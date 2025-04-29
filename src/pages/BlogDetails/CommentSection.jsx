import React from 'react'

const CommentSection = () => {
    return (
        <section className="comment-section">
            <h3>Comments(5)</h3>
            <div className="comment">
                <div className="commenter writer">
                    <img src="https://madebydesignesia.com/themes/playhost/images/people/1.jpg" alt="Merrill Rayos" className="comment-avatar" />
                    <div className="comment-content">
                        <div className="comment-header">
                            <h6>Merrill Rayos</h6>
                            <span className="comment-date">15 January 2020</span>
                        </div>
                        <p className="comment-text">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>
                </div>
                <div className="commenter replier">
                    <img src="https://madebydesignesia.com/themes/playhost/images/people/2.jpg" alt="Jackqueline Sprang" className="comment-avatar" />
                    <div className="comment-content">
                        <div className="comment-header">
                            <h6>Jackqueline Sprang</h6>
                            <span className="comment-date">15 January 2020 | Reply</span>
                        </div>
                        <p className="comment-text">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>
                </div>
            </div>
            <div className="comment">
                <div className="commenter writer">
                    <img src="https://madebydesignesia.com/themes/playhost/images/people/3.jpg" alt="Merrill Rayos" className="comment-avatar" />
                    <div className="comment-content">
                        <div className="comment-header">
                            <h6>Merrill Rayos</h6>
                            <span className="comment-date">15 January 2020 | Reply</span>
                        </div>
                        <p className="comment-text">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>
                </div>
                <div className="commenter replier">
                    <img src="https://madebydesignesia.com/themes/playhost/images/people/4.jpg" alt="Jackqueline Sprang" className="comment-avatar" />
                    <div className="comment-content">
                        <div className="comment-header">
                            <h6>Jackqueline Sprang</h6>
                            <span className="comment-date">15 January 2020 | Reply</span>
                        </div>
                        <p className="comment-text">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>
                </div>
            </div>
            <div className="comment">
                <div className="commenter">
                    <img src="https://madebydesignesia.com/themes/playhost/images/people/5.jpg" alt="Merrill Rayos" className="comment-avatar" />
                    <div className="comment-content">
                        <div className="comment-header">
                            <h6>Merrill Rayos</h6>
                            <span className="comment-date">15 January 2020 | Reply</span>
                        </div>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>
                </div>
            </div>
            <div className="leave-comment">
                <h3>Leave a Comment</h3>
                <form action="">
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputEName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="form-label">
                        <label>Comments</label>
                        <textarea className="form-control"></textarea>
                    </div>
                    <button>SEND</button>
                </form>
            </div>
        </section>
    )
}

export default CommentSection