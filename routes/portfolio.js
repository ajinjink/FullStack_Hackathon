const express = require('express');
const db = require('../data/database');
const router = express.Router();

router.get('/main', function(req, res) {
    const query = `
    select id, title, userId, created_at, count
    from post 
    where id = userId
    `
    res.render('list');
})

router.get('/view', function(req,res){
    res.render('view');
})

module.exports = router;
// 번호 제목 글쓴이 작성일 조회
// id title userId created_at count