const express = require('express');
const db = require('../data/database');
const router = express.Router();

router.get('/main', async function(req, res) {
    const query = `
        select post.*, users.name as user_name 
        from post inner join users on post.userId = users.id
    `
    const [posts] = await db.query(query);

    const postsData = posts.map(post => {
        return {
            ...post,
            created_at: new Date(post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }
    });

    res.render('list', {posts: postsData});
})

router.get('/view/:postid', async function(req,res){
    const query = `
        select post.*, users.name as user_name 
        from post inner join users on post.userId = users.id
    `;
    const [posts] = await db.query(query, [req.params.id]);

    if (!posts || posts.length === 0) { // 일치하는 게시글 없음
        return res.status(404).render('404');
    }

    const postData = {
        ...posts[0], // posts[0]의 모든 속성 복사, 분해 후 나열
        date: posts[0].created_at.toISOString(), // 기계를 위한 시간
        human_date: posts[0].created_at.toLocaleDateString('ko-KR', { // 인간들이 볼 시간
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    res.render('edit', {post: postData});
})

module.exports = router;
// 번호 제목 글쓴이 작성일 조회
// id title userId created_at count