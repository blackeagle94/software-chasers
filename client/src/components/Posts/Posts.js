import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const Posts = () => {
    const [posts, setPost] = useState()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)

    useEffect(() => {
        axios.get(`http://localhost:5000/posts?page=${page}&limit=${limit}`)
            .then(res => setPost(res.data.response))
            .catch(err => console.log(err))
    }, [page, limit])
    console.log(posts)
    return (
        <div className="d=flex justify-content-center">
            <div>
                <input type='number' value={page} onChange={e => setPage(e.target.value)} placeholder="Page"/>
                <input type='number' value={limit} onChange={e => setLimit(e.target.value)} placeholder="Limit"/>
            </div>

            {posts && posts.map((post, index) => <div key={index}>
                <h4>{post.title}</h4>
            </div>)}
        </div>
    )
}

export default Posts
