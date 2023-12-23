const express = require('express');
const db = require('../data/database');
const router = express.Router();

router.get('/main', function(req, res) {
    res.render('list');
})

//전체 리스트
router.get("/allList", async function(req,res) {
    const query = "select * from post";
    const [posts] = await db.query(query);
    res.render("allList", {posts : posts});
})

// 상세 페이지
router.get("/allList/:id", async function(req,res) {
    const query = "select * from post where id =? ";
    const query2 = 'UPDATE post SET count+=1 WHERE id = ?';
    await db.query(query,[req.params.id]);
    await db.query(query2,[req.params.id]);
    res.render("view",{post : query});
})

// 좋아요 버튼 클릭시 
router.post("/:id/like", async function(req,res) {
    const query = "UPDATE post SET like+=1 WHERE id = ?";
    await db.query(query,[req.params.id]);
    res.redirect('/:id/like');
})

module.exports = router;